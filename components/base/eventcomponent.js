class AtkEventComponent {
    constructor() {
        this.listeners = {};
    }

    on(event, executor) {
        if (!this.listenersExistFor(event)) {
            this.listeners[event] = [];
        }
        this.listeners[event][this.listeners[event].length] = {
            executor : executor,
            options : {
                onetime : false
            }
        };
    }

    once(event, executor) {
        if (!this.listenersExistFor(event)) {
            this.listeners[event] = [];
        }
        this.listeners[event][this.listeners[event].length] = {
            executor : executor,
            options : {
                onetime : true
            }
        };
    }

    trigger(event, data = null) {
        if (this.listenersExistFor(event)) {
            this.listeners[event].forEach((item) => {
                item.executor(data);

                if (item.options.onetime) {
                    this.unregister(event, item.executor);
                }
            });
        }
    }

    unregister(event, executor) {
        if (this.listenersExistFor(event)) {
            let executors = this.listeners[event];
            for (let i = 0; i < executors.length; i++) {
                if (executors[i].executor === executor) {
                    executors.splice(i, 1);
                    break;
                }
            }
        }
    }

    unregisterAll(event) {
        if (this.listenersExistFor(event)) {
            delete this.listeners[event];
        }
    }

    listenersExistFor(event) {
        return this.listeners[event] !== undefined;
    }
}
