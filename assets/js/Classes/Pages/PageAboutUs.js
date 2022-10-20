import Page from "./Page.js";

export default class PageAboutUs extends Page {
    constructor() {
        super();

        if (!PageAboutUs._instance) {
            PageAboutUs._instance = this;
        }
        return PageAboutUs._instance;
    }
    render() {
        this.wrap.innerHTML = `
        <section>
            <div class="container">
                <h1>Welcome to About Us!</h1>
                <div class="cols">
                    <div class="col">
                        <div class="about-block">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium quis tempora reprehenderit natus ut ullam eveniet! Illo sapiente adipisci voluptatem.
                        </div>
                    </div>
                    <div class="col">
                        <div class="about-block">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium quis tempora reprehenderit natus ut ullam eveniet! Illo sapiente adipisci voluptatem.
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}