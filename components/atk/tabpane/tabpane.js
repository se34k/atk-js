class AtkTabPane extends AtkBaseDiv {
    constructor() {
        super();

        this.subViews = {};

        this.addClass("atk-tab-pane");

        this.topBar = new AtkTabPaneBar();
        this.add(this.topBar);

        this.indicator = new AtkTabPaneIndicator();
        this.topBar.add(this.indicator);

        this.contentPane = new AtkBaseDiv();
        this.contentPane.addClass("atk-tab-pane-content");
        this.add(this.contentPane);

        this.selectedSubView;
    }

    addSubView(view, title) {
        let tabBtn = new AtkTabButton(title);
        this.privateAddSubView(view, tabBtn);
    }
    
    privateAddSubView(view, button) {
        this.topBar.add(button);
        this.contentPane.add(view);
        view.setVisibility(false);

        let tp = this;
        button.on("click", (e) => {
            tp.selectSubView(view.id);
        });

        let pos = Object.keys(this.subViews).length;

        this.subViews[view.id] = {
            view : view,
            button : button,
            position : pos
        };

        if (this.selectedSubView === undefined) {
            this.selectSubView(view.id);
        }
    }

    removeSubView(viewId) {
        if (this.subViews[view.id] !== undefined) {
            let viewItem = this.subViews[view.id];
            this.topBar.remove(viewItem.button);
            this.contentPane.remove(viewItem.view);

            delete this.subViews[view.id];
        }
    }

    selectSubView(id) {
        if (this.subViews[id] !== undefined && (this.selectedSubView === undefined || this.selectedSubView.view.id !== id)) {
            let viewItem = this.subViews[id];
            let btns = this.topBar.getChildren();
            for (let view in this.subViews) {
                let btn = this.subViews[view].button;
                if (btn.unselect !== undefined) {
                    btn.unselect();
                }
                this.subViews[view].view.setVisibility(false);
            }
            viewItem.button.select();

            this.indicator.getStyleManager().setWidth(viewItem.button.getHTML().offsetWidth / 3);
            this.indicator.getStyleManager().setLeft(viewItem.button.getHTML().offsetLeft + viewItem.button.getHTML().offsetWidth / 3);

            if (this.selectedSubView !== undefined && viewItem.position > this.selectedSubView.position) {
                viewItem.view.getHTML().style.animationName = "tabSubPaneRollLeft";
            } else {
                viewItem.view.getHTML().style.animationName = "tabSubPaneRollRight";
            }
            viewItem.view.setVisibility(true);

            this.selectedSubView = viewItem;
            
            this.trigger("subviewselected", id);
        }
    }
}

class AtkTabPaneIndicator extends AtkBaseDiv {
    constructor() {
        super();

        this.addClass("atk-tab-pane-bar-indicator");
    }
}

class AtkTabPaneBar extends AtkBaseDiv {
    constructor() {
        super();

        this.addClass("atk-tab-pane-bar");
    }
}

class AtkTabPaneSubView extends AtkBaseDiv {
    constructor(id) {
        super();

        this._id = id;
        this.addClass("atk-tab-pane-sub-view")
    }

    get id() {
        return this._id;
    }
}

class AtkTabButton extends AtkBaseButton {
    constructor(text) {
        super();

        this.addClass("atk-tab-button");

        this.setInnerText(text);
    }

    select() {
        this.addClass("atk-selected");
    }

    unselect() {
        this.removeClass("atk-selected");
    }
}
