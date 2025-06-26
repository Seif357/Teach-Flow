document
  .getElementById("profilePicture")
  .addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profileImage").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

window.onload = async () => {
  const name = document.getElementById("fullName");
  const email = document.getElementById("contactInfo");
  /* ------------------------------------------------------- */
  const f_fname = document.getElementById("firstName");
  const f_lname = document.getElementById("lastName");
  const f_email = document.getElementById("email");
  const f_pass = document.getElementById("password");

  const url = `http://localhost:5057/api/Account/me`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    var json = await response.json();
    if (!response.ok) {
      console.log("error");
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
    return;
  }
  console.log(json);
  f_fname.value = json.user_first_name;
  f_lname.value = json.user_last_name;
  f_email.value = json.user_email;
  f_pass.value = "***********";
  name.innerHTML = json.user_first_name + json.user_last_name;
  email.innerHTML = json.user_email;
};

// Manage input fields
const firstNameInput = document.querySelector(
  'input[placeholder="First Name"]'
);
const emailInput = document.querySelector('input[placeholder="E-mail"]');
const lastNameInput = document.querySelector('input[placeholder="Last Name"]');
const passwordInput = document.querySelector('input[placeholder="Password"]');

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

// Attach focus handlers to all inputs
[firstNameInput, emailInput, lastNameInput, passwordInput].forEach(
  handleInputFocus
);
// Wait for the DOM to load before accessing elements
document.addEventListener("DOMContentLoaded", function () {
  const profilePictureInput = document.getElementById("profilePicture");
  const profileImage = document.getElementById("profileImage");
  const imagePreview = document.getElementById("imagePreview");
  const cropModal = document.getElementById("cropModal");
  const cropButton = document.getElementById("cropButton");
  const cancelButton = document.getElementById("cancelButton");
  const mainContent = document.querySelector(".main-content");
  const defaultImage =
    "../Images/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg";
  let cropper;

  // Load saved profile image or use the default
  const savedImage = localStorage.getItem("profileImage") || defaultImage;
  profileImage.src = savedImage;

  // Open file selector when clicking the profile image
  profileImage.addEventListener("click", () => profilePictureInput.click());

  // Handle file selection
  profilePictureInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        cropModal.style.display = "block"; // Show crop modal

        // Initialize cropper (destroy any existing instance first)
        cropper?.destroy();
        cropper = new Cropper(imagePreview, {
          aspectRatio: 1,
          viewMode: 1,
          movable: true,
          zoomable: true,
          cropBoxResizable: true,
        });

        toggleBlur(true); // Blur the background
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle crop action
  cropButton.addEventListener("click", () => {
    const canvas = cropper.getCroppedCanvas({ width: 150, height: 150 });
    const croppedImage = canvas.toDataURL();

    profileImage.src = croppedImage;
    localStorage.setItem("profileImage", croppedImage); // Save image to localStorage

    closeModal(); // Close the crop modal
  });

  // Handle cancel action
  cancelButton.addEventListener("click", closeModal);

  // Close modal and remove blur
  function closeModal() {
    cropper?.destroy();
    cropModal.style.display = "none";
    toggleBlur(false); // Remove blur effect
  }

  // Toggle blur effect (excluding crop modal)
  function toggleBlur(isBlurred) {
    mainContent.querySelectorAll(":scope > *:not(#cropModal)").forEach((el) => {
      el.style.filter = isBlurred ? "blur(15px)" : "none";
      el.style.pointerEvents = isBlurred ? "none" : "auto";
    });
  }

  // Manage input placeholders (reusable logic)
  document.querySelectorAll("input[placeholder]").forEach((input) => {
    const originalPlaceholder = input.placeholder;
    input.dataset.placeholder = originalPlaceholder;

    input.addEventListener("focus", () => (input.placeholder = ""));
    input.addEventListener("blur", () => {
      if (!input.value) input.placeholder = originalPlaceholder;
    });
  });

  // Go back and refresh the previous page
  function goBackAndRefresh(event) {
    event.preventDefault();
    if (document.referrer && document.referrer === window.location.href) {
      window.location.href = "HomePage.html";
    } else {
      history.back();
      setTimeout(() => location.reload(), 100);
    }
  }
});
