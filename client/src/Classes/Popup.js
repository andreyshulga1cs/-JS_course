export default class Popup {
    constructor(selector) {
        this.popup = document.querySelector(selector);
        this.popupClose = this.popup.querySelector('.close');
        this.overlay = this.popup.querySelector('.popup__overlay');
        this.title = this.popup.querySelector('.title');

        this.popupClose.addEventListener('click', () => {
            this.close()
        });
        this.overlay.addEventListener('click', () => {
            this.close()
        });
        
    }

    open(title) {
        this.popup.classList.add("open");
        title && (this.title.innerHTML = title);
    }
    
    close() {
        this.popup.classList.remove("open");
    }
}