const express = require('express'); // загружаем библиотеку express
const bodyParser = require('body-parser'); // загружаем библиотеку body-parser

const app = express();  // app является сервером

app.use(bodyParser.json()); // правильно парсит json, который передаётся в body
app.use(bodyParser.urlencoded({ extended: true })); // правильно парсит данные формы

const artists = [           // массив с элементами
    {
        id: 1,
        name: 'Metallica'
    },
    {
        id: 2,
        name: 'Iron Maiden'
    },
    {
        id: 3,
        name: 'DEEP PURPLE'
    }
];

app.get('/', (req, res) => {            // как только будем заходить в порт, то
    res.send('Hello, API!');            // на страницу будет выводиться 
});

app.get('/artists', (req, res) => {     // как только будем заходить в /artists, то
    res.send(artists);                  // на страницу будет выводиться 
});

app.get('/artists/:id', (req, res) => { // как только есть динамический параметр id
    console.log(req.params);            // получение динамического id
    const artist = artists.find((artist) => {
        return artist.id === Number(req.params.id);     // ищем человека с переданным id
    });
    res.send(artist);
});

app.post('/artists', (req, res) => {        // когда кто-то ДРУГОЙ кидает post запрос на этот url, то происходит то, что ниже
    const artist = {                // формируем элемент массива
        id: Date.now(),             // уникальный id
        name: req.body.name         // имя - переданные пост запросом данные(req.body) + поле name у переданного post запроса
    };
    artists.push(artist);           // пушим элемент в массив
    console.log('req.body - ', req.body);   // приходящие данные
    res.send('Artists: ', artist);
});

app.put('/artists/:id', (req, res) => {         // при отправке put запроса, когда происходит обновление данных
    const artist = artists.find((artist) => {
        return artist.id === Number(req.params.id);     // ищем человека с переданным id
    });
    artist.name = req.body.name;    // меняем значение поля имени на переданное
    res.sendStatus(200);            // возвращаем статус 200
});

app.delete('/artists/:id', (req, res) => { // при отправке delete запроса, происходит обновление данных
    artists = artists.filter(artist => artist.id !== Number(req.params.id)); // Если id элемента не равно выбранному, то записываем его в существующий массив
    res.sendStatus(200);    // успешная реализация delete запроса
});

app.listen(3000, () => {
    console.log('API app started!');    // выводим, когда сервер будет запущен
});