///<reference path="./ha/comp/BaseComponent.ts"/>
class NoteItem extends ha.comp.BaseComponent {
    private item: INote;
    private tglEl: HTMLElement;
    private judulEl: HTMLElement;
    private hapusTbl: HTMLButtonElement;
    private static daftar: NoteItem[] = [];

    constructor(item: INote) {
        super();
        this._template = `
            <div class='note-item padding'>
                <div class='tgl text-align-right'></div>
                <div class='disp-flex'>
                    <div class='judul flex-grow-1 disp-flex align-items-center'></div>
                    <div class='tbl'>
                        <button class='hapus'>🗑</edit>
                    </div>
                </div>
            </div>
        `;
        this.build();
        this.tglEl = this.getEl('div.tgl');
        this.judulEl = this.getEl('div.judul');
        this.hapusTbl = this.getEl('button.hapus') as HTMLButtonElement;

        this.item = item;
        this.refresh();

        this._elHtml.onclick = () => {
            HalDepan.inst.detach();

            HalEdit.Inst.edit(this.item, () => {
                this.refresh();
                HalDepan.inst.attach(document.body);
                Note.simpan();
            });
        }

        this.hapusTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            let ok: boolean = window.confirm('Hapus?');

            if (ok) {
                Note.hapus(this.item.id);
                NoteItem.hapus(this.item);
                this.item = null;
                this.destroy();
                Note.simpan();
            }
        }
    }

    refresh(): void {
        this.tglEl.innerText = this.renderTanggal(this.item.tgl);
        this.judulEl.innerText = this.item.judul;
    }

    renderTanggal(n: number): string {
        let date: Date = new Date(n);

        return (date.getDate() + 1) + '/' + date.getMonth() + '/' + date.getFullYear();
    }

    static hapus(item: INote): void {
        this.daftar.forEach((view: NoteItem, idx: number) => {
            if (view.item == item) {
                this.daftar.splice(idx, 1);
            }
        })

        // console.log(item);
        // throw Error('hapus tidak ketemu: ');
    }

    static buat(item: INote): NoteItem {
        let hasil: NoteItem;

        hasil = new NoteItem(item);
        this.daftar.push(hasil);
        return hasil;
    }

    static filter(teks: string): void {
        this.daftar.forEach((view: NoteItem) => {
            if (!Note.filter(view.item, teks)) {
                view.elHtml.style.display = 'none';
            }
            else {
                view.elHtml.style.display = 'block';
            }
        })
    }

    static filterHapus(): void {
        this.daftar.forEach((view: NoteItem) => {
            view.elHtml.style.display = 'block';
        })
    }


}