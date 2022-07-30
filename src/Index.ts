window.onload = () => {
	HalDepan.inst.attach(document.body);
	TambahTbl.inst.attach(document.body);
	Note.load();
}

function debug(): void {
	for (let i: number = 0; i < 100; i++) {
		Note.buat(Date.now(), 'judul' + i, 'isi' + i);
	}
	Note.renderAll();
}

interface INote {
	id: number,
	tgl: number,
	judul: string,
	isi: string
}