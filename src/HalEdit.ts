class HalEdit extends ha.comp.BaseComponent {
    private static instObj: HalEdit;
    private judulEl: HTMLInputElement;
    private isiEl: HTMLTextAreaElement;
    private backTbl: HTMLElement;
    private selesai: () => void;
    private note: INote;

    constructor() {
        super();
        this._template = `
            <div class='disp-flex flex-dir-col min-height-12 padding'>
                <div class='edit-note disp-table'>
                    <button type='button' class='disp-cell white-space-no-wrap kembali'>&larr;</button>
                    <div class='disp-cell width-12 padding-kiri'>Edit Note</div>
                </div>
                <div class='padding'></div>
                <div class='disp-flex flex-dir-col flex-grow-1'>
                    <label for='judul'>Judul:</label>
                    <input type='text' name='judul' class='judul'/>
                    <div class='padding'></div>
                    <label for='judul'>Isi:</label>
                    <textarea class='flex-grow-1 isi' name='isi' rows='20' cols='80'/></textarea>
                </div>
            </div>
        `;
        this.build();
        this.judulEl = this.getEl('input.judul') as HTMLInputElement;
        this.isiEl = this.getEl('textarea.isi') as HTMLTextAreaElement;
        this.backTbl = this.getEl('button.kembali') as HTMLButtonElement;

        this.judulEl.onchange = () => {
            this.note.judul = this.judulEl.value;
        }

        this.isiEl.onchange = () => {
            this.note.isi = this.isiEl.value;
        }

        this.backTbl.onclick = () => {
            this.detach();
            this.selesai();
        }
    }

    static get Inst(): HalEdit {
        if (this.instObj) return this.instObj;

        this.instObj = new HalEdit();
        return this.instObj;
    }

    updateView(): void {
        this.judulEl.value = this.note.judul;
        this.isiEl.value = this.note.isi;
    }

    edit(note: INote, f: () => void): void {
        this.note = note;
        this.updateView();
        this.selesai = f;
        this.attach(document.body);
    }
}