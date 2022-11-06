export default class UsersListItem {
    constructor(user) {
        this.user = user;
        for (let email in this.user) {
            this.email = email;
            break;
        }
    }
    render() {
        let userInfo = '';
        for (let key in this.user[this.email]) {
            if (key !== 'password') {
                userInfo += `<li><span>${key}</span>: ${this.user[this.email][key]}</li>`;
            };
        }
        return `
        <div class="account-wrap__user" data-user-email="${this.email}">
            <ul class="info-list">
                <li><b>Email: ${this.email}</b></li>
                ${userInfo}
            </ul>
            <div class="button edit-button"></div>
            <div class="button remove-button"></div>
        </div>
        `;
    }
}