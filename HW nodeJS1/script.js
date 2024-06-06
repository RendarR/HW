// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.
let count = {
    about: 0,
    general: 0
};
const http = require('http');
const server = http.createServer((req, res) => {    
    if(req.url === '/'){            
        res.writeHead(200, {                        
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end('<h1>Добро пожаловать на мой сайт!</h1>' + '<a href="http://127.0.0.1:3000/about">Ссылка на About</a>' + `<p>Колличесво запросов на этой странице: ${count.general}</p>`);
        count.general = count.general + 1;
    } else if (req.url === '/about'){
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end('<h1>About!</h1>' + '<a href="http://127.0.0.1:3000/">Ссылка на Главную</a>' + `<p>Колличесво запросов на этой странице: ${count.about}</p>`);
        count.about = count.about + 1;
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end('<h1>Страница не найдена</h1>' + `<a href="http://127.0.0.1:3000/">Вернуться на главную</a>`);
    }
})

const port = 3000;
server.listen(port, () => {
    console.log('Сервер запущен на порту', port);
})