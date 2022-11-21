import {SERVER_API_URL, SERVER_URL} from '../../Services/constans.js';

import Popup from '../Popup.js';

const popup = new Popup('.popup');

export default class Form {
    constructor(selector) {
        this.selector = document.querySelector(selector);
        if (this.selector) {
            this.inputs = this.selector.querySelectorAll('input');
            this.textareas = this.selector.querySelectorAll('textarea');
            this.formFields = [];
            this.formFields.push.apply(this.formFields, this.inputs);
            this.formFields.push.apply(this.formFields, this.textareas);

            this.fileInputs = this.selector.querySelectorAll('.input-wrap [type="file"]');
            this.imagePath = '';
            this.imageDOM = document.querySelector('.input-wrap .image img');

            this.selector.addEventListener('submit', e => {
                e.preventDefault();
                this.submit();
            });
            this.selector.addEventListener('input', e => {
                this.validate(e);
            });
            if (this.fileInputs) {
                for (let i = 0; i < this.fileInputs.length; i++) {
                    this.fileInputs[i].addEventListener('change', (e) => {
                        const file = e.target.files[0];
                        const data = new FormData();
                        data.append('image', file);
            
                        axios.post(SERVER_API_URL + '/upload', data, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(res => {
                            this.imagePath = SERVER_URL + '/uploads/' + res.data.filename;
            
                            this.imageDOM.src = this.imagePath;
                        }).catch(error => {
                            console.log(error);
                        })
                    });
                }
            }
        }
    }
    submit() {
        this.isValid = false;
        this.data = {};

        this.formData = new FormData(this.selector);
        for (const pair of this.formData.entries()) {
            this.data[pair[0]] = pair[1];
        }
        this.data.image && (this.data.image = this.imagePath);

        for (let i = 0; i < this.formFields.length; i++) {

            let value = this.formFields[i].value,
                reg = new RegExp(this.formFields[i].dataset.reg, 'i'),
                errorTitle = this.formFields[i].dataset.errorTitle;

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