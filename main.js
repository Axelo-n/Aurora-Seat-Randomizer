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
    const kurkul = 17;
    
    // IT rolling berdasarkan minggu (week 1 = absen 34, week 2 = absen 4, week 3 = absen 22, repeat)
    const itOptions = [15, 4, 22];  // Wilson, Rey, Sila
    const currentWeek = getWeekNumber(new Date());
    const it = itOptions[(currentWeek - 1) % 3];
    
    // Tatib adalah student #2 (Beben), posisi random di row 3
    const tatib = 2;
    
    // Buat array 1-35 kecuali yang sudah dipakai untuk roles
    const usedNumbers = [kurkul, it, tatib];
    let availableNumbers = Array.from({length: 35}, (_, i) => i + 1)
        .filter(num => !usedNumbers.includes(num));
    
    // Shuffle available numbers
    for (let i = availableNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableNumbers[i], availableNumbers[j]] = [availableNumbers[j], availableNumbers[i]];
    }
    
    // Ambil semua kursi
    const seats = document.querySelectorAll('.seat[data-seat]');
    
    // Find kurkul dan it seats (tetap fixed)
    const kurkulSeat = Array.from(seats).find(seat => {
        const seatNum = parseInt(seat.dataset.seat);
        return seatNum === 29; // data-seat 29
    });
    const itSeat = Array.from(seats).find(seat => {
        const seatNum = parseInt(seat.dataset.seat);
        return seatNum === 28; // data-seat 28
    });
    
    // Assign role ke kurkul dan it seats
    if (kurkulSeat) {
        kurkulSeat.dataset.role = 'kurkul';
        kurkulSeat.classList.add('sie-kurkul');
    }
    if (itSeat) {
        itSeat.dataset.role = 'it';
        itSeat.classList.add('sie-it');
    }
    
    // Randomize tatib position di row 3 (data-seat 8-14)
    const row3Seats = Array.from(seats).filter(seat => {
        const seatNum = parseInt(seat.dataset.seat);
        return seatNum >= 8 && seatNum <= 14;
    });
    const randomTatibIndex = Math.floor(Math.random() * row3Seats.length);
    const tatibSeat = row3Seats[randomTatibIndex];
    
    // Remove tatib class dari semua row3 seats, tapi keep kurkul dan it
    row3Seats.forEach(seat => {
        seat.classList.remove('sie-tatib');
        seat.dataset.role = '';
    });
    
    // Assign tatib role ke random seat di row 3
    tatibSeat.dataset.role = 'tatib';
    tatibSeat.classList.add('sie-tatib');
    
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
                number = tatib;
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
                document.getElementById('tatibName').textContent = studentNames[number];
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

// Load initial special roles dari layout default
window.addEventListener('load', () => {
    const kurkulSeat = document.querySelector('[data-role="kurkul"]');
    const itSeat = document.querySelector('[data-role="it"]');
    
    if (kurkulSeat) {
        document.getElementById('kurkulName').textContent = studentNames[parseInt(kurkulSeat.textContent)];
    }
    if (itSeat) {
        document.getElementById('itName').textContent = studentNames[parseInt(itSeat.textContent)];
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
