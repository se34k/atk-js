/*
*   A simple text button
*/
class AtkButton extends AtkBaseButton {
    constructor(text) {
        super();

        this.addClass("atk-button");

        this.text = new AtkInlineText(text);
        this.add(this.text);
    }

    changeText(text) {
        this.text.changeText(text);
    }
}
