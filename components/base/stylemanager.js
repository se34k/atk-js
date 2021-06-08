class AtkStyleManager {
    /*
    *   Creates a new StyleManager for the given
    *   component
    */
    constructor(component) {
        this.component = component;
    }

    /*
    *   Sets this component's x and y positions
    */
    setPosition(x, y, xUnit = "px", yUnit = "px") {
        x = x !== null ? x + xUnit : "auto";
        y = y !== null ? y + yUnit : "auto";
        this.component.getHTML().style.left = x;
        this.component.getHTML().style.top = y;
    }

    /*
    *   Sets the managed component's x position
    */
    setLeft(x) {
       this.component.getHTML().style.left = x + "px";
    }

    /*
    *   Sets this component's width and height
    */
    setDimensions(x, y, xUnit = "px", yUnit = "px") {
        x = x !== null ? x + xUnit : "auto";
        y = y !== null ? y + yUnit : "auto";
        this.component.getHTML().style.width = x;
        this.component.getHTML().style.height = y;
    }

    /*
    *   Sets the managed component's width
    */
    setWidth(x) {
        this.component.getHTML().style.width = x + "px";
    }

    /*
    *   Sets the managed component's margins
    */
    setMargin(top, right = null, bottom = null, left = null) {
        top = top !== null ? top + "px" : "auto";
        right = right !== null ? right + "px" : "auto";
        bottom = bottom !== null ? bottom + "px" : "auto";
        left = left !== null ? left + "px" : "auto";

        this.component.getHTML().style.margin = top + " " + right + " " + bottom + " " + left;
    }

    /*
    *   Sets the managed component's padding
    */
    setPadding(top, right = null, bottom = null, left = null) {
        top = top !== null ? top + "px" : "auto";
        right = right !== null ? right + "px" : "auto";
        bottom = bottom !== null ? bottom + "px" : "auto";
        left = left !== null ? left + "px" : "auto";

        this.component.getHTML().style.padding = top + " " + right + " " + bottom + " " + left;
    }
}
