export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element, place) {
        if (place === 'append') {
            this._container.append(element);
        } else {
        this._container.prepend(element);}
    }

    renderItems(data,method) {
        data.forEach(item => {
          this._renderer(item,method);
        });
    }
}