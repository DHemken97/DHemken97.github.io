// Cursor Trail Effect
document.addEventListener('mousemove', (e) => {
    const cursorTrail = document.createElement('div');
    cursorTrail.classList.add('cursor-trail');
    cursorTrail.style.left = `${e.pageX}px`;
    cursorTrail.style.top = `${e.pageY}px`;
    document.body.appendChild(cursorTrail);
    setTimeout(() => cursorTrail.remove(), 1000);
});

// Form Validation & Submission
document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = document.querySelector('#submit-btn');
    submitBtn.textContent = 'Sending...';

    //Send

        // Gather form data
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const subject = document.querySelector('#subject').value;
        const message = document.querySelector('#message').value;
    
        console.log(name,email,subject,message)
    
      this.sendEmail(name,email,message)
      .then(isSuccess => {
        if (isSuccess)
            {
                submitBtn.textContent = 'Sent';
                submitBtn.style = "background:green";
                document.querySelector('#name').value = 
                document.querySelector('#email').value = 
                document.querySelector('#subject').value = 
                document.querySelector('#message').value = 
                "";
            }
        else
            {
                submitBtn.textContent = 'Error';
                submitBtn.style = "background:red";
            }
      }

      );


});
// Send email function
async function sendEmail(name, email, message) {
    const emailData = {
        to: "your-email@example.com",
        subject: `Contact from ${name}`,
        body: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
    try {
        const response = await fetch('https://maker.ifttt.com/trigger/contact_form_submitted/json/with/key/cWkiTQV5V7qjqVbm6hH7aT', {
            method: 'POST',
            body: `Name:${name} \r\nEmail:${email} \r\n ${message}`
        });

        if (response.ok) {
            console.log('Email sent successfully');
            return true;
        } else {
            console.error('Error sending email:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Network error:', error);
        return false;
    }
}




// Input Focus Animation
document.querySelectorAll('.contact-input').forEach(input => {
    input.addEventListener('focus', () => {
        input.classList.add('focused');
    });
    input.addEventListener('blur', () => {
        input.classList.remove('focused');
    });
});
