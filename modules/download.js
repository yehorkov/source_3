export default class Download { // Экспортируем по-умолчанию класс Download
    constructor(triggers) { // Инициализируем конструктор
        this.btns = document.querySelectorAll(triggers); // Получаем кнопки со страницы
        this.path = 'assets/img/mainbg.jpg'; // Добавляем путь для скачиваемого файла
    }

    downloadItem(path) { // Создаём метод скачивания файла
        const element = document.createElement('a'); // Создаём элемент на странице (ссылку)

        element.setAttribute('href', path); // Добавляем ей необходимые атрибуты (обязательный href и путь файла)
        element.setAttribute('download', 'nice_picture'); // Добавляем атрибут, указывающий на то, что по этой ссылке происходит скачивание файла и устанавливаем название для файла

        element.style.display = 'none'; // Устанавливаем стиль отображения для элемента
        document.body.appendChild(element); // Добавляем элемент на страницу

        element.click(); // Имитируем клик мышки по элементу

        document.body.removeChild(element); // Удаляем элемент со страницы
    }

    init() { // Главный метод на странице
        this.btns.forEach(btn => { // Перебираем все кнопки на странице
            btn.addEventListener('click', (e) => { // Навешиваем на них обработчик события
                e.preventDefault(); // Отменяем страндартное поведение браузера
                e.stopPropagation(); //Прекращаем дальнейшую передачу текущего события.
                this.downloadItem(this.path); // Инициализируем метод и передаём в метод путь скачиваемого файла
            });
        });
    }
}