import Page from "./Page.js";

export default class PageHome extends Page {
    constructor() {
        super();

        if (!PageHome._instance) {
            PageHome._instance = this;
        }
        return PageHome._instance;
    }
    render() {
        this.wrap.innerHTML = `
        <section>
            <div class="container">
                <h1>Welcome to Homepage!</h1>
            </div>
        </section>
        `;
    }
}