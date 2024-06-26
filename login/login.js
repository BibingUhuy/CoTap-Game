// Daftar pengguna dengan username, password, skor, dan pangkat
let users = JSON.parse(localStorage.getItem('users')) || [];

// Fungsi untuk login
function login(username, password) {
    // Cari pengguna berdasarkan username
    let user = users.find(user => user.username === username);
    if (user && user.password === password) {
        // Simpan username ke localStorage
        localStorage.setItem('username', username);
        // Redirect ke halaman game setelah login berhasil
        window.location.href = '../game/game.html';
    } else {
        alert('Username atau password salah!');
    }
}

// Event listener untuk submit form login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let usernameInput = document.getElementById('loginUsername').value.trim();
    let passwordInput = document.getElementById('loginPassword').value.trim();
    if (usernameInput !== '' && passwordInput !== '') {
        login(usernameInput, passwordInput);
    } else {
        alert('Masukkan username dan password terlebih dahulu!');
    }
});