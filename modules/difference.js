export default class Difference { // Экспортируем по-умолчанию класс Difference
    constructor(oldOfficer, newOfficer, items) { // Инициализируем конструктор
        try { // Оборачиваем отображение блока с информацией для избежания ошибок на другой странице сайта 
            this.oldOfficer = document.querySelector(oldOfficer); // Получаем элементы со страницы. Как это было
            this.newOfficer = document.querySelector(newOfficer); // Как это стало
            this.oldItems = this.oldOfficer.querySelectorAll(items); // Карточки с элементами "как это было"
            this.newItems = this.newOfficer.querySelectorAll(items); // Карточки с элементами "как это стало"
            this.oldCounter = 0; // Счётчик элементов "как это было"
            this.newCounter = 0; // Счётчик элементов "как это стало"
        } catch(e) {} // Блок кода ошибки
    }

    bindTriggers(container, items, counter) { // Создаём метод работы кнопок на странице
        container.querySelector('.plus').addEventListener('click', () => { // Обращаемся к контейнеру, получаем у него элемент plus и навешиваем на него обработчик события
            if (counter !== items.length - 2) { // Если счётчик не равен кол-ву элементов -2
                items[counter].style.display = 'flex'; // То установить для элемента с индексом счётчика стиль отображения
                counter++; // Инкрементировать счётчик
            } else { // Иначе
                items[counter].style.display = 'flex'; // То установить для элемента с индексом счётчика стиль отображения
                items[items.length - 1].remove(); // Удалить предыдущий элемент
            }
        });
    }

    hideItems(items) { // Создаём метод скрытия элементов
        items.forEach((item, i, arr) => { // Перебираем все элементы на странице
            if (i !== arr.length - 1) { // Если номер по порядку не является последним
                item.style.display = 'none'; // Установить стиль отображения
            }
        });
    }

    init() { // Главный метод на странице
        try { // Оборачиваем отображение блока с информацией для избежания ошибок на другой странице сайта
            this.hideItems(this.oldItems); // Инициализируем метод для колонки "как это было"
            this.hideItems(this.newItems); // Инициализируем метод для колонки "как это стало"

            this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter); // Вызываем метод работы кнопок для колонки "как это было"
            this.bindTriggers(this.newOfficer, this.newItems, this.newCounter); // Вызываем метод работы кнопок для колонки "как это стало"
        } catch(e) {} // Блок кода ошибки
    }
}