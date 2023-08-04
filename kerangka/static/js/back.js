var timeout;

        function redirectToHomePage() {
            window.location.href = 'index.html';
        }

        function resetTimer() {
            clearTimeout(timeout);
            timeout = setTimeout(redirectToHomePage, 120000); // Mengatur waktu untuk kembali ke halaman utama dalam milidetik (5 detik dalam contoh ini)
        }

        // Panggil fungsi untuk memulai timer saat halaman dimuat
        resetTimer();

        // Atur event listener untuk menghentikan timer saat ada respon
        document.addEventListener('mousemove', resetTimer);
        document.addEventListener('keydown', resetTimer);
        // Anda dapat menambahkan event listener lain sesuai dengan interaksi yang ingin Anda amati, seperti 'click', 'scroll', dll.