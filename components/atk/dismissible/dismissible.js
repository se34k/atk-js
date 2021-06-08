class AtkDismissible extends AtkBaseComponent {
    constructor() {
        super();

        this.exceptedEvents = [];
        this.boundTo = null;

        let dsm = this;
        this.checkFnc = (e) => {
            if (!dsm.isInEventChain(e) && !dsm.exceptedEvents.includes(e)) {
                dsm.setVisibility(false);
            } else if (dsm.exceptedEvents.includes(e)) {
                dsm.exceptedEvents.splice(dsm.exceptedEvents.indexOf(e), 1);
            }
        }
    }

    display() {
        this.setVisibility(true);
    }

    destroy() {
        if (this.isBound()) {
            this.boundTo.remove(this);
            this.boundTo.unregister("click", this.checkFnc);
        }
    }

    bindTo(component) {
        if (this.isBound()) {
            this.destroy();
        }
        this.boundTo = component;

        this.boundTo.add(this);
        this.boundTo.on("click", this.checkFnc);
    }

    isBound() {
        return this.boundTo !== null;
    }

    ignoreEvent(event) {
        this.exceptedEvents[this.exceptedEvents.length] = event;
    }
}
