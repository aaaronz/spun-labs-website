// Waitlist form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waitlistForm');
    const emailInput = form.querySelector('.email-input');
    const submitButton = form.querySelector('.submit-button');
    const waitlistSection = document.querySelector('.waitlist');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();

        if (!email) {
            return;
        }

        // Disable form while submitting
        submitButton.disabled = true;
        submitButton.style.opacity = '0.6';
        submitButton.style.cursor = 'not-allowed';

        try {
            // Submit to Google Sheets
            const formData = new FormData();
            formData.append('email', email);

            const response = await fetch('https://script.google.com/macros/s/AKfycbxtZ1QHB1Ckm5CeXZa1ilmil5dXdUnccH3zF-U7vHHa8KCoWaCDJ-i_6jxmIJp4xeRY/exec', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Show success message
                waitlistSection.innerHTML = `
                    <div class="success-message">
                        <h3 class="success-title">Thank you for joining!</h3>
                        <p class="success-text">We'll be in touch soon.</p>
                    </div>
                `;
            } else {
                throw new Error('Submission failed');
            }

        } catch (error) {
            // Show error message
            alert('Something went wrong. Please try again or email us directly at hello@spunlabs.ai');

            // Re-enable form
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
        }
    });
});
