class AtkToggle extends AtkBaseLabel {
    constructor(label) {
        super();

        this.addClass("atk-toggle");

        this.txt = new AtkBaseSpan();
        this.txt.setInnerText(label);

        this.add(this.txt);

        this.inp = new AtkBaseInput();
        this.inp.setType("checkbox");
        this.inp.setVisibility(false);

        this.add(this.inp);

        this.toggleBg = new AtkBaseDiv();
        this.toggleBg.addClass("atk-toggle-bg");

        this.add(this.toggleBg);

        this.toggleHandle = new AtkBaseDiv();
        this.toggleHandle.addClass("atk-toggle-handle");
        this.toggleBg.add(this.toggleHandle);
    }
}
