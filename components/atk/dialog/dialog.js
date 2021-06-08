class AtkDialog extends AtkBaseDiv {
    constructor() {
        super();

        this.addClass("atk-dialog");

        this.bg = new AtkDialogBg();
        this.bg.add(this);

        let bg = this.bg;
        let dg = this;
        this.bg.on("click", (e) => {
            if (e.target === bg.getHTML()) {
                bg.setVisibility(false);
            }
        })
    }

    show(root) {
        root.add(this.bg);
        this.bg.setVisibility(true);
    }
}

class AtkDialogBg extends AtkBaseDiv {
    constructor() {
        super();

        this.addClass("atk-dialog-bg");
    }
}
