document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form element
    const form = event.target;

    // Create a FormData object from the form element
    const formData = new FormData(form);

    // Create a query string from the formData
    const queryParams = new URLSearchParams();
    formData.forEach((value, key) => {
        if (key !== 'image') { // Exclude file input from query parameters
            queryParams.append(key, value);
        }
    });

    // Fetch the PHP script with the form data as query parameters
    fetch('./upload.php?' + queryParams.toString())
        .then(response => response.text())
        .then(result => {
            // Display the server response
            document.getElementById('status').innerHTML = result;
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            document.getElementById('status').innerHTML = 'Error uploading file. Please try again.';
        });
});
