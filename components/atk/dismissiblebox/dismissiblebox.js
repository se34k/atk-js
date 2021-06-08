class AtkDismissibleBox extends AtkDismissible {
    constructor() {
        super();

        this.setHTML(document.createElement("div"));
        this.setVisibility(false);

        this.addClass("atk-dismissible-box");
    }

    alignTo(element) {
        this.setPosition(element.getHTML().getBoundingClientRect().left, element.getHTML().getBoundingClientRect().top + element.getHTML().offsetHeight);
    }
}
