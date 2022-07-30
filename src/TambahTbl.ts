///<reference path="./ha/comp/BaseComponent.ts"/>

class TambahTbl extends ha.comp.BaseComponent {
    private static instObj: TambahTbl;

    constructor() {
        super();
        this._template = `
            <div class='tambah-user-tbl user-select-none cursor-pointer'>+</div>
        `;
        this.build();


        this._elHtml.onclick = (e: MouseEvent) => {
            e.stopPropagation();

            console.log('tambah note');
            let note: INote;

            note = Note.buat(Date.now(), '', '');
            let item: NoteItem = NoteItem.buat(note);
            item.attach(HalDepan.inst.listCont);

            HalDepan.inst.detach();
            this.detach();

            HalEdit.Inst.edit(note, () => {
                item.refresh();
                HalDepan.inst.attach(document.body);
                this.attach(document.body);
                Note.simpan();
            })

        }
    }

    static get inst(): TambahTbl {
        if (this.instObj) return this.instObj;

        this.instObj = new TambahTbl();
        return this.instObj;
    }


}