/*
*   The ATK base component, offers
*   basic methods to modify the UI
*/
class AtkBaseComponent extends AtkEventComponent {
    /*
    *   Creates a new AtkBaseComponent
    *   without a correlating HTMLNode
    *   being set
    */
    constructor() {
        super();

        this.h;
        this.children = [];
        this.parent = null;
        this.flags = {};
        
        this.events = [
            "click",
            "contextmenu",
            "dblclick"
        ]
        this.eventFuns = {};
    }
    
    /*
    *   Creates a trigger function that
    *   connects an EventListener with
    *   an ATK listener
    */
    createTriggerFun(type) {
        let cmp = this;

        let fnc = (e) => {
            cmp.trigger(type, e);
        };
        this.eventFuns[type] = fnc;
        
        return fnc;
    }
    
    /*
    *   Returns an existing trigger function
    *   associated with the given event type
    */
    getTriggerFun(type) {
        return this.eventFuns[type];
    }
    
    /*
    *   Removes all trigger functions of this
    *   component
    */
    removeTriggerFuns() {
        for (let event in this.eventFuns) {
            this.removeTriggerFun(event);
        }
    }
    
    /*
    *   Removes all trigger functions of this
    *   component
    */
    removeTriggerFun(type) {
        this.getHTML().removeEventListener(type, this.getTriggerFun(type));
    }

    /*
    *   Returns this component's HTMLNode
    */
    getHTML() {
        return this.h;
    }

    /*
    *   Sets this component's HTMLNode
    */
    setHTML(html) {
        if (this.getHTML() !== undefined) {
            this.removeTriggerFuns();
        }
        this.h = html;
        
        for (let event of this.events) {
            this.getHTML().addEventListener(event, this.createTriggerFun(event));
        }
    }

    /*
    *   Adds a component as a child
    */
    add(component) {
        this.children[this.children.length] = component;
        component.setParent(this);
        this.getHTML().appendChild(component.getHTML());
    }

    /*
    *   Removes a component in case it
    *   is a child of this one
    */
    remove(component) {
        if (component.isChildOf(this)) {
            component.setParent(null);
            this.children.splice(this.children.indexOf(component), 1);
            this.getHTML().removeChild(component.getHTML());
        }
    }

    /*
    *   Replaces a child component with
    *   a new component
    */
    replace(oldcomponent, component) {
        if (component.isChildOf(this)) {
            this.getHTML().replaceChild(oldcomponent.getHTML(), component.getHTML());
        }
    }

    /*
    *   Removes all children of this element
    */
    clear() {
        for (let child of this.getChildren()) {
            this.remove(child);
        }
    }

    /*
    *   Returns an array with all children
    *   of this component
    */
    getChildren() {
        return this.children;
    }

    /*
    *   Moves this component to another,
    *   i.e. removes it from its current
    *   parent and adds it to the given
    *   new one
    */
    move(parent) {
        this.parent.remove(this);
        parent.add(this);
    }

    /*
    *   Returns whether this component's
    *   HTMLNode is a child of the given
    *   component's HTMLNode
    */
    isChildOf(component) {
        return this.getHTML().parentElement === component.getHTML();
    }

    /*
    *   Hides or shows this component
    *   based on whether isVisible is true
    *   or false
    */
    setVisibility(isVisible) {
        if (isVisible) {
            this.removeClass("atk-style-hidden");
        } else {
            this.addClass("atk-style-hidden");
        }
        this.trigger("visibilitychange", isVisible);
    }

    /*
    *   Adds a class to this component's
    *   HTMLNode
    */
    addClass(className) {
        this.getHTML().classList.add(className);
    }

    /*
    *   Removes a class from this component's
    *   HTMLNode
    */
    removeClass(className) {
        this.getHTML().classList.remove(className);
    }

    /*
    *   Toggles a class of this component's
    *   HTMLNode
    */
    toggleClass(className) {
        this.getHTML().classList.toggle(className);
    }

    /*
    *   Replaces one class with another
    */
    switchClass(oldClassName, newClassName) {
        this.removeClass(oldClassName);
        this.addClass(newClassName);
    }

    /*
    *   Returns a boolean on whether this component's
    *   HTMLNode class list contains the given class
    *   name
    */
    hasClass(className) {
        this.h.classList.contains(className);
    }

    /*
    *   Sets this component's HTMLNode's innerText
    */
    setInnerText(innerText) {
        this.h.innerText = innerText;
    }

    /*
    *   Return this component's HTMLNode's innerText
    */
    getInnerText() {
        return this.h.innerText;
    }

    /*
    *   Returns this component's HTMLNode's parent
    *   element
    */
    getParentElement() {
        return this.getHTML().parentElement;
    }

    /*
    *   Gets the component that is on top of the
    *   ancestor hierarchy this component is part
    *   of
    */
    getTopParent() {
        let parent = this.parent;
        while (parent.getParent() !== null) {
            parent = parent.getParent();
        }
        return parent;
    }

    /*
    *   Returns this component's parent component
    */
    getParent() {
        return this.parent;
    }

    /*
    *   Sets this component's parent
    */
    setParent(parent) {
        this.parent = parent;
        this.trigger("newparent", parent);
    }

    /*
    *   Returns whether this component is the target
    *   of a given event
    */
    isEventTarget(event) {
        return this.getHTML() === event.target;
    }

    /*
    *   Return whether this component is included
    *   in the chain of event propagation
    */
    isInEventChain(event) {
        let el = event.target;
        while (el.parentElement !== null || el === this.getHTML()) {
            if (el === this.getHTML()) {
                return true;
            }
            el = el.parentElement;
        }
        return false;
    }

    /*
    *   Sets this component's x and y positions
    */
    setPosition(x, y) {
        x = x !== null ? x + "px" : "auto";
        y = y !== null ? y + "px" : "auto";
        this.getHTML().style.left = x;
        this.getHTML().style.top = y;
    }

    /*
    *   Sets this component's width and height
    */
    setDimensions(x, y) {
        x = x !== null ? x + "px" : "auto";
        y = y !== null ? y + "px" : "auto";
        this.getHTML().style.width = x;
        this.getHTML().style.height = y;
    }

    /*
    *   Sets this component's theme
    */
    setTheme(theme) {
        if (this.theme !== undefined) {
            this.removeTheme(this.theme);
        }
        this.theme = theme;
        this.addClass(theme);
        this.trigger("themechange", theme);
    }

    /*
    *   Removes this component's theme
    */
    removeTheme(theme) {
        this.removeClass(theme);
    }

    /*
    *   Returns this component's theme
    */
    getTheme() {
        return this.theme;
    }

    /*
    *   Returns whether a theme is set
    *   for this component
    */
    themeSet() {
        return this.theme !== undefined;
    }

    /*
    *   Sets a flag for this component
    */
    setFlag(flag, value) {
        this.flags[flag] = value;
        this.trigger("flagchange", flag);
    }

    /*
    *   Gets a flag value of this component
    */
    getFlag(flag) {
        return this.flags[flag];
    }

    /*
    *   Returns a boolean indicating whether
    *   the given flag exists for this
    *   component
    */
    flagExists(flag) {
        return this.flags[flag] !== undefined;
    }

    /*
    *   Removes a flag from this component if
    *   it exists
    */
    removeFlag(flag) {
        if (this.flagExists(flag)) {
            delete this.flags[flag];
            this.trigger("flagremoved", flag);
        }
    }

    /*
    *   Returns a style manager for this component
    *   and creates a new one in case it is not
    *   already set
    */
    getStyleManager() {
        if (this.styleManager === undefined) {
            this.styleManager = new AtkStyleManager(this);
        }
        return this.styleManager;
    }

    focus() {
        this.getHTML().focus();
    }
}
