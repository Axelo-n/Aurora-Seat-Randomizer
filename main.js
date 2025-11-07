// Nama-nama siswa (sesuaikan dengan nama asli)
const studentNames = {
    1: "Aryaka",
    2: "Beben",
    3: "Callista",
    4: "Xyla",
    5: "Claudia",
    6: "Vito",
    7: "Dea",
    8: "Diaz",
    9: "Evan",
    10: "Henry",
    11: "Vio",
    12: "Ngurah",
    13: "Ivan",
    14: "Yuri",
    15: "Jeri",
    16: "Josh",
    17: "Leon",
    18: "Abel",
    19: "Mario",
    20: "Kirei",
    21: "Kevin",
    22: "Rey",
    23: "Nicko",
    24: "Niki",
    25: "Rachma",
    26: "Otniel",
    27: "Shane",
    28: "Shinta",
    29: "Stephen",
    30: "Steven",
    31: "Thomas",
    32: "Vincent F",
    33: "Vincent M",
    34: "Wilson",
    35: "Yonami"
};

function randomizeSeats() {
    // Tentukan roles dulu
    const kurkul = 27;
    
    // IT rolling berdasarkan minggu (week 1 = absen 34, week 2 = absen 4, week 3 = absen 22, repeat)
    const itOptions = [34, 4, 22];
    const currentWeek = getWeekNumber(new Date());
    const it = itOptions[(currentWeek - 1) % 3];
    
    // Tatib ada 2 kursi yang tukar-tukeran
    // Minggu ganjil: tatib1=25, tatib2=32
    // Minggu genap: tatib1=32, tatib2=25
    const tatib1 = (currentWeek % 2 === 1) ? 25 : 32;
    const tatib2 = (currentWeek % 2 === 1) ? 32 : 25;
    
    // Logistik random dari pilihan yang tersedia
    const logistikOptions = [30, 15, 33, 31];
    const logistik = logistikOptions[(currentWeek - 1) % 4];
    // const logistik = logistikOptions[Math.floor(Math.random() * logistikOptions.length)];
    
    // Buat array 1-35 kecuali yang sudah dipakai untuk roles
    const usedNumbers = [kurkul, it, tatib1, tatib2, logistik];
    let availableNumbers = Array.from({length: 35}, (_, i) => i + 1)
        .filter(num => !usedNumbers.includes(num));
    
    // Shuffle available numbers
    for (let i = availableNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableNumbers[i], availableNumbers[j]] = [availableNumbers[j], availableNumbers[i]];
    }
    
    // Ambil semua kursi
    const seats = document.querySelectorAll('.seat[data-seat]');
    
    // Track tatib assignment
    let tatibCount = 0;
    
    // Assign angka ke setiap kursi dengan animasi
    seats.forEach((seat, index) => {
        setTimeout(() => {
            let number;
            
            // Assign berdasarkan role
            if (seat.dataset.role === 'kurkul') {
                number = kurkul;
            } else if (seat.dataset.role === 'it') {
                number = it;
            } else if (seat.dataset.role === 'tatib') {
                // Assign tatib1 untuk kursi tatib pertama, tatib2 untuk kursi tatib kedua
                number = tatibCount === 0 ? tatib1 : tatib2;
                tatibCount++;
            } else if (seat.dataset.role === 'logistik') {
                number = logistik;
            } else {
                // Ambil dari available numbers untuk kursi biasa
                number = availableNumbers.shift();
            }
            
            seat.textContent = number.toString().padStart(2, '0');
            
            // Update special roles names jika ada
            if (seat.dataset.role === 'kurkul') {
                document.getElementById('kurkulName').textContent = studentNames[number];
            } else if (seat.dataset.role === 'it') {
                document.getElementById('itName').textContent = studentNames[number];
            } else if (seat.dataset.role === 'tatib') {
                // Update nama untuk tatib1 dan tatib2
                if (tatibCount === 1) {
                    document.getElementById('tatib1Name').textContent = studentNames[number];
                } else {
                    document.getElementById('tatib2Name').textContent = studentNames[number];
                }
            } else if (seat.dataset.role === 'logistik') {
                document.getElementById('logistikName').textContent = studentNames[number];
            }
            
            // Animasi flash
            seat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                seat.style.transform = 'scale(1)';
            }, 100);
        }, index * 30);
    });
}

// Fungsi helper untuk dapetin nomor minggu dalam tahun
function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
// function randomizeSeats() {
//     // Ambil semua kursi yang bisa di-randomize
//     const seats = document.querySelectorAll('.seat[data-seat]');
    
//     // Buat array dari 1-35
//     let numbers = Array.from({length: 35}, (_, i) => i + 1);
    
//     // Shuffle array menggunakan Fisher-Yates algorithm
//     for (let i = numbers.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
//     }
    
//     // Assign angka ke setiap kursi dengan animasi
//     seats.forEach((seat, index) => {
//         setTimeout(() => {
//             const number = numbers[index];
//             seat.textContent = number.toString().padStart(2, '0');
            
//             // Update special roles jika ada
//             if (seat.dataset.role === 'kurkul') {
//                 document.getElementById('kurkulName').textContent = studentNames[number];
//             } else if (seat.dataset.role === 'it') {
//                 document.getElementById('itName').textContent = studentNames[number];
//             } else if (seat.dataset.role === 'logistik') {
//                 document.getElementById('logistikName').textContent = studentNames[number];
//             }
            
//             // Animasi flash
//             seat.style.transform = 'scale(1.1)';
//             setTimeout(() => {
//                 seat.style.transform = 'scale(1)';
//             }, 100);
//         }, index * 30);
//     });
// }

// Load initial special roles dari layout default
window.addEventListener('load', () => {
    const kurkulSeat = document.querySelector('[data-role="kurkul"]');
    const itSeat = document.querySelector('[data-role="it"]');
    const logistikSeat = document.querySelector('[data-role="logistik"]');
    
    if (kurkulSeat) {
        document.getElementById('kurkulName').textContent = studentNames[parseInt(kurkulSeat.textContent)];
    }
    if (itSeat) {
        document.getElementById('itName').textContent = studentNames[parseInt(itSeat.textContent)];
    }
    if (logistikSeat) {
        document.getElementById('logistikName').textContent = studentNames[parseInt(logistikSeat.textContent)];
    }
});

async function copyScreenshot() {
    try {
        // Ambil screenshot dari seluruh halaman menggunakan html2canvas
        const canvas = await html2canvas(document.body, {
            allowTaint: true,
            useCORS: true,
            scrollY: -window.scrollY,
            scrollX: -window.scrollX,
            windowWidth: document.documentElement.scrollWidth,
            windowHeight: document.documentElement.scrollHeight
        });
        
        // Convert canvas ke blob
        canvas.toBlob(async (blob) => {
            try {
                // Copy ke clipboard menggunakan Clipboard API
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ]);
                
                alert('Screenshot berhasil dicopy ke clipboard! 📋');
            } catch (err) {
                console.error('Gagal copy ke clipboard:', err);
                alert('Gagal copy screenshot ke clipboard');
            }
        }, 'image/png');
        
    } catch (error) {
        console.error('Error saat screenshot:', error);
        alert('Gagal mengambil screenshot');
    }
}
