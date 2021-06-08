class AtkTextField extends AtkBaseDiv {
    constructor(placeholder = "") {
        super();

        this.addClass("atk-textfield-showcase");

        this.inputBox = new AtkBaseDiv();
        this.inputBox.addClass("atk-textfield");
        this.add(this.inputBox);

        this.icon = new AtkIcon("magnifying-glass-bold");
        this.inputBox.add(this.icon);

        this.input = new AtkBaseInput();
        this.input.getHTML().placeholder = placeholder;
        this.inputBox.add(this.input);

        this.climitIndicator = new AtkBaseDiv();
        this.climitIndicator.addClass("atk-charlimit-indicator");
        this.add(this.climitIndicator);

        this.setCharacterLimit(-1);

        let tf = this;
        this.input.on("input", (e) => {
            tf.updateCharacterLimitIndicator();
            tf.trigger("input", e);
        });
        this.input.on("focus", (e) => {
            if (tf.getFlag("hide-icon-on-focus")) {
                tf.hideIcon();
            }
        });
        this.input.on("blur", (e) => {
            if (tf.getFlag("hide-icon-on-focus")) {
                tf.showIcon();
            }
        });
        this.on("flagchange", (flag) => {
            switch (flag) {
                case "hide-icon-on-focus":
                    if (!tf.getFlag(flag)) {
                        tf.showIcon();
                    }
                    break;
            }
        });

        this.hideIcon();
        this.setFlag("hide-icon-on-focus", false);
    }

    setCharacterLimit(limit) {
        this.charLimit = limit;
        if (limit !== -1) {
            this.input.setMaxLength(limit);
            this.climitIndicator.setVisibility(true);
            this.updateCharacterLimitIndicator();
        } else {
            this.input.removeMaxLength();
            this.climitIndicator.setVisibility(false);
        }
    }

    updateCharacterLimitIndicator() {
        this.climitIndicator.setInnerText(this.input.getValue().length + "/" + this.charLimit);
    }

    getValue() {
        return this.input.getValue();
    }

    setValue(value) {
        this.input.setValue(value);
        this.updateCharacterLimitIndicator();
    }

    changeIcon(icon) {
        this.icon.changeIcon(icon);
        this.showIcon();
    }

    hideIcon() {
        this.iconVisible = false;
        //this.icon.setVisibility(false);
        this.inputBox.removeClass("atk-textfield-icon-shown");
    }

    showIcon() {
        this.iconVisible = true;
        //this.icon.setVisibility(true);
        this.inputBox.addClass("atk-textfield-icon-shown");
    }

    focus() {
        this.input.focus();
    }
}
