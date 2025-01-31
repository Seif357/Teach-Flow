const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Manage input placeholders
const handleInputFocus = (input) => {
  input.addEventListener("focus", () => (input.placeholder = ""));
  input.addEventListener("blur", () => {
    if (!input.value) input.placeholder = input.dataset.placeholder;
  });
};

usernameInput.dataset.placeholder = usernameInput.placeholder;
passwordInput.dataset.placeholder = passwordInput.placeholder;
handleInputFocus(usernameInput);
handleInputFocus(passwordInput);

const sendLogin = async function () {
  /**/
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  let json = {};

  const url = "http://localhost:5057/api/Account/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the Content-Type
      },
      body: JSON.stringify({
        email: email,
        password: password,
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

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const errorMessage = document.createElement("span");

      // Validate inputs
      if (username.trim() === "" || password.trim() === "") {
        errorMessage.textContent = "All fields are required.";
        errorMessage.className = "error-message";
        document.querySelector(".register-form").prepend(errorMessage);
        return; // Stop further execution
      } else {
        console.log("i am here");
        let json = await sendLogin();
        if (json.status === "success") {
          console.log("success");
          localStorage.setItem("token", json.token);
          location.replace("../HTML/HomePage.html"); // Redirect to homepage
        } else {
          errorMessage.textContent = json.message;
          errorMessage.className = "error-message";
          document.querySelector(".login-form").prepend(errorMessage);
        }
      }
    });
});
