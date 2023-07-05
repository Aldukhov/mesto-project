import { Api } from "./API copy";

export class UserInfo {
    constructor(nameSelector,postSelector, avatarSelector) {
        this._nameSelector = nameSelector;
        this._postSelector = postSelector;
        this._avatarSelector = avatarSelector;

        this._name = document.querySelector(this._nameSelector);
        this._post = document.querySelector(this._postSelector);
        this._avatar = document.querySelector(this._avatarSelector);
    }

    getUserInfo() {
        return {name: this._name.textContent,
                post: this._post.textContent}

    }

    setUserInfo(user) {
        this.userId = user._id;
        this._name.textContent = user.name;
        this._caption.textContent = user.about;
        this._userAvatar.src = user.avatar;
    }
}