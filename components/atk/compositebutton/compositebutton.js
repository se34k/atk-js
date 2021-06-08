class AtkCompositeButton extends AtkBaseDiv {
    constructor(button) {
        super();

        this.options = [];

        this.addClass("atk-composite-button");

        this.moreBtn = new AtkButtonIcon(new AtkIcon("caret-down-bold"));
        this.moreBtn.addClass("atk-composite-more-btn");

        this.button = button;
        this.add(button);
        this.add(this.moreBtn);

        this.moreBox = new AtkDismissibleBox();

        let btn = this;

        button.on("click", (e) => {
            btn.trigger("main", e);
        });

        this.moreBtn.on("click", (e) => {
            btn.moreBox.ignoreEvent(e);
            btn.moreBox.display();
            btn.moreBox.alignTo(btn.moreBtn);
        });

        this.on("newparent", (parent) => {
            btn.moreBox.bindTo(btn.getTopParent());
        });

        this.on("themechange", (theme) => {
            btn.button.setTheme(theme);
            btn.moreBtn.setTheme(theme);
        });
    }

    checkOptionsMoreBtnNeeded() {
        this.moreBtn.setVisibility(this.options.length > 0);
    }

    getOption(value) {
        return this.options.find((item) => item.value === value);
    }

    getOptionButton(value) {
        return this.getOption(value).button;
    }

    addOption(name, value = name) {
        let optionBtn = new AtkButton(name);
        optionBtn.setTheme(AtkThemes.BUTTON_LIST_ITEM);
        this.moreBox.add(optionBtn);

        this.options[this.options.length] = {
            value : value,
            name : name,
            button : optionBtn
        };

        let btn = this;
        optionBtn.on("click", (e) => {
            btn.trigger("option", value);
            btn.moreBox.setVisibility(false);
        });

        this.checkOptionsMoreBtnNeeded();
    }

    removeOption(value) {
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].value === value) {
                this.moreBox.remove(this.options[i].button);
                this.options.splice(i, 1);
                this.checkOptionsMoreBtnNeeded();
                break;
            }
        }
    }
}
