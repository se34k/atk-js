class AtkButtonIcon extends AtkBaseButton {
    constructor(icon) {
        super();

        this.addClass("atk-button");
        this.addClass("atk-button-icon");

        this.add(icon);
        this.getHTML().setAttribute("aria-label", icon.getIconIdentifier());
    }

    changeIcon(iconIdentifier) {
        this.icon.changeIcon(iconIdentifier);
    }
}
