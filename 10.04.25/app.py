from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from faker import Faker
import random

# Инициализация Flask приложения
app = Flask(__name__)

# Подключение к базе данных (используем SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///delivery.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Инициализация Faker для генерации случайных данных
fake = Faker()

# Таблицы, определенные в вашем коде
class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<Role(id={self.id}, name={self.name})>"

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    lastname = db.Column(db.String, nullable=True)
    name = db.Column(db.String, nullable=False)
    surname = db.Column(db.String, nullable=True)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    username = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

    role = db.relationship("Role", back_populates="users")

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, role={self.role.name})>"

Role.users = db.relationship("User", order_by=User.id, back_populates="role")

class Invoice(db.Model):
    __tablename__ = 'invoice'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))  # Прямое указание внешнего ключа
    price = db.Column(db.Float, nullable=False)
    courier_price = db.Column(db.Float, nullable=False)
    commission = db.Column(db.Float, nullable=False)

    order = db.relationship("Order", foreign_keys=[order_id])  # Явное указание внешнего ключа

    def __repr__(self):
        return f"<Invoice(id={self.id}, price={self.price}, courier_price={self.courier_price}, commission={self.commission})>"

class Order(db.Model):
    __tablename__ = 'order'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    address_from_lat = db.Column(db.Float, nullable=False)
    address_from_long = db.Column(db.Float, nullable=False)
    address_to_lat = db.Column(db.Float, nullable=False)
    address_to_long = db.Column(db.Float, nullable=False)
    trackers = db.Column(db.String, nullable=False)  # Это поле для хранения трекеров
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'))

    user = db.relationship("User")
    invoice = db.relationship("Invoice", foreign_keys=[invoice_id])  # Явное указание внешнего ключа

    def __repr__(self):
        return f"<Order(id={self.id}, user_id={self.user_id}, address_from=({self.address_from_lat}, {self.address_from_long}), address_to=({self.address_to_lat}, {self.address_to_long}))>"

class Tracker(db.Model):
    __tablename__ = 'tracker'
    id = db.Column(db.Integer, primary_key=True)
    courier_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    track_number = db.Column(db.String, nullable=False)

    order = db.relationship("Order")
    courier = db.relationship("User")

    def __repr__(self):
        return f"<Tracker(id={self.id}, courier_id={self.courier_id}, order_id={self.order_id}, track_number={self.track_number})>"

# Создание таблиц, если они не существуют
with app.app_context():
    db.create_all()

# Заполнение таблиц с данными
def generate_data():
    # Роли
    roles = ['Admin', 'Courier', 'Customer']
    for role_name in roles:
        role = Role(name=role_name)
        db.session.add(role)

    db.session.commit()

    # Генерация пользователей
    users = []
    for _ in range(10):
        role = random.choice(Role.query.all())  # Случайный выбор роли
        user = User(
            lastname=fake.last_name(),
            name=fake.first_name(),
            surname=fake.last_name(),
            role_id=role.id,
            username=fake.user_name(),
            password=fake.password()
        )
        db.session.add(user)
        users.append(user)

    db.session.commit()

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
        db.session.add(order)
        db.session.commit()  # Сохраняем order, чтобы получить его id

        invoice = Invoice(
            order_id=order.id,
            price=random.uniform(100, 1000),  # Случайная цена
            courier_price=random.uniform(50, 200),  # Цена курьера
            commission=random.uniform(10, 50)  # Комиссия
        )
        db.session.add(invoice)
        db.session.commit()  # Сохраняем invoice, чтобы обновить order

        # Генерация трекеров для каждого заказа
        num_trackers = random.randint(1, 3)  # Число трекеров на заказ
        for _ in range(num_trackers):
            courier = random.choice([user for user in users if user.role.name == 'Courier'])
            tracker = Tracker(
                courier_id=courier.id,
                order_id=order.id,
                track_number=fake.uuid4()  # Генерация случайного номера трекера
            )
            db.session.add(tracker)

        db.session.commit()

    print("Данные успешно добавлены в базу данных.")

# Заполнение базы данных при старте приложения
with app.app_context():
    generate_data()

# Главная страница для отображения данных
@app.route('/')
def index():
    users = User.query.all()
    orders = Order.query.all()
    invoices = Invoice.query.all()
    trackers = Tracker.query.all()

    return render_template('index.html', users=users, orders=orders, invoices=invoices, trackers=trackers)

# Запуск приложения
if __name__ == '__main__':
    app.run(debug=True)
