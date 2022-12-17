export default class ShowInfo { // По-умолчанию экспортируем класс показа информации
    constructor (triggers) { // Создаём новый конструктор и передаём необходимые аргументы на странице
        this.btns = document.querySelectorAll(triggers); // Получаем кнопки со страницы
    }

    init() { // Главный метод на странице
        this.btns.forEach(btn => { // Перебираем все кнопки
            btn.addEventListener('click', () => { // Навешиваем на них обработчик события
                const sibling = btn.closest('.module__info-show').nextElementSibling; // Помещаем в переменную элемент, который находится после кнопки с классом .module__info-show

                sibling.classList.toggle('msg'); // У элемента "тоглим" класс msg
                sibling.style.marginTop = '20px'; // Добавляем отступ сверху
            });
        });
    }
}