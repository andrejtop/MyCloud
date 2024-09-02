# Дипломный проект профессии «Fullstack-разработчик на Python»

## ☁️ Облачное хранилище «MyCloud»

http://194.67.88.6/

## Развёртывание проекта локально
Для развертывания проекта локально выполните следующие действия:
- Клонируйте репозиторий: 
``` 
$ git clone https://github.com/andrejtop/MyCloud.git
```
- Активируйте виртуальное окружение и устанавите зависимости: 
```
$ cd MyCloud/
$ python3 -m venv env
$ source env/bin/activate
(env) $ pip install -r requirements.txt
```
- Установите PostgreSQL. Создайте базу данных PostgreSQL.

- В корне проекта создаем файл `.env` в котором определите необходимые переменные окружения: 
```
SECRET_KEY=секретный ключ django
DEBUG=режим отладки True или False
ALLOWED_HOSTS=допустимые хосты (например, для запуска локально укажите 127.0.0.1)
// Данные для подключения к базе данных (к той, что создали в пункте 4):
DB_NAME=имя базы данных (например: my_database)
DB_USER=имя пользователя базы данных (например: admin)
DB_PASSWORD=пароль для доступа к базе данных
DB_HOST=хост базы данных (например: localhost)
DB_PORT=порт базы данных (например: 5432)
```
- Выполните миграции
```
(env) $ python manage.py makemigrations
(env) $ python manage.py migrate
```
- В директории `frontend/` установите NPM зависимости.
```
(env) $ npm install
```
- В файле `frontend/src/api/requests.js` в переменной `BASE_URL` установим url, на который будут отправлятся запросы на сервер. Например: `http://127.0.0.1:8000/api/`
После этого пересоберите бандл фронтенда
```
(env) $ npm run dev

```
- Соберите sтаtic-файлы
```
python manage.py collectstatic
```

- Запускаем приложение.
```
(env) $ python manage.py runserver
```



