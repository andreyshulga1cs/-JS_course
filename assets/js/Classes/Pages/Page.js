export default class Page {
    constructor() {
        this.wrap = document.querySelector('main');
    }
    render(html) {
        this.wrap.innerHTML = html;
    }
}