export default class Form { // По-умолчанию экспортируем класс форм
    constructor(forms) { // Создаём новый конструктор и передаём необходимые аргументы на странице
        this.forms = document.querySelectorAll(forms); // Получаем элементы со страницы и помещаем их в переменные
        this.inputs = document.querySelectorAll('input'); // Получаем элементы со страницы и помещаем их в переменные
        this.message = { // Переменная с сообщениями для статуса формы (загрузка, отправлено, ошибка отправки формы)
            loading: 'Загрузка',
            succes: 'Спасибо! Скоро мы с Вами свяжемся',
            failure: 'Что-то пошло не так...',
        };
        this.path = 'assets/question.php' // Переменная для пути отправки форм
    }

    clearInputs() { // Функция очистки формы после её отправки
        this.inputs.forEach(input => { // Перебираем все поля ввода
            input.value = ''; // Устанавливаем им значение пустой строки
        });
    }

    checkEmailInputs() { // Функция проверки на ввод символов
        const emailInputs = document.querySelectorAll('[type="email"]'); // Получаем элемент со страницы
    
        emailInputs.forEach(input => { // Перебираем все текстовые поля на страницу
            input.addEventListener('keypress', function(e) { // Навешиваем обработчик события нажатия клавиши
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) { // Если вводимые символы совпадают с английской раскладкой клавиатуры
                    e.preventDefault(); // отменяем стандартное поведение браузера
                }
            });
        });
    }

    initMask() { // Функция маски ввода
        let setCursorPosition = (position, element) => { // Функция позиции курсора
            element.focus(); // Устанавливаем вручную фокус на элементе
    
            if (element.setSelectionRange) { // Если у элемента есть выделение
                element.setSelectionRange(position, position); // устанавливаем курсор в определённую позицию
            } else if (element.createTextRange) { // Иначе если у элемента есть метод выделения
                let range = element.createTextRange(); // Создаём диапазон выделения
    
                range.collapse(true); // Настройка диапазона. Объединяет граничные точки диапазона (первую с последней позициями)
                range.moveEnd('character', position); // Говорим коду где будет конечная точка выделения
                range.moveStart('character', position); // Говорим коду где будет начальная точка выделения
                range.select(); // Устанавливаем курсор и выделяем значение, сформированное при помощи moveEnd и moveStart
                
                // Так как методам moveEnd и moveStart передаётся одно и тоже число (position), то курсор будет просто установлен в определённую позицию
            }
        };
    
        function createMask (e) { // Функция создания маски
            let matrix = '+1 (___) ___-____', // Матрица для создания маски
                i = 0, // Переменная итератор
                def = matrix.replace(/\D/g, ''), // Заменяем все не числа на пустоту
                val = this.value.replace(/\D/g, ''); // Заменяем все не числа на пустоту
    
            if (def.length >= val.length) { // Если длина def (кол-во цифр, которое останется в матрице) больше или равно кол-ву цифр в val (value)
                val = def; // Заменяем значение на стандартное, полученное на основе матрицы
            }
    
            this.value = matrix.replace(/./g, function(a) { // . - каждый элемент, который существует в строке; a - технический аргумент, вместо него будет подставляться каждый символ, который находится в матрице
                return  /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a; // Возвращаем строку, которую показываем пользователю /[_\d]/.test(a) - проверяем диапазон вводимых символов и итератор меньше кол-ва символов в val (выражении, которое уже "избавилось" от всех не цифр). Если это так возвращаем следующий символ (val.charAt(i++)). Если это не так, то проверяем итератор на кол-во символов и, если он больше или равен val, то мы возвращаем пустую строку, иначе возвращаем значение аргумента а
            });
    
            if (e.type === 'blur') { // Если тип события равен blur
                if (this.value.length == 2) { // Если длина символов в поле равна 2
                    this.value = '' // Просто очищаем поле ввода
                }
            } else { // Иначе
                setCursorPosition(this.value.length, this); //Уставливаем курсор в определённую позицию
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]'); // Получаем элементы со страницы
    
        inputs.forEach(input => { // Перебираем все инпуты на странице
            input.addEventListener('input', createMask); // И навешиваем на них обработчики событий
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(url, data)  { // Функция отправки формы на сервер
        let res = await fetch(url, { //  Создаём переменную со способом отправки формы (fetch),
            method: 'POST', // устанавливаем метод отправки
            body: data // выбираем, что будет отправлено на сервер
        });

        return await res.text(); // Функция возвращает результат отправки в виде текста
    }

    init() { // Главный метод на странице
        this.checkEmailInputs(); // Вызываем метод проверки введёных символов
        this.initMask(); // Вызываем метод маски ввода

        this.forms.forEach(form => { // Перебираем все формы
            form.addEventListener('submit', (e) => { // Навешиваем на каждую обработчик события
                e.preventDefault(); // Отменяем стандартное поведение браузера

                let statusMessage = document.createElement('div'); // Создаем переменную статуса отправки и помещаем в неё пустой элемент, ниже добавляем необходимые стили элементу
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-sixe: 18px;
                    color: grey;
                `;
                form.parentNode.appendChild(statusMessage); // К родительскому блоку, который будет у формы добавляем блок с сообщением

                statusMessage.textContent = this.message.loading; // В созданный блок помещаем сообщение о том, что происходит обработка (загрузка)
 
                const formData = new FormData(form); // В переменную помещаем новый конструктор объекта FormData

                this.postData(this.path, formData) // Используем функцию отправки на сервер. Первый аргумент - сервер, куда происходит отправка, второй - данные для отправки
                    .then(res => { // Возвращаем результат отправки
                        console.log(res); // выводим его в консоль
                        statusMessage.textContent = this.message.succes; // Выводим в консоль сообщение об успешной отправке формы
                    })
                    .catch(() => { // Обрабатываем ошибку при отправке
                        statusMessage.textContent = this.message.failure; // Устанавливаем сообщение об ошибке при отправке формы
                    })
                    .finally(() => { // После отправки формы (положительный или отрицательный результат)
                        this.clearInputs(); // Очищаем форму
                        setTimeout(() => { // И удаляем со страницы
                            statusMessage.remove(); // сообщение о статусе отправки
                        }, 6000); // через 6 секунд
                    });
            });
        });
    }
}