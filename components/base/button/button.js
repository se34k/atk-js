class AtkBaseButton extends AtkBaseComponent {
    constructor() {
        super();
        
        this.setHTML(document.createElement("button"));
    }
    
    disable() {
        this.getHTML().disabled = true;
    }
    
    enable() {
        this.getHTML().disabled = false;
    }
}
