export default class VideoPlayer { // По-умолчанию экспортируем класс видеоплеера
    constructor(triggers, overlay) { // Создаём новый конструктор и передаём необходимые аргументы на странице
        this.btns = document.querySelectorAll(triggers); // Получаем кнопки со страницы
        this.overlay = document.querySelector(overlay); // Получаем оверлей со страницы
        this.close = this.overlay.querySelector('.close'); // Получаем кнопку закрытия со страницы
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this); // Помещаем в переменную текущее состояние воиспроизведения и навешиваем на него метод bind (Метод bind() создаёт новую функцию, которая при вызове устанавливает в качестве контекста выполнения this предоставленное значение.)
    }

    bindTriggers() { // Создаём метод работы кнопок
        this.btns.forEach((btn, i) => { // Перебираем все кнопки и добалвяем необходимые аргументы
            try { // Оборачиваем  для избежания ошибок на другой странице сайта 
                const blockedElem = btn.closest('.module__video-item').nextElementSibling; // Получаем заблокированное видео со страницы и помещаем его в переменную (если пользователь не просмотрел первое видео, второе следующее за ним будет заблокировано для просмотра)

                if (i % 2 == 0) { // Если номер кнопки без остатка делится на 2 (каждый второй элемент будет заблокирован)
                    blockedElem.setAttribute('data-disabled', 'true'); // Установить заблокированному элементу атрибут в true (заблокировать его)
                }
            } catch(e) {} // Блок кода ошибки

            btn.addEventListener('click', () => {
                if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') { // Если у кнопки отсутствует ближний элемент '.module__video-item' ИЛИ у ближнего элемента '.module__video-item' атрибут НЕ РАВЕН true
                this.activeBtn = btn; // Помещаем кнопку в переменную активности

                if (document.querySelector('iframe#frame')) { // Если со страницы получен элемент 'iframe#frame'
                    this.overlay.style.display = 'flex'; // Установить стиль для оверлея
                if (this.path !== btn.getAttribute('data-url')) { // Если пусть НЕ РАВЕН атрибуту 'data-url'
                    this.path = btn.getAttribute('data-url'); // Установить в путь текущий атрибут 'data-url'
                    this.player.loadVideoById({videoId: this.path}); // и загрузить видео по id текущего пути
                }
                } else { // Иначе
                    this.path = btn.getAttribute('data-url'); // Установить в путь текущий атрибут 'data-url'
                    this.createPlayer(this.path); // Создать новый плеер с текущим путём
                }
                }
            });
        });
    }

    bindCloseBtn() { // Создаём метод для кнопки закрытия
        this.close.addEventListener('click', () => { // Навешиваем обработчик события на кнопку
            this.overlay.style.display = 'none'; // Устанавливаем стиль отображения
            this.player.stopVideo(); // и останавливаем воиспроизведение текущего видео
        });
    }

    createPlayer(url) { // Создаём метод видеоплеера
        this.player = new YT.Player('frame', { // Создаём переменную плеера и помещаем в него  новый объект видеоплеера с YouTube
                height: '100%', // Указываем высоту
                width: '100%', // и ширину плеера
                videoId: `${url}`, // Указываем путь для видео
                events: { // свойства объекта определяют события, которые активирует API и функции (функции прослушивания событий)
                    'onStateChange': this.onPlayerStateChange // Указываем текущее состояние поиспроизведения
                }
          });

          this.overlay.style.display = 'flex'; // Устанавливаем стиль отображения для оверлея
    }

    onPlayerStateChange(state) { // Создаём метод текущего состояния воиспроизведения
        try { // Оборачиваем  для избежания ошибок на другой странице сайта 
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling; // Помещаем заблокированный элемент в переменную (видео, которое находится сразу после доступного для просмотра)
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true); // Помещаем активную кнопку воиспроизведения в переменную (новую иконку помещаем на место замка). Метод cloneNode позволяет клонировать элемент и получить его точную копию (необходимо передать аргумент true для полного (глубокого копирования)).
    
            if (state.data === 0) { // Если текущее состояние равно 0 (воспроизведение видео завершено)
                if (blockedElem.querySelector('.play__circle').classList.contains('closed')) { // Если в классах заблокированного элемента содержится класс closed 
                    blockedElem.querySelector('.play__circle').classList.remove('closed'); // Убираем класс closed
                    blockedElem.querySelector('svg').remove(); // Убираем текущее изображение кнопки
                    blockedElem.querySelector('.play__circle').appendChild(playBtn); // Добавляем новую иконку вместо старой
                    blockedElem.querySelector('.play__text').textContent = `play video`; // Изменяем поле с текстом на новое
                    blockedElem.querySelector('.play__text').classList.remove('attention'); // Убираем класс attention у текста 
                    blockedElem.style.opacity = 1; // Устанавливаем стиль прозрачности
                    blockedElem.style.filter = 'none'; // Убираем стили filter у элемента
    
                    blockedElem.setAttribute('data-disabled', 'false'); // Устанавливаем атрибут "отключения" в false (делаем кнопку активной)
                }
            }
        } catch(e) {} // Блок кода ошибки
    }

    init() { // Главный метод на странице
        if(this.btns.length > 0) { // Если кол-во кнопок больше 0
            const tag = document.createElement('script'); // Создаём переменную tag и в неё помещаем новый элемент на страницу script

            tag.src = "https://www.youtube.com/iframe_api"; // В путь (src) помещаем строку
            const firstScriptTag = document.getElementsByTagName('script')[0]; // Находим на странице первый скрипт, который есть
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // Обращаемся к главному "родителю", который есть на странице и перед первым скриптом помещаем только что созданный скрипт
    
            this.bindTriggers(); // Вызываем метод работы кнопок
            this.bindCloseBtn(); // Вызываем метод кнопки закрытия
        }
    }
}