document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.querySelector('.name').value.trim();
        const email = document.querySelector('.email').value.trim();
        const number = document.querySelector('.num').value.trim();
        const members = document.querySelector('.mem').value.trim();
        const date = document.querySelector('.date').value;

        const nameRegex = /^[A-Za-z\s'-]{2,50}$/; 
        if (!name) {
            alert("Error: Name is required.");
            return;
        } else if (!nameRegex.test(name)) {
            alert("Error: Name must be 2-50 characters long and can only contain letters, spaces, hyphens, or apostrophes.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            alert("Error: Email is required.");
            return;
        } else if (!emailRegex.test(email)) {
            alert("Error: Please enter a valid email address.");
            return;
        }

        const numberRegex = /^\d{10}$/;
        if (!number) {
            alert("Error: Number is required.");
            return;
        } else if (!numberRegex.test(number)) {
            alert("Error: Number must be a valid 10-digit phone number.");
            return;
        }

        if (!members || isNaN(members) || members <= 0) {
            alert("Error: Please enter a valid number of members (greater than 0).");
            return;
        }

        const selectedDate = new Date(date);
        const today = new Date();
        if (!date) {
            alert("Error: Date is required.");
            return;
        } else if (selectedDate < today) {
            alert("Error: Please select a future date.");
            return;
        }

        const bookingId = `BID-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        alert(`Booking successful!\nBooking ID: ${bookingId}\nName: ${name}\nEmail: ${email}\nNumber: ${number}\nMembers: ${members}\nDate: ${date}`);

        sendBookingId(number, bookingId);
        form.reset();
    });

    function sendBookingId(number, bookingId) {
        fetch('https://your-backend-url.com/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number: number, message: `Your booking ID is: ${bookingId}` })
        })
        .then(response => response.json())
        .then(data => {
            console.log('SMS sent successfully:', data);
        })
        .catch(error => {
            console.error('Error sending SMS:', error);
        });
    }
});
const headerContent = `
<div class="line">
  <header>
          <img class="logo" src="./assests/images/1.png">
          <nav class="navbar">
              <ul>
                  <li><a class="Home" href="/index.html">HOME</a></li>
                  <li><a class="about" href="/about.html">About</a></li>
                  <li><a class="vis" href="/visit.html">Visit</a></li>
                  <li><a class="job" href="/job.html">Job Application</a></li>
                  <li><a class="con" href="/cont.html">Contact</a></li>
              </ul>
          </nav>
          <nav class="login">
              <li><a class="login-btn" href="/login.html">LOGIN</a></li>
          </nav>      
      </header>  
      </div>
`;

const footerContent =`<footer>
      <div class="footer-content">
          <div class="quick-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a class="Home" href="/index.html">HOME</a></li>
                <li><a class="about" href="../about/about.html">About</a></li>
                <li><a class="vis" href="../visit/visit.html">Visit</a></li>
                <li><a class="job" href="../job/job.html">Application</a></li>
                <li><a class="con" href="./index.html">Contact</a></li>
              </ul>
          </div>
          <div class="footer-logo">
              <img src="./assests/images/1.png" alt="Vamb Farm Sanctuary Footer Logo">
          </div>
          <div class="social-icons">
              <h4>Follow Us</h4>
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
          </div>
      </div>
      <div class="footer-bottom">
          <p>&copy; 2024 Vamb Farm Sanctuary. All rights reserved.</p>
      </div>
  </footer>`

document.getElementById('header').innerHTML = headerContent;
document.getElementById('footer').innerHTML = footerContent;