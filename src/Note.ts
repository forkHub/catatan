class Note {
    private static readonly daftarNote: INote[] = [];

    static buat(tgl: number, judul: string, isi: string): INote {
        let hasil: INote;

        hasil = {
            id: Id.id,
            tgl: tgl,
            judul: judul,
            isi: isi
        }

        this.daftarNote.push(hasil);
        return hasil;
    }

    static hapus(id: number): void {
        this.daftarNote.forEach((item: INote, idx: number) => {
            if (item.id == id) {
                this.daftarNote.splice(idx, 1);
                return;
            }
        });

        // throw Error('hapus error, id: ' + id);
    }

    static filter(note: INote, teks: string): boolean {
        if (note.judul.indexOf(teks) > -1) return true;
        if (note.isi.indexOf(teks) > -1) return true;
        return false;
    }

    static renderAll(): void {
        this.daftarNote.forEach((note: INote) => {
            NoteItem.buat(note).attach(HalDepan.inst.listCont);
        })
    }

    static simpan(): void {
        window.localStorage.setItem('ha.note.data', JSON.stringify(this.daftarNote));
    }

    static load(): void {
        let str: string;
        this.hapusSemua();

        try {
            str = window.localStorage.getItem('ha.note.data');
            if (str) {
                let note: INote[] = JSON.parse(str);

                note.forEach((item: INote) => {
                    this.daftarNote.push(item);
                });

                this.renderAll();
            }
            else {
                console.log('data belum ada');
            }
        }
        catch (e) {
            console.error(e);
            ha.comp.dialog.tampil('Ada kesalahan');
        }
    }

    static hapusSemua(): void {
        while (this.daftarNote.length > 0) {
            let note: INote;

            note = this.daftarNote[0];
            NoteItem.hapus(note);
            this.hapus(note.id);
        }
    }
}