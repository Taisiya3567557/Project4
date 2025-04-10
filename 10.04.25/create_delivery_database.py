from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from faker import Faker
import random

# Инициализация Faker для генерации случайных данных
fake = Faker()

# Базовый класс для моделей
Base = declarative_base()

# Таблица Role
class Role(Base):
    __tablename__ = 'role'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    def __repr__(self):
        return f"<Role(id={self.id}, name={self.name})>"

# Таблица User
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    lastname = Column(String, nullable=True)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=True)
    role_id = Column(Integer, ForeignKey('role.id'))
    username = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)

    role = relationship("Role", back_populates="users")

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, role={self.role.name})>"

Role.users = relationship("User", order_by=User.id, back_populates="role")

# Таблица Invoice
class Invoice(Base):
    __tablename__ = 'invoice'
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey('order.id'))  # Прямое указание внешнего ключа
    price = Column(Float, nullable=False)
    courier_price = Column(Float, nullable=False)
    commission = Column(Float, nullable=False)

    order = relationship("Order", foreign_keys=[order_id])  # Явное указание внешнего ключа

    def __repr__(self):
        return f"<Invoice(id={self.id}, price={self.price}, courier_price={self.courier_price}, commission={self.commission})>"

# Таблица Order
class Order(Base):
    __tablename__ = 'order'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    address_from_lat = Column(Float, nullable=False)
    address_from_long = Column(Float, nullable=False)
    address_to_lat = Column(Float, nullable=False)
    address_to_long = Column(Float, nullable=False)
    trackers = Column(String, nullable=False)  # Это поле для хранения трекеров
    invoice_id = Column(Integer, ForeignKey('invoice.id'))

    user = relationship("User")
    invoice = relationship("Invoice", foreign_keys=[invoice_id])  # Явное указание внешнего ключа

    def __repr__(self):
        return f"<Order(id={self.id}, user_id={self.user_id}, address_from=({self.address_from_lat}, {self.address_from_long}), address_to=({self.address_to_lat}, {self.address_to_long}))>"

# Таблица Tracker
class Tracker(Base):
    __tablename__ = 'tracker'
    id = Column(Integer, primary_key=True)
    courier_id = Column(Integer, ForeignKey('user.id'))
    order_id = Column(Integer, ForeignKey('order.id'))
    track_number = Column(String, nullable=False)

    order = relationship("Order")
    courier = relationship("User")

    def __repr__(self):
        return f"<Tracker(id={self.id}, courier_id={self.courier_id}, order_id={self.order_id}, track_number={self.track_number})>"

# Создание подключения к базе данных
engine = create_engine('sqlite:///delivery.db', echo=True)

# Создание всех таблиц в базе данных
Base.metadata.create_all(engine)

# Сессия для работы с БД
Session = sessionmaker(bind=engine)
session = Session()

# Добавление данных в таблицы

# Роли
roles = ['Admin', 'Courier', 'Customer']
for role_name in roles:
    role = Role(name=role_name)
    session.add(role)

session.commit()

# Генерация пользователей
users = []
for _ in range(10):
    role = random.choice(session.query(Role).all())
    user = User(
        lastname=fake.last_name(),
        name=fake.first_name(),
        surname=fake.last_name(),
        role_id=role.id,
        username=fake.user_name(),
        password=fake.password()
    )
    session.add(user)
    users.append(user)

session.commit()

# Генерация заказов и счетов
for _ in range(2000):
    user = random.choice(users)
    order = Order(
        user_id=user.id,
        address_from_lat=fake.latitude(),
        address_from_long=fake.longitude(),
        address_to_lat=fake.latitude(),
        address_to_long=fake.longitude(),
        trackers=fake.uuid4(),  # Трекер как UUID
    )
    session.add(order)
    session.commit()  # Сохраняем order, чтобы получить его id

    invoice = Invoice(
        order_id=order.id,
        price=random.uniform(100, 1000),  # Случайная цена
        courier_price=random.uniform(50, 200),  # Цена курьера
        commission=random.uniform(10, 50)  # Комиссия
    )
    session.add(invoice)
    session.commit()  # Сохраняем invoice, чтобы обновить order

    # Генерация трекеров для каждого заказа
    num_trackers = random.randint(1, 3)  # Число трекеров на заказ
    for _ in range(num_trackers):
        courier = random.choice([user for user in users if user.role.name == 'Courier'])
        tracker = Tracker(
            courier_id=courier.id,
            order_id=order.id,
            track_number=fake.uuid4()  # Генерация случайного номера трекера
        )
        session.add(tracker)

    session.commit()

# Завершаем сессию
session.close()

print("Данные успешно добавлены в базу данных.")
