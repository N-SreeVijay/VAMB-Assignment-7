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

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitBtn = document.querySelector('.submit-btn');

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const position = form.position.value.trim();
      const coverLetter = form.cover_letter.value.trim();
      
      let hasErrors = false;

      if (!name) {
        alert("Please enter your name.");
        hasErrors = true;
      }

      if (!email) {
        alert("Please enter your email.");
        hasErrors = true;
      } else if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        hasErrors = true;
      }

      if (!phone) {
        alert("Please enter your phone number.");
        hasErrors = true;
      } else if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid phone number (10 digits).");
        hasErrors = true;
      }

      if (!position) {
        alert("Please enter the position you're applying for.");
        hasErrors = true;
      }

      if (!coverLetter) {
        alert("Please provide your experience or cover letter.");
        hasErrors = true;
      }

      if (!hasErrors) {
        alert("Thank you for your application, " + name + "!");
      }
    });

    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  });




