Тестовый  Music сервис 

.env  - добавте конфиг файл со всеми персональными данными 

Приложение умеет: Добавлять , Выводить , Обновлять и Удалять => Авторов и Произведений .

http://localhost:5000/api/track/?regDate=2022-02-13 - выборка по дате создания 

http://localhost:5000/api/singer/?singerName=Mozart Beethoven - выборка по Авторам (одному или нескольким)

http://localhost:5000/api/track/?limit=10 - лимит вывода 

http://localhost:5000/api/track/?page=3 - разделение на страницы (по лимитно)

Так же сервис умеет логировать действия пользователей и записывать в /logs/app.log

При добавлении исполнителя Monetochka соообщение: "message": "unwanted singer! 






