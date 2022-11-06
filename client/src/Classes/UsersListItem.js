export default class UsersListItem {
    constructor(user) {
        this.user = user;
    }
    render() {
        let photoUrl = this.user.avatar || 'http://localhost:3000/src/assets/img/no-photo.jpg';
        
        return `
        <div class="account-wrap__user" data-user-email="${this.user.email}">
            <div class="photo">
                <img src="${photoUrl}" alt="">
            </div>
            <ul class="info-list">
                <li><b>Email: ${this.user.email}</b></li>
                ${(this.user.password) ? `<li><span>Password:</span> ${this.user.password}</li>` : ''}
                ${(this.user.age) ? `<li><span>Age:</span> ${this.user.age}</li>` : ''}
                ${(this.user.sex) ? `<li><span>Sex:</span> ${this.user.sex}</li>` : ''}
                ${(this.user.tel) ? `<li><span>Phone:</span> ${this.user.tel}</li>` : ''}
            </ul>
            <div class="button edit-button"></div>
            <div class="button remove-button"></div>
        </div>
        `;
    }
}