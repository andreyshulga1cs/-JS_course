export default class Storage {
    constructor(keyStorage) {
        this.keyStorage = keyStorage;
    }

    set(value) {
        localStorage.setItem(this.keyStorage, JSON.stringify(value));
    }
    get() {
        return JSON.parse(localStorage.getItem(this.keyStorage));
    }
    
}