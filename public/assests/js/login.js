document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('.submit-btn');
    const emailInput = document.querySelector('.email');
    const passwordInput = document.querySelector('.password');

    submitBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (validateEmail(email) && password.length > 0) {
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    console.log('Login successful');
                    window.location.href = './userindex'; 
                } else {
                    const message = await response.text();
                    alert(message);
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        } else {
            alert('Please enter a valid email and password.');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Adjusted to allow any domain
        return re.test(email);
    }
});
