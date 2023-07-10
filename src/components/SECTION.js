export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
          this._appendItem(this._renderer(item));
        });
    }

    _prependItem(element) {
        this._container.prepend(element);
    }

    _appendItem(element) {
        this._container.append(element);
    }

    renderItem(item, userId) {
        this._prependItem(this._renderer(item, userId));
    }
}