class AtkBaseLabel extends AtkBaseComponent {
    constructor() {
        super();

        this.setHTML(document.createElement("label"));
    }
}
