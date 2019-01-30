class Validator {
    constructor(form) {
        this.patterns = {
            name: /[a-zа-яё]+()[a-zа-яё]+/i,
            phone: /[0-9]+/,
            //phone: /\+7\(\d+\)\d+-\d+/, - Использовал этот метод до маски
            email: /\w+[-.]?\w+(@)\w+.(ru|com)/i
        };
        this.errors = {
            name: 'Имя содержит только буквы',
            phone: 'Телефон подчиняется шаблону +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru',
            city: 'Выберите город'
        };
        this.errorClass = 'error-msg';
        this.form = form;
        this._validateForm(this.form);
    }
    _validateForm(form) {
        let formFields = [...document.getElementById(form).getElementsByTagName('input')];
        for (let field of formFields) {
            this._validate(field);
        }
    }
    //Проверка для поля Input.
    _validate(field) {
        if (this.patterns[field.name]) {
            if (!this.patterns[field.name].test(field.value)) {
                field.classList.toggle('invalid');
                this._addErrorMsg(field);
                this._watchField(field);
            }
        }
    }
    _addErrorMsg(field) {
        let errMsg = document.createElement('div');
        errMsg.classList.add(this.errorClass);
        errMsg.textContent = this.errors[field.name];
        field.parentNode.appendChild(errMsg);
    }
    /**
     * @param {*} field Проверка полей (вывод ошибки)
     */
    _watchField(field) {
        field.addEventListener('input', () => {
            if (this.patterns[field.name].test(field.value)) {
                field.classList.remove('invalid');
                field.classList.add('valid');
                if (field.parentNode.lastChild !== field) {
                    field.parentNode.lastChild.remove();
                }
            } else {
                field.classList.add('invalid');
                field.classList.remove('valid');
                if (field.parentNode.lastChild.nodeName !== 'DIV') {
                    this._addErrorMsg(field);
                }
            }
        });
    }
}
/**
 * Маска для ввода текста в поле (телефон)
 */
$(document).ready(() => {
    $('.phone').mask('+7 (000) 000-00-00');
});