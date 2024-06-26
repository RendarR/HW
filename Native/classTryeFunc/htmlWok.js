const input = document.querySelector('.ipt');
const btn = document.querySelector('.btn');

                                                        //Событие для отработки нажатия на кнопку.
btn.addEventListener('click',(e) => {
    console.log(input.value.length);
    try{
        if(!input.value){
            throw new Error('Необходимо ввести текст в поле')
        } else if(input.value.length < 500 && input.value.length > 50){
            console.log('Введен текст:', input.value);
            console.log(add(input.value));
            initialData.push(add(input.value));
            renderNew(input.value)
        } else {
            throw new Error('Вы ввели не допустимое число символов')
        }
    }
    catch(e){
        console.error('Ошибка. Заполнения:', e);
    }
    finally{
        console.log("Кнопка нажата");
    }
})
                                                        // Функция добавления нового отзыва в верстку.
function renderNew(textReview){
        const reviews = document.createElement('div');
        reviews.classList.add('reviews');
        conteiner.innerHTML+= `
            <h4 class="product">Назваие какого то товара</h4>
            `;
        conteiner.appendChild(reviews);
                reviews.innerHTML +=`
                <p class="review">${textReview}</p>
        `;   
}
                                                        // Обьект нового отзыва
function add(productName= 'Название товара', textReview){
    const newReview = {
        product: productName,
        reviews: [
            {
                id: "1",
                text: textReview,
            },
        ],
    }
    return newReview;
}
const conteiner = document.querySelector('.conteiner');
const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
        {
            id: "1",
            text: "Отличный телефон! Батарея держится долго.",
        },
        {
            id: "2",
            text: "Камера супер, фото выглядят просто потрясающе.",
        },
    ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

                                                            // Функция рендера уже готового массива обьектов. Ниже она вызывается
function renderConteiner(){
    for(let el in initialData){
        const reviews = document.createElement('div');
        reviews.classList.add('reviews');
        conteiner.innerHTML+= `
            <h4 class="product">${initialData[el].product}</h4>
            `;
        conteiner.appendChild(reviews);
        [initialData[el].reviews].forEach((review, i) => {
            for(let i of review){
                reviews.innerHTML +=`
                <p class="review">${i.text}</p>
                `;
            }  
        })
    }   
}
renderConteiner();

