import tkinter as tk
import random
import time
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import numpy as np

class EnterKeySpeedGame:
    def __init__(self, root):
        """Инициализация игры с созданием GUI."""
        self.root = root
        self.root.title("Игра на скорость")
        self.root.geometry("750x650")
        self.root.configure(bg="#f8c9e0")  # Light pink background

        # Переменные для игры
        self.total_rounds = 10
        self.current_round = 0
        self.clicks_per_round = []
        self.is_active = False
        self.click_count = 0
        self.round_active = False

        self._create_widgets()

    def _create_widgets(self):
        """Создание всех виджетов интерфейса."""
        # Основной фрейм
        self.frame = tk.Frame(self.root, bg="#e91e63", bd=10, relief="ridge", highlightthickness=3, highlightbackground="#d81b60")
        self.frame.pack(pady=20, padx=20)

        # Заголовок игры
        self.title_label = tk.Label(
            self.frame,
            text="ИГРА НА СКОРОСТЬ ",
            font=("Arial", 22, "bold"),
            fg="#fff",
            bg="#e91e63"
        )
        self.title_label.pack(pady=15)

        # Статус игры
        self.status_label = tk.Label(
            self.frame,
            text="Нажмите 'Начать игру', чтобы начать",
            font=("Arial", 16),
            fg="#fff",
            bg="#e91e63"
        )
        self.status_label.pack(pady=10)

        # Индикатор для подсказки
        self.indicator_label = tk.Label(
            self.frame,
            text="ГОТОВЫ?",
            font=("Arial", 18, "bold"),  # Уменьшенный размер шрифта
            width=20,
            height=3,
            fg="#fff",
            bg="red"  # Красный фон
        )
        self.indicator_label.pack(pady=20)

        # Кнопка для начала игры
        self.start_button = tk.Button(
            self.frame,
            text="Начать игру",
            font=("Arial", 18),
            fg="white",
            bg="#ff4081",
            activebackground="#f50057",
            relief="flat",
            command=self.start_game,
            bd=5
        )
        self.start_button.pack(pady=15)

        # Область для графика
        self.graph_frame = tk.Frame(self.root, bg="#f8c9e0")
        self.graph_frame.pack(fill=tk.BOTH, expand=True, padx=30, pady=20)

        # Привязка клавиши Enter к функции подсчета нажатий
        self.root.bind('<Return>', self.count_click)

    def count_click(self, event=None):
        """Счетчик нажатий клавиши Enter."""
        if self.round_active:
            self.click_count += 1
            self.status_label.config(text=f"Нажатий клавиши Enter: {self.click_count}")

    def start_game(self):
        """Запуск игры."""
        self.is_active = True
        self.current_round = 0
        self.clicks_per_round = []
        self.start_button.config(state=tk.DISABLED)

        # Очистка предыдущего графика
        for widget in self.graph_frame.winfo_children():
            widget.destroy()

        # Начало первого раунда через 1 секунду
        self.root.after(1000, self.start_round)

    def start_round(self):
        """Запуск одного раунда игры."""
        if not self.is_active:
            return

        self.current_round += 1

        # Если все раунды завершены, завершаем игру
        if self.current_round > self.total_rounds:
            self.end_game()
            return

        # Случайная задержка перед началом раунда (1-5 секунд)
        delay = random.randint(1, 5) * 1000
        self.status_label.config(text=f"Готовьтесь к раунду {self.current_round}...")
        self.indicator_label.config(bg="red", text="ПОДОЖДИТЕ")

        # Запускаем активацию раунда после задержки
        self.root.after(delay, self.activate_round)

    def activate_round(self):
        """Активация раунда, разрешение на нажатие клавиши Enter."""
        if not self.is_active:
            return

        self.click_count = 0
        self.round_active = True
        self.status_label.config(text=f"Раунд {self.current_round}: НАЖИМАЙТЕ ENTER!")
        self.indicator_label.config(bg="#d81b60", text="НАЖМИ ENTER")

        # Таймер на 3 секунды для нажатий
        self.root.after(3000, self.end_round)

    def end_round(self):
        """Завершение текущего раунда."""
        if not self.is_active:
            return

        self.round_active = False
        self.clicks_per_round.append(self.click_count)
        self.status_label.config(text=f"Раунд {self.current_round}: {self.click_count} нажатий")
        self.indicator_label.config(bg="red", text="ПОДОЖДИТЕ")

        # Переход к следующему раунду через 1 секунду
        self.root.after(1000, self.start_round)

    def end_game(self):
        """Завершение игры и отображение результатов."""
        self.is_active = False
        self.status_label.config(text="Игра завершена! Смотрите результаты ниже.")
        self.start_button.config(state=tk.NORMAL)
        self.indicator_label.config(bg="red", text="ИГРА ЗАВЕРШЕНА")

        # Вычисляем среднее количество нажатий
        avg_clicks = sum(self.clicks_per_round) / len(self.clicks_per_round)

        # Создание графика
        fig = Figure(figsize=(6, 4), dpi=100)
        plot = fig.add_subplot(111)

        rounds = list(range(1, self.total_rounds + 1))

        # График количества нажатий по раундам
        plot.bar(rounds, self.clicks_per_round, color='#ff4081', alpha=0.7)
        plot.plot(rounds, self.clicks_per_round, 'ro-')
        plot.axhline(y=avg_clicks, color='#d81b60', linestyle='--', alpha=0.7,
                     label=f'Среднее: {avg_clicks:.1f}')

        plot.set_title('Результаты игры - количество нажатий клавиши Enter за 3 секунды')
        plot.set_xlabel('Раунд')
        plot.set_ylabel('Количество нажатий')
        plot.grid(True, alpha=0.3)
        plot.legend()

        # Добавление графика в интерфейс
        canvas = FigureCanvasTkAgg(fig, master=self.graph_frame)
        canvas.draw()
        canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)


def main():
    """Запуск игры."""
    root = tk.Tk()
    app = EnterKeySpeedGame(root)
    root.mainloop()


if __name__ == "__main__":
    main()