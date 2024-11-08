document.addEventListener("DOMContentLoaded", function () {
    const donationForm = document.getElementById("donationForm");

    // Handle form submission
    donationForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const amount = document.getElementById("amount").value;

        // Send donation data to the server
        fetch("/duser/donate", { // Ensure the correct endpoint is used
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, amount }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error in donation submission');
            }
        })
        .then(data => {
            console.log("Donation successful:", data);
            // Optionally reset the form
            donationForm.reset();
            // Remove this line to avoid refetching recent donations after each submission
            // displayRecentDonations(); // Refresh the donation list
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });

    // Function to fetch and display top 10 donations
    function displayRecentDonations() {
        fetch("/recent-donations")
            .then(response => response.json())
            .then(donations => {
                const topDonationsList = document.getElementById("topDonations");
                topDonationsList.innerHTML = ""; // Clear existing list

                donations.forEach(donation => {
                    const li = document.createElement("li");
                    li.textContent = `${donation.name} donated $${donation.amount} on ${new Date(donation.date).toLocaleString()}`;
                    topDonationsList.appendChild(li);
                });
            })
            .catch(error => {
                console.error("Error fetching recent donations:", error);
            });
    }

    // Load recent donations on page load
    displayRecentDonations();
});
