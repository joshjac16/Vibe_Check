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

  // Make the active link a different color
  const navbar = document.querySelector('.navbar');

  // Add an event listener to each link
  navbar.addEventListener('click', function (event) {
    if (event.target.classList.contains('nav-link')) {
      const navLinks = document.querySelectorAll('.nav-link');
      // Removes the active class from all links
      navLinks.forEach((link) => link.classList.remove('active'));
      // Adds the active class to the clicked link
      event.target.classList.add('active');
      localStorage.setItem('activeLink', event.target.id);
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const activeLinkId = localStorage.getItem('activeLink');
  if (activeLinkId) {
    const activeLink = document.getElementById(activeLinkId);
    if (activeLink) {
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach((link) => {
        if (link.id !== activeLinkId) {
          link.classList.remove('active');
        } else {
          link.classList.add('active');
        }
      });
    }
  }
});
