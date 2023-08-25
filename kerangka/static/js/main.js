document.addEventListener("DOMContentLoaded", () => {
	const chatBox = document.getElementById("chat-box");
	const inputBox = document.getElementById("input-box");
	// Get the reference to the voice button element
	const voiceButton = document.getElementById("voice-button");
	// Get the reference to the loading icon element
	const loadingIcon = document.getElementById("loading-icon");
	// Get the reference to the mic icon element
	const micIcon = document.getElementById("mic-icon");

	// Fungsi untuk menampilkan pesan ke chat box
	function displayMessage(message, sender) {
		const messageDiv = document.createElement("div");
		messageDiv.classList.add("message");
		// Membuat textarea untuk menampilkan pesan
		const messageBox = document.createElement("textarea");
		messageBox.value = message;
		messageBox.readOnly = true; // Membuat textarea tidak dapat diedit
		// Mengatur baris dan kolom textarea sesuai dengan panjang pesan
		messageBox.rows = Math.ceil(message.length / 60); // Anggap satu baris bisa menampung maksimal 40 karakter
		messageBox.cols = Math.min(message.length, 60); // Jika pesan lebih pendek dari 40 karakter, maka kolom disesuaikan
		// Menambahkan atribut wrap="hard" pada textarea
		messageBox.setAttribute("wrap", "hard");
		messageDiv.appendChild(messageBox);
		if (sender === "user") {
			// Jika pengirim adalah user, maka pesan diletakkan di sebelah kanan
			messageDiv.style.textAlign = "right";
			// Menambahkan kelas user-text pada textarea user
			messageBox.classList.add("user-text");
		} else {
			// Jika pengirim adalah bot, maka pesan diletakkan di sebelah kiri
			messageDiv.style.textAlign = "left";
			// Menambahkan kelas bot-text pada textarea bot
			messageBox.classList.add("bot-text");
		}
		chatBox.appendChild(messageDiv);
		chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll ke bawah
	}

	function typeMessage(message, sender) {
		let i = 0;
		const typingSpeed = 100; // Kecepatan mengetik dalam milidetik
		const messageDiv = document.createElement("div");
		messageDiv.classList.add("message");
		// Membuat textarea untuk menampilkan pesan
		const messageBox = document.createElement("textarea");
		messageBox.readOnly = true; // Membuat textarea tidak dapat diedit
		// Mengatur baris dan kolom textarea sesuai dengan panjang pesan
		messageBox.rows = Math.ceil(message.length / 60); // Anggap satu baris bisa menampung maksimal 40 karakter
		messageBox.cols = Math.min(message.length, 60); // Jika pesan lebih pendek dari 40 karakter, maka kolom disesuaikan
		// Menambahkan atribut wrap="hard" pada textarea
		messageBox.setAttribute("wrap", "hard");
		messageDiv.appendChild(messageBox);
		if (sender === "user") {
			// Jika pengirim adalah user, maka pesan diletakkan di sebelah kanan
			messageDiv.style.textAlign = "right";
			// Menambahkan kelas user-text pada textarea user
			messageBox.classList.add("user-text");
		} else {
			// Jika pengirim adalah bot, maka pesan diletakkan di sebelah kiri
			messageDiv.style.textAlign = "left";
			// Menambahkan kelas bot-text pada textarea bot
			messageBox.classList.add("bot-text");
		}
		chatBox.appendChild(messageDiv);
		chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll ke bawah

		function typeChar() {
			if (i < message.length) {
				messageBox.value += message.charAt(i);
				i++;
				setTimeout(typeChar, typingSpeed);
			}
		}

		typeChar();
	}

	typeMessage(
		"Selamat datang di voice command Experience Center!, Apa yang bisa saya bantu?",
		"bot"
	);

	// Mengirim pesan saat tombol "Enter" ditekan
	inputBox.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			const message = inputBox.value;
			inputBox.value = "";
			displayMessage(message, "user");

			setTimeout(function () {
				displayMessage("Saya adalah bot. Saya menerima pesan Anda.", "bot");
			}, 1000);
		}
	});

	// Create a variable to store the reference to the SpeechRecognition object
	const recognition = new webkitSpeechRecognition(); // Use a vendor prefix if needed
	// Set some properties of the recognition object
	recognition.lang = "id-ID"; // Set the language to English
	recognition.interimResults = false; // Disable interim results
	recognition.continuous = false; // Stop listening after one utterance

	// Add an event listener to the voice button that will start the recognition process when clicked
	voiceButton.addEventListener("click", () => {
		recognition.start();
	});

	// Add an event listener to the recognition object that will handle the result event
	recognition.addEventListener("result", (event) => {
		// Get the transcript of the speech from the event object
		const transcript = event.results[0][0].transcript;
		// Display the transcript in the chat box as a user message
		displayMessage(transcript, "user");
		// Add a setTimeout function that will display a bot message after a delay
		setTimeout(function () {
			displayMessage("Saya adalah bot. Saya menerima pesan Anda.", "bot");
		}, 1000);
	});

	// Optionally, add event listeners for other events, such as error, end, or nomatch, and handle them accordingly

	// Add a function to show the loading icon when the system is listening
	function showLoadingIcon() {
		loadingIcon.style.display = "inline-block";
		loadingIcon.classList.add("loading");
		// Change the background color of the button to indicate loading status
		voiceButton.style.backgroundColor = "#00AAFF";
	}

	// Add a function to hide the loading icon when the system is done listening
	function hideLoadingIcon() {
		loadingIcon.style.display = "none";
		loadingIcon.classList.remove("loading");
		// Restore the background color of the button to normal
		voiceButton.style.backgroundColor = "#0077FF";
	}

	// Add a function to show the mic icon when the system is not listening
	function showMicIcon() {
		micIcon.style.display = "inline-block";
	}

	// Add a function to hide the mic icon when the system is listening
	function hideMicIcon() {
		micIcon.style.display = "none";
	}

	// Add an event listener to the recognition object that will call the showLoadingIcon and hideMicIcon functions when the system starts listening
	recognition.addEventListener("start", () => {
		showLoadingIcon();
		hideMicIcon();
	});

	// Add an event listener to the recognition object that will call the hideLoadingIcon and showMicIcon functions when the system stops listening
	recognition.addEventListener("end", () => {
		hideLoadingIcon();
		showMicIcon();
	});
});
var timeout;

function redirectToHomePage() {
	window.location.href = "./public/html/dashboard.html";
}

function resetTimer() {
	clearTimeout(timeout);
	timeout = setTimeout(redirectToHomePage, 120000); // Mengatur waktu untuk kembali ke halaman utama dalam milidetik (5 detik dalam contoh ini)
}

// Panggil fungsi untuk memulai timer saat halaman dimuat
resetTimer();

// Atur event listener untuk menghentikan timer saat ada respon
document.addEventListener("mousemove", resetTimer);
document.addEventListener("keydown", resetTimer);
// Anda dapat menambahkan event listener lain sesuai dengan interaksi yang ingin Anda amati, seperti 'click', 'scroll', dll.