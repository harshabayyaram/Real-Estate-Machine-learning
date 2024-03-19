// Function to handle registration
function register() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Get the HTML element to display messages
    var messageContainer = document.getElementById('registrationMessage');

    // Call the Flask route for registration
    fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}&password=${password}`,
    })
    .then(response => response.json())
    .then(data => {
        // Clear previous messages
        messageContainer.innerHTML = '';

        // Check the response status
        if (data.message) {
            // Registration successful
            var successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.innerHTML = data.message;
            messageContainer.appendChild(successMessage);

            console.log('Redirecting to login.html...');

            // Optionally, redirect to the home page or any other page
            window.location.href = './login.html'; // Update with your actual home page

        } else if (data.error) {
            // Registration failed
            var errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger';
            errorMessage.innerHTML = 'Registration failed. Error: ' + data.error;
            messageContainer.appendChild(errorMessage);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle other errors if needed
    });
}
