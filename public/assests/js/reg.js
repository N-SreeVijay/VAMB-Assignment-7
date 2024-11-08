document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('.submit-btn');
    const emailInput = document.querySelector('.email');
    const passwordInput = document.querySelector('.password');
    const nameInput = document.querySelector('.name');
    const numInput = document.querySelector('.num');
    const dobInput = document.querySelector('.dob');
    const alertBox = document.querySelector('.alert');

    submitBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const name = nameInput.value.trim();
        const num = numInput.value.trim();
        const dob = dobInput.value;

        let errorMessage = '';

        if (!validatename(name)) {
            errorMessage += 'Please enter a valid name (letters only).<br>';
        }

        if (!validateEmail(email)) {
            errorMessage += 'Please enter a valid Gmail address.<br>';
        }

        if (!validateNum(num)) {
            errorMessage += 'Please enter a valid 10-digit phone number.<br>';
        }

        if (password.length <= 7) {
            errorMessage += 'Password must be more than 8 characters long.<br>';
        }

        if (dob) {
            const today = new Date();
            const birthDate = new Date(dob);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();

            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 18) {
                errorMessage += 'You must be at least 18 years old.<br>';
            }
        } else {
            errorMessage += 'Please enter your date of birth.<br>';
        }

        // Clear previous messages
        alertBox.innerHTML = '';

        if (errorMessage === '') {
            // Prepare user data
            const userData = { name, mobile: num, email, password, dob };

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    alertBox.style.color = 'green'; 
                    alertBox.innerHTML = 'Successfully registered! Redirecting to the login page...';
                    setTimeout(() => {
                        window.location.href = './login';
                    }, 2000); 
                } else {
                    const message = await response.text();
                    alertBox.style.color = 'red'; 
                    alertBox.innerHTML = message;
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alertBox.style.color = 'black'; 
                alertBox.innerHTML = 'An error occurred during registration. Please try again.';
            }
        } else {
            alertBox.style.color = 'black'; 
            alertBox.innerHTML = errorMessage; 
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@gmail\.com$/;
        return re.test(email);
    }

    function validatename(name) {
        const re = /^[A-Za-z]+$/;
        return re.test(name);
    }

    function validateNum(num) {
        const re = /^[0-9]{10}$/;
        return re.test(num);
    }
});
