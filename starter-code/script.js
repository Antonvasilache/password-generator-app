//Password generator based on the given options selected from the form
function generatePassword(options) {
  const lowerCaseRange = { min: 97, max: 122 };
  const upperCaseRange = { min: 65, max: 90 };
  const numbersRange = { min: 48, max: 57 };
  const symbolsRange = { min: 33, max: 47 };

  if (options.length <= 0) return;

  const characterSets = [];

  if (options.lowercase) characterSets.push(lowerCaseRange);
  if (options.uppercase) characterSets.push(upperCaseRange);
  if (options.numbers) characterSets.push(numbersRange);
  if (options.symbols) characterSets.push(symbolsRange);

  if (characterSets.length === 0) return "Select characters";

  let password = "";
  while (password.length === 0) {
    password = "";
    for (let i = 0; i < options.length; i++) {
      const chosenSet =
        characterSets[Math.floor(Math.random() * characterSets.length)];
      const randomCharCode =
        Math.floor(Math.random() * (chosenSet.max - chosenSet.min + 1)) +
        chosenSet.min;
      password += String.fromCharCode(randomCharCode);
    }
  }

  return password;
}

//Checking password strength based four sets of criteria
function checkPasswordStrength(formData) {
  const { length, uppercase, lowercase, numbers, symbols } = formData;

  const characterSets = [];
  if (uppercase) characterSets.push(uppercase);
  if (lowercase) characterSets.push(lowercase);
  if (numbers) characterSets.push(numbers);
  if (symbols) characterSets.push(symbols);

  if (characterSets.length === 0) return "Select characters";

  rectangles.forEach((rectangle) =>
    rectangle.classList.remove("very-weak", "weak", "medium", "strong")
  );

  if (length <= 4) {
    rectangles[0].classList.add("very-weak");
    strength.textContent = "Very weak";
  }

  if (characterSets.length <= 2 && length > 3 && length <= 20) {
    rectangles[0].classList.add("weak");
    rectangles[1].classList.add("weak");
    strength.textContent = "Weak";
  }

  if (characterSets.length === 3 && length >= 8 && length <= 12) {
    rectangles[0].classList.add("medium");
    rectangles[1].classList.add("medium");
    rectangles[2].classList.add("medium");
    strength.textContent = "Medium";
  }

  if (characterSets.length >= 3 && length >= 12) {
    rectangles[0].classList.add("strong");
    rectangles[1].classList.add("strong");
    rectangles[2].classList.add("strong");
    rectangles[3].classList.add("strong");
    strength.textContent = "Strong";
  }
}

//Displaying the selected character length
const range = document.getElementById("range");
const result = document.getElementById("result");
const rangeNumber = document.querySelector(".range-number");

range.addEventListener("input", () => {
  rangeNumber.textContent = range.value;
});

//Generating the password & displaying password strength
const form = document.querySelector(".password-options");
const rectangles = document.querySelectorAll(".rectangle-svg");
const strength = document.querySelector(".strength-state");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    length: document.getElementById("range").value,
    uppercase: document.getElementById("uppercase").checked,
    lowercase: document.getElementById("lowercase").checked,
    numbers: document.getElementById("numbers").checked,
    symbols: document.getElementById("symbols").checked,
  };

  result.value = generatePassword(formData);

  checkPasswordStrength(formData);
});

//Copy to clipboard
const copyBtn = document.querySelector(".copy-btn");

copyBtn.addEventListener("click", () => {
  const textToCopy = result.value;

  if (
    navigator.clipboard &&
    navigator.clipboard.writeText &&
    textToCopy.length > 0
  ) {
    navigator.clipboard
      .writeText(textToCopy)
      .catch((error) => console.error("Failed to copy text", error));
  }
});
