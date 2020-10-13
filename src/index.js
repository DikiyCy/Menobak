import mapsYandex from '@models/map';

import '@/styles/style.scss';

// elements from DOM
const form = document.getElementsByClassName('form')[0],
    inputName = form.getElementsByClassName('form__name')[0],
    inputPhone = form.getElementsByClassName('form__phone')[0],
    info = form.getElementsByClassName('for_input_info'),
    error = form.getElementsByClassName('for_input_error'),
    checkboxForm = form.getElementsByClassName('form__checkbox')[0],
    infoSubmit = form.getElementsByClassName('for_btn')[0],
    announcement = document.getElementsByClassName('announcement')[0],
    btnSubmit = form.getElementsByClassName('btn_form')[0];


document.addEventListener('DOMContentLoaded', () => {
    let widthWindow = document.documentElement.clientWidth;

    if (widthWindow > 991) {
        mapsYandex([53.25355473, 49.93796479]);
    } else if (571 < widthWindow && widthWindow < 991) {
        mapsYandex([54.193232, 45.141885]);
    } else if (widthWindow <= 571) {
        mapsYandex([54.552701, 33.968294]);
    }


    // input - input на который вешаем событие
    // event - событие
    // index - номер элемента "info" в псевдоколлекции
    // ection - действие с классом
    const toggleSpan = (input, event, index, action) => {
        input.addEventListener(event, () => {
            info[index].classList[action]('hidden');
        })
    }
    toggleSpan(inputName, 'focus', 0, 'remove');
    toggleSpan(inputName, 'blur', 0, 'add');
    toggleSpan(inputPhone, 'focus', 1, 'remove');
    toggleSpan(inputPhone, 'blur', 1, 'add');

    // function for checked input value
    // input - input на который вешаем событие
    // regExpesh - регулярное выражение для проверки
    // index - номер элемента "error" в псевдоколлекции
    // inputValid - флаг проверки
    const checkedInput = (input, regExpesh, index) => {
        if (!regExpesh) {
            input.classList.add('not-validate');
            error[index].classList.remove('hidden');
        } else {
            input.classList.remove('not-validate');
            error[index].classList.add('hidden');
        }
    };

    inputName.addEventListener('input', () => {
        let nameReg = inputName.value.match(/[а-яА-ЯёЁ]{3,}/);
        checkedInput(inputName, nameReg, 0);
    })

    inputPhone.addEventListener('input', () => {
        let phoneReg = inputPhone.value.match(/((\+7)|8)\d{10}/);
        checkedInput(inputPhone, phoneReg, 1);
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!checkboxForm.checked || inputName.value.length === 0 || inputPhone.value.length === 0 ) {
            infoSubmit.classList.remove('hidden');
        } else if (checkboxForm.checked && inputName.value.length !== 0 && inputPhone.value.length !== 0 ) {
            infoSubmit.classList.add('hidden');
            announcement.style.display = 'flex';
            setTimeout(() => {
                announcement.style.display = 'none';
            }, 3000)
        }
        form.reset();
    });
})
