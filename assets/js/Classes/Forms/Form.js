import Popup from '../Popup.js';

const popup = new Popup('.popup');

export default class Form {
    constructor(selector) {
        this.selector = document.querySelector(selector);
        this.inputs = this.selector.querySelectorAll('input');

        this.selector.addEventListener('submit', e => {
            e.preventDefault();
            this.submit();
        });
        this.selector.addEventListener('input', e => {
            this.validate(e);
        });
    }
    submit() {
        this.isValid = false;
        this.user = {};
        this.formData = new FormData(this.selector);
        for (const pair of this.formData.entries()) {
            this.user[pair[0]] = pair[1];
        }

        for (let i = 0; i < this.inputs.length; i++) {

            let value = this.inputs[i].value,
                reg = new RegExp(this.inputs[i].dataset.reg, 'i'),
                errorTitle = this.inputs[i].dataset.errorTitle;

            if (!reg.test(value)) {
                this.isValid = 0;
                popup.open(errorTitle);
                break;
            } else {
                this.isValid = true;
            }
        }
    }
    validate(e) {
        let value = e.target.value,
            reg = new RegExp(e.target.dataset.reg, 'i');
            
        if (reg.test(value)) {
            e.target.className = '';
        } else {
            e.target.className = 'invalid';
        }    
    }
    reset() {
        this.selector.reset();
    }
}