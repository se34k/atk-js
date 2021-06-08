/*
*   An icon component. The icon graphics are
*   taken from Phosphor Icons.
*/
class AtkIcon extends AtkBaseI {
    /*
    *   Creates a new AtkIcon with the
    *   given identifier
    */
    constructor(iconIdentifier) {
        super();

        this.addClass("atk-icon");
        this.addClass("ph");

        this.iconIdentifier = iconIdentifier;
        this.addClass("ph-" + iconIdentifier);
    }

    /*
    *   Changes this component's icon
    */
    changeIcon(iconIdentifier) {
        this.removeClass("ph-" + this.iconIdentifier);
        this.iconIdentifier = iconIdentifier;
        this.addClass("ph-" + iconIdentifier);
    }

    getIconIdentifier() {
        return this.iconIdentifier;
    }
}
