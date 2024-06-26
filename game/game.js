// Daftar pengguna dengan username, password, skor, dan pangkat
let users = JSON.parse(localStorage.getItem('users')) || [];

// Definisi pangkat berdasarkan rentang skor
const ranks = [
    { name: 'Bronze', minScore: 0, maxScore: 10000 },
    { name: 'Silver', minScore: 10000, maxScore: 100000 },
    { name: 'Gold', minScore: 100000, maxScore: 1000000 },
    { name: 'Platinum', minScore: 1000000, maxScore: 50000000 },
    { name: 'Diamond', minScore: 50000000, maxScore: 250000000 },
    { name: 'Epic', minScore: 250000000, maxScore: 700000000 },
    { name: 'Legend', minScore: 700000000, maxScore: 1500000000 },
    { name: 'Master', minScore: 1500000000, maxScore: 3000000000 },
    { name: 'Mythical', minScore: 3000000000, maxScore: 50000000000 },
    { name: 'Mythical Hero', minScore: 50000000000, maxScore: 350000000000 },
    { name: 'Super Hero', minScore: 350000000000, maxScore: 1000000000000 }
];

// Handler untuk klik tombol koin setelah login
function coinButtonClickHandler() {
    let username = localStorage.getItem('username');
    let user = users.find(user => user.username === username);
    if (user) {
        // Ambil dan tambahkan skor dari user yang sudah login
        let score = user.score || 0;
        score++;
        // Update skor di DOM dan simpan ke localStorage
        document.getElementById('score').innerText = 'Skor: ' + score;
        user.score = score;
        localStorage.setItem('users', JSON.stringify(users));

        // Periksa dan update pangkat
        updateRank(user);
    }
}

// Fungsi untuk memperbarui pangkat pengguna berdasarkan skor
function updateRank(user) {
    // Temukan pangkat yang sesuai berdasarkan skor
    for (let i = ranks.length - 1; i >= 0; i--) {
        if (user.score >= ranks[i].minScore && user.score < ranks[i].maxScore) {
            // Jika pangkat telah berubah, beri pesan kepada pengguna
            if (user.rank !== ranks[i].name) {
                alert(`Selamat! Anda telah mencapai pangkat ${ranks[i].name}.`);
                user.rank = ranks[i].name;
                // Update tampilan pangkat di atas skor
                document.getElementById('rank').innerText = 'Pangkat: ' + ranks[i].name;
            }
            break;
        }
    }
    // Simpan perubahan pangkat ke localStorage
    localStorage.setItem('users', JSON.stringify(users));
}

// Fungsi untuk memulai permainan atau menekan tombol "Bermain"
function startGame() {
    // Cek apakah sudah login sebelumnya
    let username = localStorage.getItem('username');
    if (username) {
        // Tampilkan game container
        document.getElementById('gameContainer').style.display = 'block';

        // Muat skor terakhir dari pengguna jika ada
        let user = users.find(user => user.username === username);
        let score = user.score || 0;
        document.getElementById('score').innerText = 'Skor: ' + score;

        // Tambahkan event listener untuk tombol koin setelah login
        document.getElementById('coinButton').addEventListener('click', coinButtonClickHandler);

        // Tambahkan event listener untuk tombol logout
        document.getElementById('logoutButton').addEventListener('click', function() {
            logout();
        });

        // Periksa dan update pangkat pengguna saat halaman dimuat
        updateRank(user);
        
            // Mulai musik latar
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicPreference = localStorage.getItem('musicPreference');
    if (musicPreference === 'on') {
        backgroundMusic.play();
    }
    } else {
        // Jika tidak ada username yang tersimpan, redirect ke halaman login
        window.location.href = '../login/login.html';
    }
}

// Fungsi untuk logout
function logout() {
    // Hapus username dari localStorage
    localStorage.removeItem('username');
    // Redirect ke halaman login setelah logout
    window.location.href = '../login/login.html';
}

// Cek apakah sudah login sebelumnya saat halaman dimuat
let username = localStorage.getItem('username');
if (username) {
    startGame();
}