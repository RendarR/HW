// Этапы выполнения задания:
// - Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Строка: 196

// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие, иначе она должна быть неактивна.
// Строка: Не реализовал, т.к не успел. Думаю это не сложно

// Пользователь может записаться на один курс только один раз. 
// Строка: 167

// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Строка: 189

// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Строка: 246

// Обновляйте состояние кнопок и количество участников в реальном времени.
// Строка: 77

// Если количество участников уже максимально, то пользователь не может записаться, даже если он не записывался ранее.
// Не понял суть вопроса, но думаю я сделал

// Сохраняйте данные в LocalStorage, чтобы они сохранялись и отображались при перезагрузке страницы.
// Выполнено

// Вопросы: 
// 1 - почему нужносоздавать глобальный массив, куда будут помещаться экземпляры классов?
// 2 - Почему я не могу создать отдельный метод по перезаписи в localStorage новых данных и перерисовки html. Точнее могу, но не могу вызвать метод в методе _render() на строке №
// 3 - Почему необходимо при старте всего моего кода сделать 2 обновления страницы?
// При нажатии отмена все равно происходит срабатываения prompt 


const json = `[
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
]`


// Экземпляр класса рендера страницы
class Render{
    constructor(dataElement){
        this.dataElement = dataElement;
        this._statusBtn(dataElement)
        this._renderRow(dataElement);
    }
    //Метод статуса кнопок при перезапуске страницы. Чтоб при обновлении кнопка оставалась быть выключенной
    _statusBtn(){
        const status = this.dataElement.currentParticipants < this.dataElement.maxParticipants
        if(status){
            return ``
        } else {
            return `disabled="${true}"`
        }
    }
    _renderRow(element){
        return `
         <tr>
            <th scope="row">${element.name}</th>
            <td>${element.time}</td>
            <td>${element.maxParticipants}</td>
            <td class="countUsers">${element.currentParticipants}</td>
            <td><button class="add" ${this._statusBtn()}>Записаться</button></td>
            <td><button class="remove">Отменить запись</button></td>
        </tr>
    `
    }

}


// Проверяем что, если все таки при перезапуске страницы данные в dataUsers записываются и парсятся из localStorage
let dataUsers = localStorage.getItem('users') === '' ? [] : JSON.parse(localStorage.getItem('users'));
console.log(dataUsers); // Все же оставлю этот console.log() для наглядного показа обновления БД клиентов


// Экземпляр класса нового пользователя
class UserNew{                          
    constructor(name, lastName, lesson){
        this.name = name;
        this.id = lastName;
        this.lesson = lesson;
    }
}


// Экземпляр класса приложения
class WorkTable{
    dataUsers = [];
    tBody = document.querySelector('tbody');
    // Константа со значением ключа JSON
    localStorageKey = 'key';
    localStorageUsers = 'users';                                    // Создал ключ в localstorage для хранения пользователей
    constructor(json){
        this.json = json;                                           // 1) Принимаем JSON из конструктора
        this._localSorageTest();                                    // 2) Запускаем проверку на наличие в localStorage данных json
        this.dataBase = JSON.parse(localStorage.getItem('key'));    // 3) Парсим из localStorage наш обьект с данными
        this._render(this.dataBase);                                // 4) Запускаем метод рендера страницы на основе данных
        this._eventAdd(this.dataBase);                              // 5) Запускаем метод обработки событий на клик "Добавить"
        this._eventRemove(this.dataBase);
    }
    _localSorageTest(){
        // Если в локальной области нету данных в кей, то:
        if(!localStorage.getItem(this.localStorageKey)){  
            // Добавляем в кей новые данные. Как начальные значения          
            localStorage.setItem('key', this.json)   
        }
        if(!localStorage.getItem(this.localStorageUsers)){  
            // Добавляем в users пустой массив. Как начальное значение     
            localStorage.setItem('users', [])   
        }
    }
    // Функция _render, которая запускает функцию экземпляра класса Render
    _render(data){
        data.forEach((dataElement) => {
            this.tBody.insertAdjacentHTML('beforeend', new Render(dataElement)._renderRow(dataElement));
        })
    }
    // Функция _eventAdd, отвечает за события кликов Записаться
    _eventAdd(dataBase){
        const btnAdd = this.tBody.querySelectorAll('.add');
        btnAdd.forEach((btn, id) => {
            btn.addEventListener('click', function (e) {
                // Проверка на корректные данные при вводе
                try{
                    const name = prompt('Введите свое имя для записи');
                    const lastName = prompt('Введите свою фамилию для записи');
                    if(name.length < 1){
                        return console.error("Не корректные данные имени");
                    }
                    if(lastName.length < 1){
                        return console.error("Не корректные данные фамилии");
                    }
                
                    //Запись данных, на какое занятие идет клиент
                    const lesson = dataBase[id].name;

                    //Создание экземпляра клиента
                    const newUser = new UserNew(name, lastName, lesson);

                    // Проверка, записан ли был это клиент уже на это занятие еще раз:
                    const arrayTestLesson = dataUsers.filter((el) => el.name === name); 
                    // Выше сбор массива фильтром по имени. Именоо по имени! Без Фамилии.

                    const flagLesson = arrayTestLesson.findIndex((el) => el.lesson === lesson); 
                    //Если ни один элемент не удовлетворяет функции тестирования, возвращается -1.
                    console.log(flagLesson);
                    if(flagLesson !== -1){
                         return console.error("Данный клиент уже был записан на данный урок");
                    } 
                    dataUsers.push(newUser);
                    console.log(dataUsers);
                    localStorage.setItem('users', JSON.stringify(dataUsers));

                } catch(e){
                    console.error("Введены не корректные данные");
                }

                //Проверка на максимальное значение колличества участников и вывод соотвествующих ошибок
                try{
                    const parantEl = btn.parentElement.parentElement;
                    ++dataBase[id].currentParticipants;

                        //Изменяем HTML колличество мест
                    parantEl.querySelector('.countUsers').textContent = dataBase[id].currentParticipants;

                    // Перезаписываем в localStorage данные после клика. Сдесь я хотел вызвать метод, который создал бы снаружи this.writeData
                    localStorage.setItem('key', JSON.stringify(dataBase))

                    //Если участников стало больше, то выдает ошибку и блокирует кнопку
                    if(dataBase[id].currentParticipants >= dataBase[id].maxParticipants){
                        // Изменяется кнопка записаться
                        btn.disabled = true;
                    }
                }
                catch(e){
                    console.error('Ошибка. Достигнуто максимально значение мест в группе:', dataBase[id].maxParticipants);
                }
            });  
        })
    }
// Функция _eventAdd, отвечает за события кликов отменить запись
    _eventRemove(dataBase){
        const btnRemove = this.tBody.querySelectorAll('.remove');
        console.log(btnRemove);
        btnRemove.forEach((btn, id) => {
            btn.addEventListener('click', function (e) {
                const name = prompt('Введите свое имя для записи');
                const lastName = prompt('Введите свою фамилию для записи');
                if(name.length < 1){
                    return console.error("Не корректные данные имени");
                }
                if(lastName.length < 1){
                    return console.error("Не корректные данные фамилии");
                }
                const lesson = dataBase[id].name;
                const newUser = new UserNew(name, lastName, lesson);

                // Проверка. Действительно ли пользователь, который ввел свои данные был записан на это занятие
                try{
                    if(dataBase[id].name === lesson){

                        // Тут мы будем проверять по Имени и Фамилии данного пользователя и удалять его из БД.
                        // А внутри будет еще и проверка на то, что занятие у элемента проверки совпадает с
                        // тем зантяием, которо было выбрано
                        const indexRemove = dataUsers.findIndex((element) => {
                            if(element.lesson === lesson){
                                return (newUser.name === element.name);
                            }
                        })
                        dataUsers.splice(indexRemove, 1);
                        localStorage.setItem('users', JSON.stringify(dataUsers));
                        console.log(dataUsers);

                        //Изменяем HTML колличество мест
                        const parantEl = btn.parentElement.parentElement;
                        dataBase[id].currentParticipants--;

                        parantEl.querySelector('.countUsers').textContent = dataBase[id].currentParticipants;
                        // Перезаписываем в localStorage данные после клика. Сдесь я хотел вызвать метод, который создал бы снаружи this.writeData
                        localStorage.setItem('key', JSON.stringify(dataBase))

                        // Изменяется кнопка записаться, т.к один участник вышел
                        const btnAdd = document.querySelectorAll('.add');
                        btnAdd[id].removeAttribute("disabled");
                    } 
                    else{
                        console.error('Данный пользователь не был записан на данный урок');
                    }
                    
                } catch (e){
                }
                
            });  
        })
    }
}

const app = new WorkTable(json); // Вызываем приложение
