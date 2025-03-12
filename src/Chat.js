import { io } from 'socket.io-client';

// Устанавливаем соединение с сервером
const socket = io();

// Обработчик события для кнопки "Отправить"
document.getElementById('send-button').onclick = function() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim(); // Убираем лишние пробелы

    // Проверяем, что сообщение не пустое
    if (message) {
        // Отправляем сообщение на сервер
        socket.emit('send_message', {data: message});
        messageInput.value = ''; // Очищаем поле ввода
    }
};

// Обработчик события для получения сообщения
socket.on('receive_message', function(data) {
    const messagesDiv = document.getElementById('messages');
    // Добавляем новое сообщение в блок сообщений
    messagesDiv.innerHTML += '<div>' + data.data + '</div>';
    // Прокручиваем вниз, чтобы показать новое сообщение
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});