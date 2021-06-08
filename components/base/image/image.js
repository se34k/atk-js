class AtkBaseImage extends AtkBaseComponent {
    constructor(src) {
        super();

        this.setHTML(document.createElement("img"));
        this.getHTML().setAttribute("src", src);
    }
}
