document.addEventListener('DOMContentLoaded', function() {
    fetch('/my_view/')  // Ubah "/get-data/" sesuai dengan URL endpoint di server Django
        .then(response => response.json())
        .then(data => {
            // Data has been received from Django
            // Do something with the data, e.g., display it in the HTML element
            const dataContainer = document.getElementById('data-container');
            dataContainer.innerHTML = `Name: ${data}`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});