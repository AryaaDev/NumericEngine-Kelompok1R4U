const placeholder = {
gauss: `2 4 -2 2
4 9 -3 8
-2 -3 7 10`,

gaussSeidel: `4 -1 1 7
4 -8 1 -21
-2 1 5 15
toleransi: 0.3
---
iterasi: 50(Opsional)
awal: 1, 2, 2`,

bisection:`Contoh: x^3-4*x-9
a: 2
b: 3
ketelitian: 3`,

secant:`Contoh:
fungsi: x^3-4*x-9
x0: 2
x1: 3
iterasi: 10`,

newton:`Contoh:
x: 1 2 3
y: 2 3 5`,

trapesium:`Contoh:
fungsi: x^2
a: 0
b: 4
n: 4`,

runge:`Contoh:
fungsi: x+y
x0: 0
y0: 1
h: 0.1
iterasi: 5`
}

function ubahPlaceholder(){
    const metode = document.getElementById("metode").value

    document.querySelectorAll('.method-block').forEach(b => b.style.display = 'none')
    const block = document.getElementById('block-' + metode)
    if(block) block.style.display = 'block'

    const helpMap = {
        bisection: 'Isi fungsi, interval a dan b, serta digit ketelitian.',
        secant: 'Isi fungsi, nilai awal x₀ dan x₁, serta iterasi.',
        newton: 'Isi data x, data y, dan nilai x yang dicari.',
        trapesium: 'Isi fungsi f(x), batas a dan b, serta jumlah subinterval.',
        runge: 'Isi f(x,y), nilai awal x₀ dan y₀, langkah h, serta iterasi.'
    }
    const helper = document.getElementById("helper")

    if (metode === "gauss" || metode === "gaussSeidel") {
        helper.innerText = ""
    } else {
        helper.innerText = helpMap[metode] || "Gunakan format seperti contoh di atas"
    }
}
ubahPlaceholder()

function populateSizeSelectors(){
    const gaussSel = document.getElementById('gauss-size')
    const gsSel = document.getElementById('gs-size')

    if(!gaussSel || !gsSel) return

    gaussSel.innerHTML = ''
    gsSel.innerHTML = ''

    for(let i=2;i<=10;i++){
        let opt1 = document.createElement('option')
        opt1.value = i
        opt1.text = `${i} Variabel`
        gaussSel.appendChild(opt1)

        let opt2 = document.createElement('option')
        opt2.value = i
        opt2.text = `${i} Variabel`
        gsSel.appendChild(opt2)
    }

    gaussSel.value = 3
    gsSel.value = 3
}

let matrixCreated = false;

function createMatrixGrid(method){
    matrixCreated = true;
    const isGauss = method === 'gauss'
    const size = parseInt(document.getElementById(isGauss? 'gauss-size' : 'gs-size').value)
    const container = document.getElementById(isGauss? 'gauss-grid-container' : 'gs-grid-container')
    container.innerHTML = ''

    const table = document.createElement('table')
    table.className = 'matrix-grid'
    const caption = document.createElement('caption')
caption.innerText = `Sistem Persamaan Linear (${size} Variabel)`
    table.appendChild(caption)
    const info = document.createElement('div')

info.className = 'matrix-info'

info.innerHTML = `
Jumlah Variabel : <b>${size}</b><br>
Ukuran Matriks Augmented : <b>${size} × ${size}</b>
`

container.appendChild(info)

    for(let i=0;i<size;i++){
        const tr = document.createElement('tr')
        for(let j=0;j<=size;j++){
            const td = document.createElement('td')
            const inp = document.createElement('input')
            inp.type = 'text'
            inp.className = `${method}-cell`
            inp.dataset.row = i
            inp.dataset.col = j
            inp.placeholder = (j===size)? 'b' : `a${i+1}${j+1}`
            td.appendChild(inp)
            tr.appendChild(td)
            if(j===size-1){
                const sep = document.createElement('td')
                sep.innerText = '|'
                sep.className = 'sep'
                tr.appendChild(sep)
            }
        }
        table.appendChild(tr)
    }

    container.appendChild(table)
}

function clearAllInputs(){
matrixCreated = false;
    document.querySelectorAll("input").forEach(el=>{
        if(el.type !== "button" &&
           el.type !== "submit"){
            el.value = "";
        }
    });

    document.querySelectorAll("textarea")
        .forEach(el=>el.value="");

    document.getElementById("metode").value = "gauss";

    document.getElementById("gauss-size").value = "3";
    document.getElementById("gs-size").value = "3";

    document.getElementById("gauss-grid-container").innerHTML = "";
    document.getElementById("gs-grid-container").innerHTML = "";

    ubahPlaceholder();

    document.getElementById("output").innerHTML =
        "Hasil akan muncul disini...";

    document.getElementById("loading").style.display = "none";

    document.getElementById("history-list").innerHTML = `
        <div id="history-empty" class="history-empty">
            <i class="ti ti-history-off"></i>
            <p>Riwayat perhitungan belum tersedia</p>
            <small>Lakukan perhitungan terlebih dahulu</small>
        </div>
    `;

    cekHistoryKosong();
}

function copyResult() {
    const text = document.getElementById("output").innerText;

    if (!text || text.includes("Hasil akan muncul")) {
        alert("Tidak ada hasil untuk di-copy");
        return;
    }

    const now = new Date();
    const tanggal = now.toLocaleDateString("id-ID");
    const waktu = now.toLocaleTimeString("id-ID");

    // Penggunaan \n memastikan jarak spasi konsisten tanpa terpengaruh indentasi kode
    const footer = `\n──────────────────────────\nKALKULATOR METODE NUMERIK\n     Kelompok 1 R4U\n© ${now.getFullYear()} All Rights Reserved\nGenerated on ${tanggal} • ${waktu} WIB\n──────────────────────────\n`;

    const finalText = text + footer;

    // 1. Coba gunakan Clipboard API modern (Butuh HTTPS / Localhost)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(finalText)
            .then(() => alert("Hasil berhasil di-copy (format profesional)"))
            .catch(() => alert("Gagal copy menggunakan Clipboard API"));
    } 
    // 2. Fallback untuk koneksi HTTP biasa atau browser lama
    else {
        const textArea = document.createElement("textarea");
        textArea.value = finalText;
        
        // Sembunyikan elemen textarea dari layar agar UI tidak berkedip
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            alert("Hasil berhasil di-copy (format profesional)");
        } catch (err) {
            alert("Gagal copy, browser Anda tidak mendukung fitur ini.");
        }
        
        // Hapus elemen setelah selesai digunakan
        textArea.remove();
    }
}

function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let hasil = document.getElementById("output").innerText;

    if (!hasil || hasil.includes("Hasil akan muncul")) {
        alert("Tidak ada hasil untuk diexport");
        return;
    }

    // Filter Karakter: Mengubah simbol khusus ke bentuk ASCII standar & menghapus emoji
    hasil = hasil
        .replace(/ε/g, 'e')
        .replace(/≈/g, '~')
        .replace(/×/g, 'x')
        .replace(/≤/g, '<=')
        .replace(/≥/g, '>=')
        .replace(/♾️/g, 'Tak Hingga')
        .replace(/❌/g, '[!]')
        .replace(/⚠️/g, '[!]')
        .replace(/💡/g, '[*]')
        .replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '');

    const metode = document.getElementById("metode").options[document.getElementById("metode").selectedIndex].text;
    const now = new Date();
    const tanggal = now.toLocaleDateString("id-ID");
    const waktu = now.toLocaleTimeString("id-ID");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("KALKULATOR METODE NUMERIK", pageWidth / 2, y, { align: "center" });

    y += 8;
    doc.setFontSize(15);
    doc.text("Kelompok 1 R4U", pageWidth / 2, y, { align: "center" });

    y += 12;
    doc.line(20, y, pageWidth - 20, y);

    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Metode  : ${metode}`, 20, y);
    y += 7;
    doc.text(`Tanggal : ${tanggal}`, 20, y);
    y += 7;
    doc.text(`Waktu   : ${waktu}`, 20, y);
    
    y += 12;
    doc.setFont("helvetica", "bold");
    doc.text("HASIL PERHITUNGAN", 20, y);

    y += 7;
    doc.line(20, y, pageWidth - 20, y);

    y += 10;

    doc.setFont("courier", "normal");
    doc.setFontSize(8.5); 

    const lines = doc.splitTextToSize(hasil, pageWidth - 30);

    lines.forEach(line => {
        if (y > pageHeight - 20) {
            addFooter(doc);
            doc.addPage();
            y = 20; 
            doc.setFont("courier", "normal");
            doc.setFontSize(8.5); 
        }
        
        doc.text(line, 15, y);
        y += 4.5; 
    });

    addFooter(doc);

    doc.save(`hasil-${metode.toLowerCase().replace(/\s+/g, '-')}.pdf`);
}

/* =========================
   FOOTER PDF
   ========================= */
function addFooter(doc) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageNumber = doc.internal.getNumberOfPages();

    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");

    doc.text(
        "Generated by Kalkulator Numerik Kelompok 1 R4U",
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
    );

    doc.text(
        `Halaman ${pageNumber}`,
        pageWidth - 20,
        pageHeight - 10,
        { align: "right" }
    );
}

const STORAGE_KEY = "NUMERIK_CALC_HISTORY";
const MAX_HISTORY = 10;

function addHistory(text, metode, isNew = true, existingDate = null, existingId = null) {
    const container = document.getElementById("history-list");
    const emptyState = document.getElementById("history-empty");

    if(emptyState){
        emptyState.style.display = "none";
    }

    const item = document.createElement("div");
    item.className = "history-item";
    
    const id = existingId || Date.now();
    item.dataset.id = id;

    const info = document.createElement("div");
    info.className = "history-info";

    const methodEl = document.createElement("div");
    methodEl.className = "history-method";

    const methodNameMap = {
        gauss:"Eliminasi Gauss",
        gaussSeidel:"Gauss-Seidel",
        bisection:"Metode Bagi Dua",
        secant:"Metode Secant",
        newton:"Interpolasi Newton",
        trapesium:"Integrasi Trapesium",
        runge:"Runge Kutta Orde 3"
    };

    methodEl.textContent = methodNameMap[metode] || metode;

    const dateEl = document.createElement("div");
    dateEl.className = "history-date";

    const now = new Date();
    const dateStr = existingDate || (now.toLocaleDateString("id-ID") + " • " + now.toLocaleTimeString("id-ID"));
    dateEl.textContent = dateStr;

    const previewEl = document.createElement("div");
    previewEl.className = "history-preview";
    previewEl.textContent = text.split("\n")[0].substring(0,60);

    info.appendChild(methodEl);
    info.appendChild(dateEl);
    info.appendChild(previewEl);

    info.onclick = () => {
        document.getElementById("output").innerHTML = `<pre class="math-output">${text}</pre>`;
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "history-delete";
    deleteBtn.innerHTML = '<i class="ti ti-trash"></i>';

    deleteBtn.onclick = (e)=>{
        e.stopPropagation();
        item.remove();
        removeFromLocalStorage(id); 
        cekHistoryKosong();
    };

    item.appendChild(info);
    item.appendChild(deleteBtn);

    container.prepend(item);

    while(container.querySelectorAll(".history-item").length > MAX_HISTORY) {
        container.lastElementChild.remove();
    }

    if (isNew) {
        saveToLocalStorage(id, metode, text, dateStr);
    }
}

function saveToLocalStorage(id, metode, text, tanggal) {
    try {
        let history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        
        history.unshift({ id, metode, text, tanggal });
        
        if (history.length > MAX_HISTORY) {
            history = history.slice(0, MAX_HISTORY);
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
        console.warn("Gagal menyimpan ke memori lokal.");
    }
}

function removeFromLocalStorage(id) {
    try {
        let history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        history = history.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
        console.warn("Gagal menghapus dari memori lokal.");
    }
}

function loadHistoryOnLoad() {
    try {
        const history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        [...history].reverse().forEach(item => {
            addHistory(item.text, item.metode, false, item.tanggal, item.id);
        });
        cekHistoryKosong();
    } catch (e) {
        console.warn("Gagal memuat memori lokal.");
    }
}

document.addEventListener("DOMContentLoaded", function(){
    populateSizeSelectors();
    createMatrixGrid('gauss');
    ubahPlaceholder();
    loadHistoryOnLoad(); 
});

function cekHistoryKosong(){

    const historyItems =
        document.querySelectorAll(".history-item");

    const emptyState =
        document.getElementById("history-empty");

    if(historyItems.length === 0){
        emptyState.style.display = "block";
    }else{
        emptyState.style.display = "none";
    }
}

function toggleHistory() {
  const historyBox = document.getElementById("history-list");
  if (historyBox.style.display === "none" || historyBox.style.display === "") {
    historyBox.style.display = "block";
  } else {
    historyBox.style.display = "none";
  }
}

function buildMatrixDataFromGrid(method){
    const cells = Array.from(document.querySelectorAll(`.${method}-cell`));

    if(cells.length === 0){
        throw new Error("Matriks belum dibuat.");
    }

    const rows = Math.max(...cells.map(c => parseInt(c.dataset.row))) + 1;
    const cols = Math.max(...cells.map(c => parseInt(c.dataset.col))) + 1;

    let lines = [];

    for(let i = 0; i < rows; i++){
        let vals = [];

        for(let j = 0; j < cols; j++){
            const el = cells.find(
                c =>
                parseInt(c.dataset.row) === i &&
                parseInt(c.dataset.col) === j
            );

            if(!el || !el.value.trim()){
                throw new Error(
                    `Elemen matriks baris ${i+1}, kolom ${j+1} masih kosong nich`
                );
            }

            vals.push(el.value.trim());
        }

        lines.push(vals.join(' '));
    }

    return lines.join('\n');
}

function fillExample(type, exampleText, sizeId, cellClass) {
    const rows = exampleText.trim().split('\n');

    document.getElementById(sizeId).value = 3;

    createMatrixGrid(type);

    const cells = document.querySelectorAll(`.${cellClass}`);

    rows.forEach((row, r) => {
        const values = row.trim().split(/\s+/);

        values.forEach((value, c) => {
            const cell = [...cells].find(
                el =>
                    Number(el.dataset.row) === r &&
                    Number(el.dataset.col) === c
            );

            if (cell) cell.value = value;
        });
    });
}

function fillGaussExample() {
    fillExample(
        'gauss',
        placeholder.gauss,
        'gauss-size',
        'gauss-cell'
    );
}

function fillGaussSeidelExample() {
    const rawText = placeholder.gaussSeidel;
    
    const allLines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    const matrixLines = [];
    
    allLines.forEach(line => {
        const lowerLine = line.toLowerCase();
        
        if (lowerLine.includes('toleransi:')) {
            const elTol = document.getElementById('gs-tol');
            if (elTol) elTol.value = line.split(':')[1].trim();
        } 
        else if (lowerLine.includes('iterasi:')) {
            const elIter = document.getElementById('gs-iter');
            let iterVal = line.split(':')[1].trim();
            iterVal = iterVal.replace(/[^0-9]/g, ''); 
            if (elIter) elIter.value = iterVal;
        } 
        else if (lowerLine.includes('awal:')) {
            const initialVals = line.split(':')[1].split(',').map(v => v.trim());
            initialVals.forEach((v, i) => {
                const elX = document.getElementById(`gs-x${i+1}`);
                if (elX) elX.value = v;
            });
        } 
        else if (!line.includes('---')) {
            matrixLines.push(line);
        }
    });

    const matrixText = matrixLines.join('\n');

    fillExample(
        'gaussSeidel',
        matrixText,
        'gs-size',
        'gaussSeidel-cell'
    );
}


function closeGuide(){
    document.getElementById("tutorialGuide").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function(){
    populateSizeSelectors()
})

function tampilError(pesan){
    document.getElementById("output").innerHTML = `<pre class="math-output">❌ ERROR:\n${pesan}</pre>`;
}
function tampilLoading(status){
document.getElementById("loading").style.display =
status ? "block" : "none"
}

/* =============================
FUNGSI HITUNG (API FETCH KE SERVER)
=============================*/
async function hitung() {
    const metode = document.getElementById("metode").value;
    let data = '';

    try {
        switch(metode){
            case 'gauss':
                if(document.querySelectorAll('.gauss-cell').length === 0) throw 'Silakan buat variabel matriks terlebih dahulu';
                data = buildMatrixDataFromGrid('gauss');
                if(!data) throw 'Silakan isi matriks terlebih dahulu';
                break;

            case 'gaussSeidel': 
                if(document.querySelectorAll('.gaussSeidel-cell').length === 0) throw 'Silakan buat variabel matriks terlebih dahulu';
                let matrixData = buildMatrixDataFromGrid('gaussSeidel');
                if(!matrixData) throw 'Silakan isi seluruh elemen matriks terlebih dahulu';
                const tol = document.getElementById('gs-tol').value.trim();
                const iter = document.getElementById('gs-iter').value.trim();
                const size = parseInt(document.getElementById('gs-size').value);
                let initialSolutions = [];
                for(let i = 1; i <= size; i++){
                    let xVal = document.getElementById(`gs-x${i}`) ? document.getElementById(`gs-x${i}`).value.trim() : "";
                    initialSolutions.push(xVal === "" ? "0" : xVal); 
                }
                data = `${matrixData}\n---\ntoleransi: ${tol}\niterasi: ${iter}\nawal: ${initialSolutions.join(',')}`;
                break;

            case 'bisection': 
                const fBisect = document.getElementById('bisection-f').value.trim();
                const aBisect = document.getElementById('bisection-a').value.trim();
                const bBisect = document.getElementById('bisection-b').value.trim();
                const digits = document.getElementById('bisection-digits').value.trim();
                const tolBisect = document.getElementById('bisection-tol').value.trim(); 
                if(!fBisect || !aBisect || !bBisect) throw new Error('Lengkapi fungsi dan interval (a,b) untuk Bisection');
                data = `fungsi: ${fBisect}\na: ${aBisect}\nb: ${bBisect}\nketelitian: ${digits}\ntoleransi: ${tolBisect}`;
                break;

            case 'secant':
                const fSec = document.getElementById('secant-f').value.trim();
                const x0Sec = document.getElementById('secant-x0').value.trim();
                const x1Sec = document.getElementById('secant-x1').value.trim();
                const itSec = document.getElementById('secant-iter').value;
                if(!fSec||!x0Sec||!x1Sec) throw 'Lengkapi fungsi dan x0/x1 untuk Secant';
                data = `fungsi: ${fSec}\nx0: ${x0Sec}\nx1: ${x1Sec}\niterasi: ${itSec}`;
                break;

            case 'newton':
                const xs = document.getElementById('newton-x').value.trim();
                const ys = document.getElementById('newton-y').value.trim();
                const target = document.getElementById('newton-target').value.trim();
                const fasli = document.getElementById('newton-fasli') ? document.getElementById('newton-fasli').value.trim() : "";
                if(!xs || !ys || !target) throw 'Masukkan daftar X, Y, dan Target X untuk Interpolasi Newton';
                data = `x: ${xs}\ny: ${ys}\ntarget: ${target}\nfasli: ${fasli}`;
                break;

            case 'trapesium':
                const fTrap = document.getElementById('trapesium-f').value.trim();
                const aTrap = document.getElementById('trapesium-a').value.trim();
                const bTrap = document.getElementById('trapesium-b').value.trim();
                const nTrap = document.getElementById('trapesium-n').value;
                if(!fTrap||!aTrap||!bTrap) throw 'Lengkapi fungsi dan batas a/b untuk Trapesium';
                data = `fungsi: ${fTrap}\na: ${aTrap}\nb: ${bTrap}\nn: ${nTrap}`;
                break;

            case 'runge':
                const fRunge = document.getElementById('runge-f').value.trim();
                const x0Runge = document.getElementById('runge-x0').value.trim();
                const y0Runge = document.getElementById('runge-y0').value.trim();
                const hRunge = document.getElementById('runge-h').value.trim();
                const itRunge = document.getElementById('runge-iter').value;
                if(!fRunge||!x0Runge||!y0Runge||!hRunge) throw 'Lengkapi f, x0, y0, dan h untuk Runge Kutta';
                data = `fungsi: ${fRunge}\nx0: ${x0Runge}\ny0: ${y0Runge}\nh: ${hRunge}\niterasi: ${itRunge}`;
                break;

            default:
                throw 'Metode belum tersedia';
        }
    } catch(err) {
        tampilError(err);
        return;
    }

    tampilLoading(true);
    document.getElementById("output").innerHTML = "Menyambung ke Server...";

    try {
        await new Promise(resolve => setTimeout(resolve, 600));

const response = await fetch(
    `https://api-kalkulator-numerik.vercel.app/api/hitung/${metode}`,
    {
                method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputData: data })
        });
        
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error);
        }

        document.getElementById("output").innerHTML = result.hasilHtml;

        const hasilText = document.getElementById("output").innerText;
        if (hasilText && !hasilText.includes("ERROR")) {
            addHistory(hasilText, metode);
        }

        } catch(err) {
        let pesanError = err.message;
        if (pesanError === "Failed to fetch") {
            pesanError = "Gagal menyambung ke server, Pastikan server sedang aktif..";
        } 
        else if (pesanError.includes("NetworkError") || pesanError.includes("CORS")) {
            pesanError = "Terjadi masalah jaringan atau CORS saat menghubungi server.";
        }
        tampilError(pesanError || "Terjadi Maintenance");
    } finally {
        tampilLoading(false);
    }
}

setTimeout(()=>{
document.getElementById("splash").style.display="none"
},3000)

window.hitung = hitung

document.addEventListener("DOMContentLoaded", function(){
    populateSizeSelectors()
    createMatrixGrid('gauss')
    ubahPlaceholder()
})
function toggleTutorial(){
    const modal = document.getElementById("tutorialModal")
    modal.classList.toggle("active")
}

function scrollSlider(direction) {
    const slider = document.querySelector(".team-slider");
    const card = slider.querySelector(".team-card");

    if (!card) return;

    const gap = 20;
    const scrollAmount = card.offsetWidth + gap;

    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth"
    });
}