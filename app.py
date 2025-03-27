import os
from flask import Flask, request, render_template, send_from_directory, redirect, url_for
from werkzeug.utils import secure_filename

# Инициализация приложения
app = Flask(__name__)

# Конфигурация
UPLOAD_FOLDER = 'uploads'  # Папка для хранения файлов
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}  # Разрешенные расширения

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Ограничение на размер файла (16 MB)

# Функция для проверки разрешенных расширений
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Главная страница: список файлов
@app.route('/')
def index():
    # Список всех файлов в папке uploads
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    files_info = []

    # Получаем информацию о файлах (имя и размер)
    for file in files:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file)
        if os.path.isfile(file_path):
            files_info.append({
                'name': file,
                'size': os.path.getsize(file_path)
            })

    return render_template('index.html', files=files_info)

# Страница загрузки файлов
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('index'))

    return render_template('upload.html')

# Скачивание файла
@app.route('/uploads/<filename>')
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Удаление файла
@app.route('/delete/<filename>')
def delete_file(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(file_path):
        os.remove(file_path)
    return redirect(url_for('index'))

if __name__ == '__main__':
    # Создаем папку для хранения файлов, если она не существует
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    # Запуск приложения
    app.run(debug=True)
