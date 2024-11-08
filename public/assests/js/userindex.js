// Handle form submission
document.getElementById('donation-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/userSubscribe', { // Updated to use userSubscribe route
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response-message').textContent = data.message;
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        document.getElementById('response-message').textContent = 'An error occurred. Please try again.';
    });
});
