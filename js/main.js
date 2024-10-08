(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 0);  // No delay (0 ms)
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    document.getElementById('package').addEventListener('change', function () {
        var selectedPackage = this.value;
        var otherPackageInput = document.getElementById('other-package');

        if (selectedPackage === 'Other') {
            otherPackageInput.style.display = 'block';
        } else {
            otherPackageInput.style.display = 'none';
        }
    });

    // Testimonial carousel
    $(".testimonial-carousel-1").owlCarousel({
        loop: true,
        dots: false,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 1
            },
            575: {
                items: 1
            },
            767: {
                items: 2
            },
            991: {
                items: 3
            }
        }
    });

    $(".testimonial-carousel-2").owlCarousel({
        loop: true,
        dots: false,
        rtl: true,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 1
            },
            575: {
                items: 1
            },
            767: {
                items: 2
            },
            991: {
                items: 3
            }
        }
    });

})(jQuery); function toggleMainCourseOptions() {
    var mainCourseOptions = document.getElementById('main-course-options');
    mainCourseOptions.style.display = mainCourseOptions.style.display === 'none' ? 'block' : 'none';
}

function togglePayasamOptions() {
    var payasamOptions = document.getElementById('payasam-options');
    payasamOptions.style.display = payasamOptions.style.display === 'none' ? 'block' : 'none';
}

function submitData() {
    var name = document.querySelector('[placeholder="Your Name"]').value.trim();
    var place = document.querySelector('[placeholder="Your Place"]').value.trim();
    var package = document.getElementById('package').value;
    var otherPackage = document.querySelector('[placeholder="Specify Other Package"]').value.trim();
    var persons = document.querySelector('[placeholder="Number of Persons"]').value.trim();
    var date = document.querySelector('[placeholder="Select Date"]').value.trim();
    var contact = document.querySelector('[placeholder="Contact Number"]').value.trim();
    var email = document.querySelector('[placeholder="Enter Your Email"]').value.trim();

    var menuItems = [];
    if (document.getElementById('drinks').checked) menuItems.push('Drinks');
    if (document.getElementById('breakfast').checked) menuItems.push('Breakfast');
    if (document.getElementById('main-course').checked) {
        if (document.getElementById('special-sadhya').checked) menuItems.push('Special Sadhya');
        if (document.getElementById('traditional-sadhya').checked) menuItems.push('Traditional Sadhya');
        if (document.getElementById('premium-sadhya').checked) menuItems.push('Premium Sadhya');
        if (document.getElementById('veg-biriyani').checked) menuItems.push('Veg Biriyani');
    }
    if (document.getElementById('payasam').checked) {
        if (document.getElementById('palada-payasam').checked) menuItems.push('Palada Payasam');
        if (document.getElementById('pazham-payasam').checked) menuItems.push('Pazham Payasam');
        if (document.getElementById('semiya-payasam').checked) menuItems.push('Semiya Payasam');
        if (document.getElementById('parippu-payasam').checked) menuItems.push('Parippu Payasam');
        if (document.getElementById('adapradhman-payasam').checked) menuItems.push('Ada Pradhaman');
        if (document.getElementById('gothambu-payasam').checked) menuItems.push('Gothambu Payasam');
        if (document.getElementById('pineapple-payasam').checked) menuItems.push('Pineapple Payasam');
        if (document.getElementById('kadalaparipp-payasam').checked) menuItems.push('Kadalaparippu Payasam');
    }

    var menuItemsStr = menuItems.join(', ');

    // Basic validation
    if (name === "" || place === "" || persons === "" || date === "" || contact === "" || email === "") {
        alert("Please fill out all required fields.");
        return false;
    }

    // Validate email format
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validate phone number length
    if (contact.length < 10 || contact.length>10) {
        alert("Please enter a valid contact number.");
        return false;
    }
    // Validate name format (only alphabetic characters and spaces)
  var namePattern = /^[A-Za-z\s]+$/;
  if (!namePattern.test(name)) {
    alert("Please enter a valid name (letters and spaces only).");
    return false;
  }

  // Validate place format (no numbers allowed)
  var placePattern = /^[A-Za-z\s]+$/;
  if (!placePattern.test(place)) {
    alert("Please enter a valid place (letters and spaces only).");
    return false;
  }



    var menuItemsStr = menuItems.join(', ');

    var message = `Name: ${name}\nPlace: ${place}\nPackage: ${package}\nOther Package: ${otherPackage}\nNumber of Persons: ${persons}\nDate: ${date}\nContact: ${contact}\nEmail: ${email}\nMenu Items: ${menuItemsStr}`;
    var whatsappURL = `https://api.whatsapp.com/send?phone=+919946687915&text=${encodeURIComponent(message)}`;

    alert("Your details have been submitted successfully!");

    window.location.href = whatsappURL;
}
// contact us
function submitForm() {
    // Get form values
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();
    let errorMessage = '';

    // Basic validation
    if (!name) {
        errorMessage += 'Name is required.\n';
    }
    if (!email) {
        errorMessage += 'Email is required.\n';
    } else if (!validateEmail(email)) {
        errorMessage += 'Email is not valid.\n';
    }
    if (!message) {
        errorMessage += 'Message is required.\n';
    }

    // Show error if any, or proceed
    if (errorMessage) {
        alert(errorMessage);
        return;  // Stop further execution if there's an error
    }

    // Create JSON object
    let formData = {
        name: name,
        email: email,
        message: message
    };

    // Send JSON data to the server using fetch
    fetch('save_contact.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)  // Convert JavaScript object to JSON
    })
    .then(response => response.text())
    .then(data => {
        alert(data);  // Show the response from the PHP script
        document.getElementById('contactForm').reset();  // Reset the form
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send the message. Please try again.');
    });
}

// Email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}
