/*scroll to subgenres card*/

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    // Check if smooth scrolling is supported
    if ('scrollBehavior' in document.documentElement.style) {
      try {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      } catch (e) {
        // Fallback for older browsers
        element.scrollIntoView(true);
      }
    } else {
      // Polyfill for browsers without smooth scroll support (mainly iOS Safari)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;
      smoothScrollTo(offsetPosition, 600);
    }
  } else {
    console.error('Element with ID "' + sectionId + '" not found');
  }
}

function scrollToSectionForm(sectionId) {
  scrollToSection(sectionId);
}

// Smooth scroll browsers that don't support it natively
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}


/*Filter Genres and subgenres*/
function filterGenres(genre, event) {
  console.log('Filter called with genre:', genre); // Debug log

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Add active class to clicked button
  event.target.classList.add('active');

  // Get all subgenre items
  const items = document.querySelectorAll('.subgenre-card')
  console.log('Found items:', items.length); // Debug log

  // Filter items based on selected genre
  items.forEach(item => {
    const itemGenre = item.getAttribute('data-category')
    console.log('Item genre:', itemGenre); // Debug log

    if (genre === 'all') {
      item.style.display = 'block';
    } else {
      if (itemGenre === genre) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    }
  });
}



/* form validator */

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!checkRequired([username, email, password, password2])) {
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
  }

});

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const container = input.parentElement; // Get the password-container
  const button = container.querySelector('.toggle-password'); // Find the button within container

  if (input.type === 'password') {
    input.type = 'text';
    button.textContent = '🙈'; // Change to hide icon
  } else {
    input.type = 'password';
    button.textContent = '👁️'; // Change to show icon
  }
}

/*scroll to the top*/

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
    block: 'start'
  });
}
