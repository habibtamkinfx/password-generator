const passwordInput = document.getElementById('password');
const copyButton = document.getElementById('copy-btn');
const passwordLengthInput = document.getElementById('range-length');
const lenghthValue = document.getElementById('length-value');
const uppercaseCheckbox = document.getElementById('include-uppercase');
const lowercaseCheckbox = document.getElementById('include-lowercase');
const numbersCheckbox = document.getElementById('include-numbers');
const symbolsCheckbox = document.getElementById('include-symbols');
const generateButton = document.getElementById('generate-btn');
const strengthLabel = document.getElementById('strength-label');
const strengthMeter = document.querySelector('.strength-meter');
const strengthBar = document.querySelector('.strength-bar');

const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numberCharacters = '0123456789';
const symbolCharacters = '!@#$%^&*()-_=+[]{}|;:,.<>?';

passwordLengthInput.addEventListener('input', () => {
  lenghthValue.textContent = passwordLengthInput.value;
});

generateButton.addEventListener('click', generatePassword);

function generatePassword() {
  const length = Number(passwordLengthInput.value);
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;
  if (
    !includeUppercase &&
    !includeLowercase &&
    !includeNumbers &&
    !includeSymbols
  ) {
    alert('Please select at least one char type.');
    return;
  }

  const newPassword = randomPassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  );
  passwordInput.value = newPassword;

  updateStrengthLength(newPassword);
}

function randomPassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
) {
  let allCharacters = '';
  if (includeUppercase) allCharacters += uppercaseLetters;
  if (includeLowercase) allCharacters += lowercaseLetters;
  if (includeNumbers) allCharacters += numberCharacters;
  if (includeSymbols) allCharacters += symbolCharacters;
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomNumber];
  }
  return password;
}

window.addEventListener('DOMContentLoaded', generatePassword);

function updateStrengthLength(password) {
  const passwordLength = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = new RegExp(
    `[${symbolCharacters.replace(/[-[\]{}|;:,.<>?]/g, '\\$&')}]`,
  ).test(password);

  let strengthScore = 0;
  if (hasUppercase) strengthScore += 15;
  if (hasLowercase) strengthScore += 15;
  if (hasNumbers) strengthScore += 15;
  if (hasSymbols) strengthScore += 15;

  strengthScore += Math.min(passwordLength * 2, 40);

  const safeScore = Math.max(5, Math.min(100, strengthScore));

  strengthBar.style.width = safeScore + '%';

  let labelText = '';

  strengthBar.classList.remove('weak', 'medium', 'strong');
  if (safeScore < 40) {
    strengthBar.classList.add('weak');
    labelText = 'Weak';
  } else if (safeScore < 70) {
    strengthBar.classList.add('medium');
    labelText = 'Medium';
  } else {
    strengthBar.classList.add('strong');
    labelText = 'Strong';
  }
  strengthLabel.textContent = labelText;
}

copyButton.addEventListener('click', () => {
  const password = passwordInput.value;
  if (!password) {
    alert('No password to copy!');
    return;
  }
  navigator.clipboard
    .writeText(password)
    .then(() => {
      showSuccessMessage();
    })
    .catch(() => {
      alert('Failed to copy password. Please try again.');
    });
});

function showSuccessMessage() {
  copyButton.classList.add('fa-check');
  copyButton.classList.remove('fa-copy');
  copyButton.style.color = '#4caf50';
  setTimeout(() => {
    copyButton.classList.remove('fa-check');
    copyButton.classList.add('fa-copy');
    copyButton.style.color = '';
  }, 2000);
}
