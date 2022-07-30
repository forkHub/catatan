///<reference path="./ha/comp/BaseComponent.ts"/>

class HalDepan extends ha.comp.BaseComponent {
    private static instObj: HalDepan;
    private _listCont: HTMLElement;
    private cariEl: HTMLInputElement;
    public get listCont(): HTMLElement {
        return this._listCont;
    }

    constructor() {
        super();
        this._template = `
            <div class='hal-depan padding'>
                <h1>Catatan:</h1>
                <div class='padding'></div>
                <div class='cari-catatan'>
                    <input type='text' class='width-12 cari-note padding border-radius-16' placeholder='cari catatan'>
                </div>
                <div class='padding'></div>
                <div class='list-cont'>
                </div>
            </div>
        `;
        this.build();

        this._listCont = this.getEl('div.list-cont');
        this.cariEl = this.getEl('input.cari-note') as HTMLInputElement;

        this.listCont.style.paddingBottom = '72px';

        this.cariEl.oninput = () => {
            if (this.cariEl.value.length > 0) {
                NoteItem.filter(this.cariEl.value);
            }
            else {
                NoteItem.filterHapus();
            }
        }
    }

    static get inst(): HalDepan {
        if (this.instObj) return this.instObj;

        this.instObj = new HalDepan();
        return this.instObj;
    }
}