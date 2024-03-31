const eyeIcon = document.querySelector('.pass-field i');
const passwordInput = document.querySelector('.pass-field input');
const loginButton = document.querySelector('#login-button');

// Check input fields and update button class
const checkInputFields = () => {
  const email = document.querySelector('.email-login').value.trim();
  const password = passwordInput.value.trim();

  if (email && password) {
    loginButton.classList.add('shimmering-button');
    loginButton.classList.remove('shimmering-btn-def');
    loginButton.removeAttribute('disabled');
  } else {
    loginButton.classList.remove('shimmering-button');
    loginButton.classList.add('shimmering-btn-def');
    loginButton.setAttribute('disabled', 'disabled');
  }
};

// Adds event listeners to the input fields to update the button's class when the input changes
document
  .querySelector('.email-login')
  .addEventListener('input', checkInputFields);
passwordInput.addEventListener('input', checkInputFields);

// Initial call to check input fields and update button class
checkInputFields();

// Login form handler
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('.email-login').value.trim();
  const password = passwordInput.value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

document
  .querySelector('.login-container')
  .addEventListener('submit', loginFormHandler);

eyeIcon.addEventListener('click', () => {
  const type =
    passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  eyeIcon.className = `fa-solid fa-eye${type === 'password' ? '' : '-slash'}`;
});
