// Домашнее задание:

// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице.

// Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// Для создания элементов интерфейса используйте HTML.
// При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

// Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.

// Дополнительно сделать так: Если пользователь не нажимает следующий слайд, то запускается таймер на смену слайда автоматически


import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const swiper = new Swiper('.swiper', {
    spaceBetween: 30,
    // Optional parameters
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
});

// Реализация автоматического переключения
const btnNextEl = document.querySelector('.swiper-button-next');
let my = 0;
let old = 0;
btnNextEl.addEventListener('click', () => {
    my++;
});

setInterval(function(){ 
    checkForChanges(); // after every 2 secs check
    old = my; // reset the old value now to the new one, so during next check we should have our myVar changed.
},3000);

function checkForChanges(){
    if(old === my){
    setTimeout(() => {
        const clickEvent = new Event('click');
        btnNextEl.dispatchEvent(clickEvent); // При перезапуске страницы произойдет нажатие кнопки
        // console.log('Автоматическое переключение');
    }, 2000)
    } else {
        return
    }
}

