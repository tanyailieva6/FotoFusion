document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form element
    const form = event.target;

    // Create a FormData object from the form element
    const formData = new FormData(form);

    try {
        // Send the form data to the server using the fetch API
        const response = await fetch('upload.php', {
            method: 'POST',
            body: formData
        });

        // Parse the response from the server
        const result = await response.text();

        // Display the server response
        document.getElementById('status').innerHTML = result;

    } catch (error) {
        // Handle any errors that occur during the fetch operation
        console.error('Error uploading file:', error);
        document.getElementById('status').innerHTML = 'Error uploading file. Please try again.';
    }
});
