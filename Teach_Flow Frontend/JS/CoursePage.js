let COURSE;
let POSTS;

const createComment = async function (postID, content) {
  const url = `http://localhost:5057/api/post/${postID}/comment`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      console.log("error");
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
};
function generateRandomLetters() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

function getOrSetRandomLetters() {
  // Check if random letters are already saved in local storage
  let savedLetters = localStorage.getItem("courseLetters");

  // If not, generate and save them
  if (!savedLetters) {
    savedLetters = generateRandomLetters();
    localStorage.setItem("courseLetters", savedLetters);
  }

  return savedLetters;
}

function formatCourseId(id) {
  // Add a leading zero if `id` is a single digit
  return id.toString().length === 1 ? `0${id}` : id.toString();
}


function generateGridItems() {
  const numberOfItems = POSTS.length;
  // TODO FETCH USER COURSES
  // const titles = [];
  // const titleElement = `Title ${i}`;
  // titles.push(titleElement);
  document.querySelector(".course-name").innerHTML =
    COURSE.Title.charAt(0).toUpperCase() + COURSE.Title.slice(1);
  document.querySelector(".course-teacher").innerHTML =
    COURSE.Teacher.FirstName + " " + COURSE.Teacher.LastName;
    // Display the course code
document.querySelector(".course-code").innerHTML =
`Nend${formatCourseId(COURSE.Id)}`;
  const postContainer = document.querySelector(".post-container"); // Ensure this container exists

  for (let i = 0; i < numberOfItems; i++) {
    const postitem = document.createElement("div");
    postitem.classList.add("post-item");
    const authorIcon = document.createElement("div");
    authorIcon.classList.add("author-icon");
    // Create post-header section
    const postHeader = document.createElement("div");
    postHeader.classList.add("post-header");

    const authorInfo = document.createElement("div");
    authorInfo.classList.add("author-info");
    const postAuthor = document.createElement("span");
    postAuthor.classList.add("post-author");
    postAuthor.textContent = POSTS[i].post_direct_pub.user_name;

    const title = postAuthor.textContent.trim();
    if (title.length > 0) {
      authorIcon.textContent = title.charAt(0).toUpperCase(); // Get the first letter of the title
    }
    
    const postDate = document.createElement("span");
    postDate.classList.add("post-date");
    postDate.textContent = new Date(POSTS[i].post_createAt).toDateString();

    // Append author info

    // Create post-content section
    const postContent = document.createElement("div");
    postContent.classList.add("post-content");
    postContent.innerHTML = `<p>${POSTS[i].post_content}</p>`;

    // Create comment section
    const commentSection = document.createElement("div");
    commentSection.classList.add("comment-section");
    // Create a container div for the SVG icon and comment count
    const commentCountContainer = document.createElement("div");
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");

    // Add the input and button to the container

    // Append the container to the desired parent element (e.g., the body or another div)
    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.classList.add("comment-input");
    commentInput.placeholder = "Add class comment...";
    // Create the post button
    const commentButton = document.createElement("button");
    commentButton.classList.add("comment-button");
    commentButton.id = "commentButton";

    // Add the SVG icon inside the button
    const svgIcon = `<svg focusable="false" width="24" height="24" viewBox="0 0 24 24" class="NMm5M hhikbc">
                    <path d="M2 3v18l20-9L2 3zm2 11l9-2-9-2V6.09L17.13 12 4 17.91V14z"></path>
                </svg>`;
    commentButton.innerHTML = svgIcon;

    // Add event listener to the button inside the loop
    commentButton.addEventListener("click", async function () {
      let postID = POSTS[i].post_id;
      const commentinputContent = commentInput.value;

      if (commentinputContent.trim() !== "") {
        // Logic to create the comment (e.g., sending it to the backend)
        console.log("post ID", postID);
        console.log("Comment posted:", commentinputContent);
        await createComment(postID, commentinputContent);
        // Clear the input field after posting
        commentInput.value = "";
        location.reload();
      } else {
        alert("Please enter a comment before posting.");
      }
    });
    const numberOfcomments = POSTS[i].comments.length;
    // Create the SVG icon element
    // Create the span element to display the number of comments
    const commentCountSpan = document.createElement("span");
    commentCountSpan.setAttribute("jsname", "V67aGc");
    commentCountSpan.setAttribute("class", "VfPpkd-vQzf8d");
    commentCountSpan.textContent = numberOfcomments + " class comments";

    // Append the SVG icon and the span to the container div
    commentCountContainer.appendChild(commentCountSpan);
    commentSection.appendChild(commentCountContainer);
    for (let k = 0; k < numberOfcomments; k++) {
      // Create elements
      const commentitem = document.createElement("div");
      commentitem.classList.add("comment-item");
      const commentHeader = document.createElement("div");
      commentHeader.classList.add("comment-header");

      const commentorInfo = document.createElement("div");
      commentorInfo.classList.add("commentor-info");

      const commentAuthor = document.createElement("span");
      commentAuthor.classList.add("comment-author");
      commentAuthor.textContent = POSTS[i].comments[k].comment_author_name;

      const commentDate = document.createElement("span");
      commentDate.classList.add("comment-date");
      commentDate.textContent = new Date(POSTS[i].post_createAt).toDateString();
      const commentorIcon = document.createElement("div");
      commentorIcon.classList.add("commentor-icon");
      const commentContent = document.createElement("div");
      commentContent.classList.add("comment-content");
      commentContent.innerHTML = `<p>${POSTS[i].comments[k].comment_content}</p>`;
      // Assemble commentor-info
      commentorInfo.appendChild(commentAuthor);
      commentorInfo.appendChild(commentDate);

      // Assemble comment-header
      commentHeader.appendChild(commentorIcon);
      commentHeader.appendChild(commentorInfo);
      commentitem.appendChild(commentHeader);
      commentitem.appendChild(commentContent);
      commentSection.appendChild(commentitem);
      const authorName = commentAuthor.textContent.trim();
      if (authorName.length > 0) {
        commentorIcon.textContent = authorName.charAt(0).toUpperCase();
      }
    }

    const hrElement = document.createElement("hr");
    authorInfo.appendChild(postAuthor);
    authorInfo.appendChild(postDate);

    // Assemble post-header
    postHeader.appendChild(authorIcon);
    postHeader.appendChild(authorInfo);
    commentContainer.appendChild(commentInput);
    commentContainer.appendChild(commentButton);
    commentSection.appendChild(commentContainer);
    postitem.appendChild(postHeader);
    postitem.appendChild(postContent);
    postitem.appendChild(hrElement); // Append the <hr> element
    postitem.appendChild(commentSection);
    postContainer.appendChild(postitem);
  }

  // Call other functions with the generated titles
  // TODO generateSubmenuItems(titles);
  // generateCourseimage();
}
// CoursePage.js
// function generateCourseimage() {
//   const courseimg = document.getElementById("course-img");
//   const selectedImageIndex = localStorage.getItem("selectedImageIndex");
//   if (selectedImageIndex) {
//     courseimg.src = `/Frontend/Images/Honors.jpg`;
//   }
// }
// function generateSubmenuItems(courses, userID) {
//   const submenuTeacherContainer = sidebar.querySelector(".submenu-teacher"); // Get the teacher submenu container
//   const submenuEnrolledContainer = sidebar.querySelector(".submenu-enrolled"); // Get the enrolled submenu container

//   // Clear existing submenu items
//   submenuTeacherContainer.innerHTML = "";
//   submenuEnrolledContainer.innerHTML = "";

//   // Condition to distribute titles (e.g., odd goes to teacher, even goes to enrolled)
//   courses.forEach((course) => {
//     const submenuItem = document.createElement("div");
//     submenuItem.classList.add("submenu-item");
//     //Add click event to submenu title for redirection
//     submenuItem.addEventListener("click", () => {
//       window.location.href = `../HTML/CoursePage.html?id=${course.course_id}`;
//     });
//     const submenuIcon = document.createElement("div");
//     submenuIcon.classList.add("submenu-icon");

//     const submenuTitle = document.createElement("div");
//     submenuTitle.classList.add("submenu-title");
//     submenuTitle.textContent = course.course_Title; // Set title

//     submenuItem.appendChild(submenuIcon);
//     submenuItem.appendChild(submenuTitle);

//     // Conditional: Place in teacher or enrolled based on index (odd/even)
//     if (course.course_teacher_id === userID) {
//       // Even index goes to submenu-teacher
//       submenuTeacherContainer.appendChild(submenuItem);
//     } else {
//       // Odd index goes to submenu-enrolled
//       submenuEnrolledContainer.appendChild(submenuItem);
//     }
//   });

//   changeFirstChar();
// }
var finalcreateClassBtn = document.getElementsByClassName("create-btn")[0];
finalcreateClassBtn.onclick = async () => {
  console.log("888888888888888888888888888888888888");
  var v = document.getElementsByClassName("create-class-input")[0].value;
  var desc = document.getElementById("classDescription").value;

  if (v === "") {
    return;
  }
  const url = `http://localhost:5057/api/course`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: v,
        Description: desc,
      }),
    });
    if (!response.ok) {
      console.log("error");
      throw new Error(`Response status: ${response.status}`);
    }
    console.log("course created");
  } catch (error) {
    console.error(error.message);
  }
  location.reload();
};
const code = document.getElementById("courseCode");

code.onclick = async () => {
  try {
    const text = code.textContent; // Retrieve the text inside the h2
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard:", text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

var finalJoinClassBtn = document.getElementsByClassName("join-btn")[0];
finalJoinClassBtn.onclick = async () => {
  console.log("55555555555555555555");
  var v = document.getElementsByClassName("join-class-input")[0].value;

  if (v === "") {
    return;
  }
  const url = `http://localhost:5057/api/course/join/${v}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      console.log("error");
      throw new Error(`Response status: ${response.status}`);
    }
    console.log("course Joined");
  } catch (error) {
    console.error(error.message);
  }
  location.reload();
};

window.onload = async () => {
  await Promise.all([fetchCourse(), fetchPosts(), fetchCourses()]);
  generateGridItems();
};

const fetchCourse = async function () {
  /**/
  let json = {};
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("id") || 2;
  const url = `http://localhost:5057/api/course/${courseId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    json = await response.json();
    if (!response.ok) {
      console.log("error");
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
    // window.location.href = "/Frontend/HTML/Login.html";
  }
  COURSE = json;
};
const fetchPosts = async function () {
  /**/
  let json = {};
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("id") || 2;
  const url = `http://localhost:5057/api/course/${courseId}/post`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    json = await response.json();
    if (!response.ok) {
      console.log("error");
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
    // window.location.href = "/Frontend/HTML/Login.html";
  }
  POSTS = json;
};

document.addEventListener("DOMContentLoaded", function () {
  const profilePicture = document.getElementById("profilePicture");
  const gridContainer = document.getElementById("gridContainer");
  const defaultImage =
    "../Images/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg";

  // Load the saved image or default
  const savedImage = localStorage.getItem("profileImage") || defaultImage;

  const isLoggedIn = localStorage.getItem("token") != null;
  profilePicture.src = isLoggedIn ? savedImage : defaultImage;
  gridContainer.style.display = isLoggedIn ? "grid" : "none";
});
// Get modal elements
var joinClassModal = document.getElementById("joinClassModal");
var createClassModal = document.getElementById("createClassModal");

// Get buttons that open the modals
var joinClassBtn = document.getElementById("joinClassBtn");
var createClassBtn = document.getElementById("createClassBtn");

// Get the <span> elements that close the modals
var closeJoinClass = document.getElementById("closeJoinClass");
var closeCreateClass = document.getElementById("closeCreateClass");

// Open Join Class modal
joinClassBtn.onclick = function () {
  joinClassModal.classList.add("show");
};

// Open Create Class modal
createClassBtn.onclick = function () {
  createClassModal.classList.add("show");
};

// Close Join Class modal
closeJoinClass.onclick = function () {
  joinClassModal.classList.remove("show");
};

// Close Create Class modal
closeCreateClass.onclick = function () {
  createClassModal.classList.remove("show");
};

// Close modals if clicked outside
window.onclick = function (event) {
  if (event.target == joinClassModal) {
    joinClassModal.classList.remove("show");
  }
  if (event.target == createClassModal) {
    createClassModal.classList.remove("show");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Automatically start with the sidebar collapsed
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.add("collapsed");
  teacherIcon.style.transform = "rotate(0deg)";
  enrolledSubmenu.classList.remove("open");
  enrolledIcon.style.transform = "rotate(0deg)";
});
const sidebar = document.getElementById("sidebar");
const gridContainer = document.getElementById("gridContainer");
const toggleBtn = document.getElementById("toggleBtn");

let hoverTimeout;
let isToggledOpen = false; // To track if sidebar was opened by toggle button

// Function to generate 50 grid items dynamically
document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("gridContainer");
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector(".toggle-btn");
  let hoverTimeout;
  let isToggledOpen = false; // Define this to avoid reference errors
  const imagePaths = [
    "../Images/Honors.jpg",
    "../Images/img_backtoschool.jpg",
    "../Images/img_bookclub.jpg",
    "../Images/img_code.jpg",
    "../Images/img_graduation.jpg",
    "../Images/img_learnlanguage.jpg",
    "../Images/img_reachout.jpg",
    "../Images/img_read.jpg",
  ];

  function getOrGenerateImage(index) {
    let storedImage = localStorage.getItem(`grid-img-${index}`);
    if (!storedImage) {
      const randomImage =
        imagePaths[Math.floor(Math.random() * imagePaths.length)];
      localStorage.setItem(`grid-img-${index}`, randomImage);
      storedImage = randomImage;
    }
    return storedImage;
  }

  function updateGridColumns() {
    const isCollapsed = sidebar.classList.contains("collapsed");
  }

  /* CODE WAS HERE */

  sidebar.classList.add("collapsed");
  updateGridColumns();

  toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
    updateGridColumns();
    if (sidebar.classList.contains("collapsed")) {
      gridContainer.classList.add("collapsed");
      teacherIcon.style.transform = "rotate(0deg)";
  enrolledSubmenu.classList.remove("open");
  enrolledIcon.style.transform = "rotate(0deg)";
    } else {
      gridContainer.classList.remove("collapsed");
    }
    isToggledOpen = !sidebar.classList.contains("collapsed");
    this.textContent = sidebar.classList.contains("collapsed") ? "☰" : "✖";
  });

  sidebar.addEventListener("mouseenter", () => {
    if (!isToggledOpen) {
      hoverTimeout = setTimeout(() => {
        sidebar.classList.remove("collapsed");
        updateGridColumns();
      }, 150);
    }
  });

  sidebar.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimeout);
    if (!isToggledOpen) {
      sidebar.classList.add("collapsed");
      teacherIcon.style.transform = "rotate(0deg)";
  enrolledSubmenu.classList.remove("open");
  enrolledIcon.style.transform = "rotate(0deg)";
      updateGridColumns();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in (simple example using localStorage)
  let isLoggedIn = localStorage.getItem("token") != null;

  const loginModal = document.getElementById("loginModal");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const signOutBtn = document.getElementById("signOutBtn");

  // If user is not logged in, show the modal
  if (!isLoggedIn) {
    loginModal.classList.add("show");
  }

  // Simulate login on button click
  loginBtn.addEventListener("click", function () {
    // localStorage.setItem('isLoggedIn', true);
    // loginModal.classList.remove('show');
    location.replace("../HTML/Login.html");
  });

  // Simulate register on button click (for demonstration purposes)
  registerBtn.addEventListener("click", function () {
    location.replace("../HTML/Register.html");
  });
  // Handle sign-out on button click
  signOutBtn.addEventListener("click", function () {
    // Remove the logged-in status
    alert("Redirect to Register Page");
    localStorage.removeItem("token");
    // Redirect to login page or refresh the current page to show the login modal again
    location.replace("../HTML/Login.html"); // Refresh page to show login modal again
  });
});
// Handle submenu item icons (on page load)
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".submenu-item").forEach(function (item) {
    const titleElement = item.querySelector(".submenu-title");
    const iconElement = item.querySelector(".submenu-icon");

    // Make sure both title and icon elements exist
    if (titleElement && iconElement) {
      const title = titleElement.textContent.trim();
      if (title.length > 0) {
        iconElement.textContent = title.charAt(0).toUpperCase(); // Get the first letter of the title
      }
    }
  });
});
// Selecting elements
const profilePic = document.querySelector(".accpfp");
const dropdown = document.getElementById("profileDropdown");
const plusIcons = document.querySelectorAll(".plus-icon");
const dropdownPlus = document.getElementById("plus-iconDropdown");

// Toggle profile picture dropdown
profilePic.addEventListener("click", function (event) {
  event.stopPropagation(); // Prevent event bubbling
  toggleVisibility(dropdown);
  dropdownPlus.style.display = "none"; // Ensure plus icon dropdown is hidden
});

// Toggle plus icon dropdown
plusIcons.forEach((icon) => {
  icon.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent event bubbling
    toggleVisibility(dropdownPlus);
    dropdown.style.display = "none"; // Ensure profile picture dropdown is hidden
  });
});

// Close both dropdowns when clicking outside
document.addEventListener("click", function (event) {
  if (!dropdown.contains(event.target) && !profilePic.contains(event.target)) {
    dropdown.style.display = "none";
  }
  if (
    !dropdownPlus.contains(event.target) &&
    !event.target.closest(".plus-icon")
  ) {
    dropdownPlus.style.display = "none";
  }
});

// Prevent dropdowns from closing when clicking inside them
dropdown.addEventListener("click", (event) => event.stopPropagation());
dropdownPlus.addEventListener("click", (event) => event.stopPropagation());

// Helper function to toggle dropdown visibility
function toggleVisibility(element) {
  element.style.display = element.style.display === "block" ? "none" : "block";
}

const teacherHeader = document.querySelector(".sidebar-header-teacher");
const teacherIcon = teacherHeader.querySelector(".collapsable-icon");
const teacherSubmenu = teacherHeader.nextElementSibling; // Submenu after the header
const enrolledHeader = document.querySelector(".sidebar-header-enrolled");
const enrolledIcon = enrolledHeader.querySelector(".collapsable-icon");
const enrolledSubmenu = enrolledHeader.nextElementSibling; // Submenu after the header

// Toggle submenu visibility and rotate icon on "Teaching" header click
teacherHeader.addEventListener("click", () => {
  if (sidebar.classList.contains("collapsed")) return; // Prevent toggle if sidebar is collapsed

  teacherSubmenu.classList.toggle("open");
  teacherIcon.style.transform = teacherSubmenu.classList.contains("open")
    ? "rotate(90deg)"
    : "rotate(0deg)";
});

// Toggle submenu visibility and rotate icon on "Enrolled" header click
enrolledHeader.addEventListener("click", () => {
  if (sidebar.classList.contains("collapsed")) return; // Prevent toggle if sidebar is collapsed

  enrolledSubmenu.classList.toggle("open");
  enrolledIcon.style.transform = enrolledSubmenu.classList.contains("open")
    ? "rotate(90deg)"
    : "rotate(0deg)";
});

const createPost = async function (content) {
  const url = `http://localhost:5057/api/course/${COURSE.Id}/post`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      console.log("error");
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
};

document
  .getElementById("postButton")
  .addEventListener("click", async function () {
    const postContent = document.getElementById("postInput").value;
    console.log("Button clicked"); // This will always log when the button is clicked
    if (postContent.trim() !== "") {
      // Logic to create the post, e.g., sending it to the backend
      console.log("Post created:", postContent);
      await createPost(postContent);
      location.reload();
      // Clear the input field after posting
      document.getElementById("postInput").value = "";
    } else {
      alert("Please enter some text before posting.");
      console.log("P");
    }
  });

const fetchCourses = async function () {
  /**/
  let json = {};

  const url = "http://localhost:5057/api/Course";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
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
  generateSubmenuItems(json.data, json.user);
};

const changeFirstChar = () => {
  document.querySelectorAll(".submenu-item").forEach(function (item) {
    console.log("--------------------------------------------");
    const titleElement = item.querySelector(".submenu-title");
    const iconElement = item.querySelector(".submenu-icon");

    // Make sure both title and icon elements exist
    if (titleElement && iconElement) {
      const title = titleElement.textContent.trim();
      if (title.length > 0) {
        iconElement.textContent = title.charAt(0).toUpperCase(); // Get the first letter of the title
      }
    }
  });
};
// Function to generate submenu items based on titles
function generateSubmenuItems(courses, userID) {
  const submenuTeacherContainer = sidebar.querySelector(".submenu-teacher"); // Get the teacher submenu container
  const submenuEnrolledContainer = sidebar.querySelector(".submenu-enrolled"); // Get the enrolled submenu container

  // Clear existing submenu items
  submenuTeacherContainer.innerHTML = "";
  submenuEnrolledContainer.innerHTML = "";

  // Condition to distribute titles (e.g., odd goes to teacher, even goes to enrolled)
  courses.forEach((course) => {
    const submenuItem = document.createElement("div");
    submenuItem.classList.add("submenu-item");
    //Add click event to submenu title for redirection
    submenuItem.addEventListener("click", () => {
      window.location.href = `../HTML/CoursePage.html?id=${course.course_id}`;
    });
    const submenuIcon = document.createElement("div");
    submenuIcon.classList.add("submenu-icon");

    const submenuTitle = document.createElement("div");
    submenuTitle.classList.add("submenu-title");
    submenuTitle.textContent = course.course_Title; // Set title

    submenuItem.appendChild(submenuIcon);
    submenuItem.appendChild(submenuTitle);

    // Conditional: Place in teacher or enrolled based on index (odd/even)
    if (course.course_teacher_id === userID) {
      // Even index goes to submenu-teacher
      submenuTeacherContainer.appendChild(submenuItem);
    } else {
      // Odd index goes to submenu-enrolled
      submenuEnrolledContainer.appendChild(submenuItem);
    }
  });

  changeFirstChar();
}
