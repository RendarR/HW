// 1 Задание:
const musicCollection = [
    {
        title: "Название альбома 1",
        artist: "Исполнитель 1",
        year: "Год выпуска 1"
    },
    {
        title: "Название альбома 2",
        artist: "Исполнитель 2",
        year: "Год выпуска 2"
    },
    {
        title: "Название альбома 3",
        artist: "Исполнитель 3",
        year: "Год выпуска 3"
    }
];

musicCollection[Symbol.iterator] = () => {
    return{                                 // Стандарт
        current: 0,                         // Стандарт
        to: musicCollection.length,         // Стандарт
        next(){                             // Стандарт
            return this.current < this.to   // Стандарт
            ? { done: false, value: musicCollection[this.current++] }
            : { done: true }                
        }
    }
 }
for(let el of musicCollection){             // Стандарт
    console.log(`Название книги: ${el.title}, Автор: ${el.artist}, Год выпуска: ${el.year}`);// Стандарт
}

// 2 Задание

const foods = new Map();    //Храним данные поваров
foods.set('Маргарита', "Виктор")
    .set('Пепперони', "Виктор")
    .set("Филадельфия", "Ольга")
    .set('Калифорния', "Ольга")
    .set("Тирамису", "Дмитрий")
    .set('Чизкейк', 'Дмитрий')

const clientsOrder = new Map()  // Храним данные заказов клиентов
function addOrder(food, nameClient){
    const newClient = new Set(clientsOrder.get(nameClient));
    // if(!clientsOrder.has(nameClient)){
        newClient.add(food);
        clientsOrder.set(nameClient, [...newClient]);
    // }
    console.log(clientsOrder);
}
addOrder('Пепперони', "Алексей");
addOrder('Тирамису', "Алексей");
addOrder('Калифорния', "Мария");
addOrder('Маргарита', "Мария");
addOrder('Чизкейк', "Ирина");

console.log(`Клиент Алексей. Заказ: ${Array.from(clientsOrder.get('Алексей'))}`);
console.log(`Клиент Мария. Заказ: ${Array.from(clientsOrder.get('Мария'))}`);
console.log(`Клиент Ирина. Заказ: ${[...clientsOrder.get('Ирина')]}`);



