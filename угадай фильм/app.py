from flask import Flask, render_template, request, redirect, url_for, session
import json

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Для хранения состояния игры в сессии

# Загрузка данных из JSON
def load_quiz_data():
    with open('quiz_data.json', 'r', encoding='utf-8') as f:
        return json.load(f)

# Главная страница игры
@app.route('/')
def index():
    # Если игра не начата, начинаем новую игру
    if 'question_index' not in session:
        session['question_index'] = 0  # Начинаем с первого вопроса
    return redirect(url_for('play_game'))

# Страница с игрой
@app.route('/play', methods=['GET', 'POST'])
def play_game():
    game_data = load_quiz_data()

    # Проверяем, если мы прошли все вопросы
    if session['question_index'] >= len(game_data):
        return redirect(url_for('game_over'))

    # Получаем текущий вопрос по индексу
    question = game_data[session['question_index']]

    if request.method == 'POST':
        selected_option = request.form['answer']
        correct = question['correct']

        if selected_option == correct:
            # Если ответ правильный, переходим к следующему вопросу
            session['question_index'] += 1
            return redirect(url_for('play_game'))
        else:
            # Если ответ неправильный, показываем правильный ответ
            return render_template('incorrect_answer.html', question=question, selected_option=selected_option)

    # Отправляем вопрос на шаблон
    return render_template('game.html', question=question)

# Страница окончания игры
@app.route('/game_over')
def game_over():
    session.pop('question_index', None)  # Убираем индекс вопроса из сессии
    return render_template('game_over.html')

if __name__ == "__main__":
    app.run(debug=True)
