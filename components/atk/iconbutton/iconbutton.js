class AtkIconButton extends AtkBaseButton {
    constructor(icon, text) {
        super();

        this.addClass("atk-button");
        this.addClass("atk-icon-button");

        this.text = new AtkInlineText(text);
        this.icon = icon;

        this.add(this.icon);
        this.add(this.text);
    }

    changeText(text) {
        this.text.changeText(text);
    }

    changeIcon(iconIdentifier) {
        this.icon.changeIcon(iconIdentifier);
    }
}
