// Задачи:

// Задача 1:
// Необходимо получить список всех пользователей с помощью бесплатного API (https://jsonplaceholder.typicode.com/users) и 
// отобразить их на странице. Пользователь должен иметь возможность удалить любого пользователя из списка.
class ListUsers{
    constructor(url){
        this.url = url;
        this.data = this._users(url);
        this.conteiner = document.querySelector('.conteiner__1');
    }
    async _users(url){
        try{
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            this.render(data);
            this.delete(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    render(data){
        data.forEach(element => {
            this.conteiner.insertAdjacentHTML('beforeend', 
            `<div class="user">
                <div class="user__img" style="background-color: #888888;"></div>
                <div class="user__info">
                    <p class="user__p">${element.name}</p>
                    <p class="user__p">${element.username}</p>
                    <p class="user__p">${element.email}</p>
                </div>
                <button class="user__btn">Удалить</button>
            </div>`);
        });
        
    }
    delete(data){
        const deleteBtn = document.querySelectorAll('.user__btn');
        deleteBtn.forEach(element => {
            element.addEventListener('click', function (e) {
                e.target.parentNode.remove();
            });
        })
    }
    }

const App = new ListUsers('https://jsonplaceholder.typicode.com/users');




// Задача 2:
// Необходимо реализовать отрисовку 10 картинок собак из API https://dog.ceo/dog-api/ с интервалом в 3 секунды.

class ListImg{
    constructor(url){
        this.url = url;
        this.conteiner = document.querySelector('.conteiner__2');
        const timerId = setInterval(() => {                                     //Вызов в интервале нашего запроса на сервер
            this._users(this.url)
        }, 3000)
        setTimeout(() => { clearInterval(timerId) }, 30000);                    //Остановка по времени нашего интервала
    }
    async _users(url){
        try{
            const response = await fetch(url);
            const data = await response.json();
            this.count++;
            console.log(data);
            this.render(data)
        }
        catch (error) {
            console.log(error);
        }
    }
    render(data){
            this.conteiner.insertAdjacentHTML('beforeend', 
            `<div class="img">
                <img class="conteiner__2-img" src="${data.message}" alt="" class="">
            </div>`
            );
    }
}
const App2 = new ListImg('https://dog.ceo/api/breeds/image/random')