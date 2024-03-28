const passwordInput = document.querySelector('.pass-field input');
const eyeIcon = document.querySelector('.pass-field i');
const requirementList = document.querySelectorAll('.requirement-list li');
const signupBtn = document.querySelector('#signup-button');
const loginPasswordInput = document.querySelector('.login-pass-field');
const loginEmailInput = document.querySelector('.login-user-field');

// An array of password requirements with corresponding
// regular expressions and index of the requirement list item
const requirements = [
  { regex: /.{8,}/, index: 0 }, // Minimum of 8 characters
  { regex: /[0-9]/, index: 1 }, // At least one number
  { regex: /[a-z]/, index: 2 }, // At least one lowercase letter
  { regex: /[^A-Za-z0-9]/, index: 3 }, // At least one special character
  { regex: /[A-Z]/, index: 4 }, // At least one uppercase letter
];

passwordInput.addEventListener('keyup', (e) => {
  // for Stephen
  let helicopter = 0;
  requirements.forEach((item) => {
    // Check if the password matches the requirement regex
    const isValid = item.regex.test(e.target.value);
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
    signupBtn.classList.add('shimmering-button');
    signupBtn.classList.remove('shimmering-btn-def');
  } else {
    signupBtn.classList.remove('shimmering-button');
    if (!signupBtn.classList.contains('shimmering-btn-def')) {
      signupBtn.classList.add('shimmering-btn-def');
    }
  }
});

eyeIcon.addEventListener('click', () => {
  // Toggle the password input type between "password" and "text"
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';

  // Update the eye icon class based on the password input type
  eyeIcon.className = `fa-solid fa-eye${
    passwordInput.type === 'password' ? '' : '-slash'
  }`;
});
