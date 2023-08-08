document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const inputBox = document.getElementById('input-box');

  // Fungsi untuk menampilkan pesan ke chat box
  function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    // Membuat textarea untuk menampilkan pesan
    const messageBox = document.createElement('textarea');
    messageBox.value = message;
    messageBox.readOnly = true; // Membuat textarea tidak dapat diedit
    // Mengatur baris dan kolom textarea sesuai dengan panjang pesan
    messageBox.rows = Math.ceil(message.length / 40); // Anggap satu baris bisa menampung maksimal 40 karakter
    messageBox.cols = Math.min(message.length, 40); // Jika pesan lebih pendek dari 40 karakter, maka kolom disesuaikan
    // Menambahkan atribut wrap="hard" pada textarea
    messageBox.setAttribute('wrap', 'hard');
    messageDiv.appendChild(messageBox);
    if (sender === 'user') {
      // Jika pengirim adalah user, maka pesan diletakkan di sebelah kanan
      messageDiv.style.textAlign = 'right';
      // Menambahkan kelas user-text pada textarea user
      messageBox.classList.add('user-text');
    } else {
      // Jika pengirim adalah bot, maka pesan diletakkan di sebelah kiri
      messageDiv.style.textAlign = 'left';
      // Menambahkan kelas bot-text pada textarea bot
      messageBox.classList.add('bot-text');
    }
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll ke bawah
  }

  // Mengirim pesan saat tombol "Enter" ditekan
inputBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const message = inputBox.value;
      inputBox.value = '';
      displayMessage(message, 'user');
      //kirim permintaan POST
      $.ajax({
        type: 'POST',
        url: '/postdata/', // Update with the correct URL endpoint in your Django app
        data: { message: message },
        success: function(data) {
          console.log('Response from server:', data);
          displayMessage(data.response, 'bot');
        },
        error: function(error) {
          console.error('Error:', error);
        }
      });
      // Kirim permintaan AJAX GET
      // $.ajax({
      //   type: 'GET',
      //   url: '/datagpt/',  // Ubah URL sesuai dengan URL endpoint di server Django
      //   success: function(data) {
      //     console.log('Data from server:', data);

      //     // Menampilkan data dalam elemen HTML
      //     displayMessage(data.response, 'bot'); // Specify sender as 'bot'
      //   },
      //   error: function(error) {
      //     console.error('Error:', error);
      //   }
      // });

    }
  });
});