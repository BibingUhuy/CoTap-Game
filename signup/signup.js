// Daftar pengguna dengan username, password, skor, dan pangkat
let users = JSON.parse(localStorage.getItem('users')) || [];

// Fungsi untuk signup
function signup(username, password) {
    // Cek apakah username sudah ada dalam daftar pengguna
    let existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert('Username sudah terdaftar. Silakan login dengan username tersebut.');
    } else {
        // Tambahkan pengguna baru ke daftar users dengan skor awal 0 dan pangkat Bronze
        users.push({ username: username, password: password, score: 0, rank: 'Bronze' });
        // Simpan daftar users ke localStorage
        localStorage.setItem('users', JSON.stringify(users));
        // Beri pesan sukses
        alert('Pendaftaran berhasil! Silakan login dengan username dan password baru.');
        // Redirect ke halaman login setelah signup berhasil
        window.location.href = '../login/login.html';
    }
}

// Event listener untuk submit form signup
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let usernameInput = document.getElementById('signupUsername').value.trim();
    let passwordInput = document.getElementById('signupPassword').value.trim();
    if (usernameInput !== '' && passwordInput !== '') {
        signup(usernameInput, passwordInput);
    } else {
        alert('Masukkan username dan password terlebih dahulu!');
    }
});