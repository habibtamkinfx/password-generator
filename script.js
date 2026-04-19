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
const symbolCharacters = '/[!@#$%^&*()-_=+[\]{}|;:,.<>?]/';

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


 