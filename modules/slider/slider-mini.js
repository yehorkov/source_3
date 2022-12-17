import Slider from "./slider";

export default class MiniSlider extends Slider { // Экспортируем по-умолчанию класс, содержащий код из Slider 
    constructor(container, next, prev, activeClass, animate, autoplay) { // Создаём новый конструктор и передаём необходимые аргументы на странице
        super(container, next, prev, activeClass, animate, autoplay); // Вызываем родительский конструктор для элементов (родитель - Slider)
    }

    decorizeSlides() { // Метод для отображения необходимых стилей на слайдах
        this.slides.forEach(slide => { // Получаем слайды со страницы и перебираем их
            slide.classList.remove(this.activeClass); // Убираем класс активности со всех слайдов
            if (this.animate) { // Если передан аргумент анимации
                slide.querySelector('.card__title').style.opacity = '0.4'; // Получаем заголовок карточки и устанавливаем ему значение прозрачности
                slide.querySelector('.card__controls-arrow').style.opacity = '0'; // Получем кнопки переключения слайдов и устанавливаем им значение прозрачности
            };
        });

        if (!this.slides[0].closest('button')) { // Если у первого слайда ближайщий элемент НЕ кнопка
            this.slides[0].classList.add(this.activeClass); // Добавляем этому слайду класс активности
        }

        if (this.animate) { // Если передан аргумент анимации
            this.slides[0].querySelector('.card__title').style.opacity = '1'; // Получаем заголовок первой карточки и устанавливаем ему значение прозрачности
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1'; // Получем кнопки переключения слайдов у первого слайда и устанавливаем им значение прозрачности
        };
    }

    nextSlide() { // Создаём метод для следующего слайда
        if (this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') { // Если у второго слайда имя тега содержит BUTTON И у третьего слайда имя тега содержит BUTTON
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.container.appendChild(this.slides[2]); // Btn
            this.decorizeSlides(); // Вызываем метод стилей
        } else if (this.slides[1].tagName == 'BUTTON') { // Если у второго слайда имя тега содержит BUTTON
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.decorizeSlides(); // Вызываем метод стилей
        } else { // Иначе
            this.container.appendChild(this.slides[0]); // Slide
            this.decorizeSlides(); // Вызываем метод стилей
        }
    }

    bindTriggers() { // Создаём метод работы кнопок на странице
        this.next.addEventListener('click', () => this.nextSlide()); // На элемент переключения слайда вперёд навешиваем обработчик события и вызываем метод переключение слайда

        this.prev.addEventListener('click', () => { // На элемент переключения слайда назад навешиваем обработчик события

            for (let i = this.slides.length - 1; i > 0; i--) { // Инициализируем цикл (получаем первый слайд на странице; кол-во элементов > 0; декрементируем переменную)
                if (this.slides[i].tagName !== 'BUTTON') {  // Если у слайда имя тега содержит BUTTON
                    let active = this.slides[i]; // Помещаем текущий слайд в переменную
                    this.container.insertBefore(active, this.slides[0]); // Обращаемся к переданному контейнеру и методом insertBefore помещаем на страницу текущий слайд на место первого
                    this.decorizeSlides(); // Вызываем метод стилей
                    break; // Останавливаем цикл
                }
            }
        });
    }

    init() { // Главный метод на странице
        try { // Оборачиваем  для избежания ошибок на другой странице сайта 
            this.container.style.cssText = ` 
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `; // Добавляем стили для контейнера

        this.bindTriggers(); // Вызываем метод работы кнопок
        this.decorizeSlides(); // Вызываем метод работы стилей

        if (this.autoplay) { // Если передан аргумент autoplay
            setInterval(() => { // Функция вызова через определённое время
                this.nextSlide(); // Вызываем метод переключение слайда
            }, 5000); // Через 5 секунд
        }
        } catch(e) {} // Блок кода ошибки
    }
}