// Hide the login page on load of the page
document.getElementById("sign-up-box").style.display = "none";

// Get the necessary elements from the HTML document
let loginBox = document.getElementById("login-box");
let signUpBox = document.getElementById("sign-up-box");
let loadingDiv = document.getElementById("loading-div");
let loadingDivL = document.getElementById("loading-divL");
let userNameInput = document.getElementById("user-name");
let emailInput = document.getElementById("user-email");
let passwordInput = document.getElementById("user-password");
let confirmPasswordInput = document.getElementById("confirm-password");
let signUpMessage = document.getElementById("signup-msg");
let loginEmailInput = document.getElementById("loginEm");
let loginPasswordInput = document.getElementById("loginPass");
let loginMessage = document.getElementById("login-msg");

// Hide the loading divs by default
loadingDiv.style.display = "none";
loadingDivL.style.display = "none";

// Show the login box and hide the sign up box
function loginPage() {
  signUpBox.style.display = "none";
  loginBox.style.display = "block";
}

// Show the sign up box and hide the login box
function signUpPage() {
  signUpBox.style.display = "block";
  loginBox.style.display = "none";
}

// Handle the sign up process
function signUp() {
  // Check if the password and confirm password fields match and the Username and email fields are not empty
  if (
    passwordInput.value === confirmPasswordInput.value &&
    userNameInput.value != "" &&
    emailInput.value != ""
  ) {
    // Create a user object with the input values
    let user = {
      username: userNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      confirmPassword: confirmPasswordInput.value,
    };

    // Get the array of registered users from localStorage or create an empty array if it doesn't exist
    let registeredUsers = JSON.parse(localStorage.getItem("members")) || [];

    // Add the new user object to the array of registered users
    registeredUsers.push(user);

    // Save the updated array of registered users to localStorage
    localStorage.setItem("members", JSON.stringify(registeredUsers));

    // Display a success message and hide the sign up box after 3 seconds
    signUpMessage.innerHTML = `
      <p id="success-msg">Sign up successful!!!</p>
    `;
    loadingDiv.style.display = "block";
    setTimeout(() => {
      signUpBox.style.display = "none";
      loginBox.style.display = "block";
      loadingDiv.style.display = "none";
      signUpMessage.style.display = "none";
    }, 3000);

    // Clear the input fields
    userNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";
  } else {
    // Display a failure message if the input values are invalid
    signUpMessage.innerHTML = `
      <p id="failed-msg">Sign up failed!!!</p>
    `;
    setTimeout(() => {
      signUpMessage.style.display = "none";
    }, 3000);
  }
}

// Handle the login process
function login() {
  // Show the loading div
  loadingDivL.style.display = "block";

  setTimeout(() => {
    // Hide the loading div after 3 seconds
    loadingDivL.style.display = "none";

    // Get the email and password entered on the login page
    let loginEmail = loginEmailInput.value;
    let loginPassword = loginPasswordInput.value;

    // Get the array of registered users from localStorage or create an empty array if it doesn't exist
    let registeredUsers = JSON.parse(localStorage.getItem("members")) || [];

    // Find the user object with the matching email and password
    let user = registeredUsers.find(
      (member) =>
        member.email === loginEmail && member.password === loginPassword
    );

    if (user) {
      // Redirect to the dashboard page and store the current user in localStorage
      window.location.href = "dashboard.html";
      window.localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      // Display a failure message if the login credentials are invalid
      loginMessage.innerHTML = `
        <p id="failed-msg">Login failed! Please check your email and password.</p>
      `;
      setTimeout(() => {
        loginMessage.style.display = "none";
      }, 3000);
    }
  }, 3000);
}

// Get the current user information from localStorage
function getUserInfo() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
}

getUserInfo();