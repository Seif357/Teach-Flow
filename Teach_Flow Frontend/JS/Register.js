// Manage input fields
const firstNameInput = document.querySelector(
  'input[placeholder="First Name"]'
);
const emailInput = document.querySelector('input[placeholder="E-mail"]');
const lastNameInput = document.querySelector('input[placeholder="Last Name"]');
const passwordInput = document.querySelector('input[placeholder="Password"]');
const confirmPasswordInput = document.querySelector(
  'input[placeholder="Confirm Password"]'
);

// Function to handle input placeholders
const handleInputFocus = (input) => {
  input.addEventListener("focus", () => (input.placeholder = ""));
  input.addEventListener("blur", () => {
    if (!input.value) input.placeholder = input.dataset.placeholder;
  });
};

// Set data placeholders for inputs
firstNameInput.dataset.placeholder = firstNameInput.placeholder;
emailInput.dataset.placeholder = emailInput.placeholder;
lastNameInput.dataset.placeholder = lastNameInput.placeholder;
passwordInput.dataset.placeholder = passwordInput.placeholder;
confirmPasswordInput.dataset.placeholder = confirmPasswordInput.placeholder;

// Attach focus handlers to all inputs
[
  firstNameInput,
  emailInput,
  lastNameInput,
  passwordInput,
  confirmPasswordInput,
].forEach(handleInputFocus);

const sendRegister = async function () {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  let json = {};
  const url = "http://localhost:5057/api/Account/register";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the Content-Type
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });
    json = await response.json();
    console.log(json);
    if (!response.ok) {
      console.log("error");
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
  return json;
};

document.addEventListener("DOMContentLoaded", async function () {
  document
    .getElementById("myForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default form submission

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const errorMessage = document.createElement("span");

      // Validate inputs
      if (
        firstName.trim() === "" ||
        lastName.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        confirmPassword.trim() === ""
      ) {
        errorMessage.textContent = "All fields are required.";
        errorMessage.className = "error-message";
        document.querySelector(".register-form").prepend(errorMessage);
        return; // Stop further execution
      } else if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        errorMessage.className = "error-message";
        document.querySelector(".register-form").prepend(errorMessage);
        return; // Stop further execution
      } else {
        // Store login status
        console.log("i am here");
        let json = await sendRegister();
        if (json.status === "success") {
          console.log("success");
          location.replace("../HTML/Login.html"); // Redirect to homepage
        } else {
          errorMessage.textContent = json.message;
          errorMessage.className = "error-message";
          document.querySelector(".register-form").prepend(errorMessage);
        }
      }
    });
});
