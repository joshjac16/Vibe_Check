const passwordInput = document.querySelector('.pass-field input');
const eyeIcon = document.querySelector('.pass-field i');
const requirementList = document.querySelectorAll('.requirement-list li');
const signupBtn = document.querySelector('#signup-button');
const signupContainer = document.querySelector('.signup-container');

// An array of password requirements with corresponding
// regular expressions and index of the requirement list item
const requirements = [
  { regex: /.{8,}/, index: 0 }, // Minimum of 8 characters
  { regex: /[0-9]/, index: 1 }, // At least one number
  { regex: /[a-z]/, index: 2 }, // At least one lowercase letter
  { regex: /[^A-Za-z0-9]/, index: 3 }, // At least one special character
  { regex: /[A-Z]/, index: 4 }, // At least one uppercase letter
];

signupContainer.addEventListener('keyup', (e) => {
  let target = e.target;
  let container = target.parentElement.parentElement;

  if (container.classList.contains('login')) {
    if (
      !signupContainer.children[1].children[0].value ||
      !validate(signupContainer.children[0].children[0].value)
    ) {
      signupBtn.setAttribute('disabled');
      signupBtn.classList.remove('shimmering-button');
      signupBtn.classList.add('shimmering-btn-def');
    } else {
      signupBtn.classList.add('shimmering-button');
      signupBtn.classList.remove('shimmering-btn-def');
      signupBtn.removeAttribute('disabled');
    }
    return;
  }

  let passwordValid = false;
  // for Stephen
  let helicopter = 0;
  requirements.forEach((item) => {
    // Check if the password matches the requirement regex
    const isValid = item.regex.test(passwordInput.value);
    const requirementItem = requirementList[item.index];

    // Updating class and icon of requirement item if requirement matched or not
    if (isValid) {
      helicopter++;
      requirementItem.classList.add('valid');
      requirementItem.firstElementChild.className = 'fa-solid fa-check';
    } else {
      requirementItem.classList.remove('valid');
      requirementItem.firstElementChild.className = 'fa-solid fa-circle';
    }
  });
  if (helicopter == 5) {
    passwordValid = true;
  } else {
    passwordValid = false;
  }

  if (
    !signupContainer.children[0].children[0].value ||
    !validate(signupContainer.children[1].children[0].value) ||
    !passwordValid
  ) {
    signupBtn.setAttribute('disabled');
    signupBtn.classList.remove('shimmering-button');
    signupBtn.classList.add('shimmering-btn-def');
  } else {
    signupBtn.classList.add('shimmering-button');
    signupBtn.classList.remove('shimmering-btn-def');
    signupBtn.removeAttribute('disabled');
  }
});

function validate(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  } else {
    return false;
  }
}

eyeIcon.addEventListener('click', () => {
  // Toggle the password input type between "password" and "text"
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';

  // Update the eye icon class based on the password input type
  eyeIcon.className = `fa-solid fa-eye${
    passwordInput.type === 'password' ? '' : '-slash'
  }`;
});

document.addEventListener('DOMContentLoaded', function () {
  var switchInput = document.querySelector('.switch__input');
  var targetElement = document.querySelector('body'); // Change this selector to target the element you want to add/remove the class from
  var darkModeMessage = document.getElementById('darkModeMessage');

  // Function to fade out the message
  function fadeOutMessage() {
    darkModeMessage.classList.add('fade-out');
    setTimeout(function () {
      darkModeMessage.innerHTML = '';
      darkModeMessage.classList.remove('fade-out');
    }, 2000); // 2 seconds
  }

  // Function to apply dark mode based on the preference
  function applyDarkMode(isDarkMode) {
    if (isDarkMode) {
      document.documentElement.setAttribute('color-mode', 'dark');
      targetElement.classList.add('dark-mode-on');
      darkModeMessage.innerHTML = '<p>Dark mode On</p>';
    } else {
      document.documentElement.setAttribute('color-mode', 'light');
      targetElement.classList.remove('dark-mode-on');
      darkModeMessage.innerHTML = '<p>Light mode On</p>';
    }
    fadeOutMessage();
  }

  // Check sessionStorage for dark mode preference and switch state on page load
  var isDarkMode = sessionStorage.getItem('darkMode') === 'true';
  var switchState = sessionStorage.getItem('switchState') === 'true';
  applyDarkMode(isDarkMode);
  switchInput.checked = switchState;

  // Event listener for switch input change
  switchInput.addEventListener('change', function () {
    var isChecked = this.checked;
    sessionStorage.setItem('darkMode', isChecked);
    sessionStorage.setItem('switchState', isChecked);
    applyDarkMode(isChecked);
  });
});
