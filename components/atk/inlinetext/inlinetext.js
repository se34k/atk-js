class AtkInlineText extends AtkBaseSpan {
    constructor(text) {
        super();

        this.setInnerText(text);
    }

    changeText(text) {
        this.setInnerText(text);
    }
}
