class AtkBaseButton extends AtkBaseComponent {
    constructor() {
        super();
        
        this.setHTML(document.createElement("button"));
        
        let btn = this;
        this.getHTML().addEventListener("click", function(e) {
            btn.trigger("click", e);
        });
    }
    
    disable() {
        this.getHTML().disabled = true;
    }
    
    enable() {
        this.getHTML().disabled = false;
    }
}
