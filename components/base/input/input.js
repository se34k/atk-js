class AtkBaseInput extends AtkBaseComponent {
    constructor() {
        super();

        this.setHTML(document.createElement("input"));

        let inp = this;
        this.getHTML().addEventListener("input", (e) => {
            inp.trigger("input", e);
        });
        this.getHTML().addEventListener("focus", (e) => {
            inp.trigger("focus", e);
        });
        this.getHTML().addEventListener("blur", (e) => {
            inp.trigger("blur", e);
        });
    }

    setType(type) {
        this.getHTML().type = type;
    }

    getValue() {
        return this.getHTML().value;
    }

    setValue(value) {
        this.getHTML().value = value;
    }

    setMaxLength(maxLength) {
        this.getHTML().setAttribute("maxlength", maxLength);
    }

    removeMaxLength() {
        this.getHTML().removeAttribute("maxlength");
    }
}
