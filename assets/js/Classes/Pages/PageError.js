import Page from "./Page.js";

export default class PageError extends Page {
    constructor() {
        super();

        if (!PageError._instance) {
            PageError._instance = this;
        }
        return PageError._instance;
    }
    render() {
        this.wrap.innerHTML = `
        <section>
            <div class="container">
                <h1>Page was not found!</h1>
            </div>
        </section>
        `;
    }
}