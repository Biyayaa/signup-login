document.getElementById("login-box").style.display = "none";
let loading = document.getElementById("loading-div");
let loadingL = document.getElementById("loading-divL");
let fullName = document.getElementById("f-name");
let email = document.getElementById("user-email");
let signUpMessage = document.getElementById("signup-msg");
let password = document.getElementById("user-password");
let logInMessage = document.getElementById("login-msg");

let confirmPassword = document.getElementById("confirm-password");

loading.style.display = "none";
loadingL.style.display = "none";

function loginPage() {
  document.getElementById("sign-up-box").style.display = "none";
  document.getElementById("login-box").style.display = "block";
}

function signUpPage() {
  document.getElementById("sign-up-box").style.display = "block";
  document.getElementById("login-box").style.display = "none";
}

let myObj;

let registeredUser = [];

function signUp() {
  if (
    password.value === confirmPassword.value &&
    fullName.value != "" &&
    email.value != ""
  ) {
    myObj = {
      fullname: fullName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    // Check if there are already registered users in localStorage
    let registeredUsers = JSON.parse(localStorage.getItem("members")) || [];

    // Add the new user object to the array of registered users
    registeredUsers.push(myObj);

    // Save the updated array of registered users to localStorage
    localStorage.setItem("members", JSON.stringify(registeredUsers));

    signUpMessage.innerHTML = `
        <p id="success-msg">Sign up successful!!!</p>
        `;
    loading.style.display = "block";
    setTimeout(() => {
      document.getElementById("sign-up-box").style.display = "none";
      document.getElementById("login-box").style.display = "block";
      // document.getElementById("login-email").value = email.value;
      loading.style.display = "none";
      signUpMessage.style.display = "none";
    }, 3000);

    fullName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
  } else {
    signUpMessage.innerHTML = `
        <p id="failed-msg">Sign up failed!!!</p>
        `;
    setTimeout(() => {
      signUpMessage.style.display = "none";
    }, 3000);
  }
}


let loginPass = document.getElementById("loginPass");
let loginEm = document.getElementById("loginEm");
function login() {
  loading.style.display = "block";

  setTimeout(() => {
    loading.style.display = "none";

    // Get the email entered on the login page
  let loginEmail = loginEm.value;
  console.log(loginEmail);
  let loginPassword = loginPass.value;
  console.log(loginPass);
  // Get the array of registered users from localStorage
  let registeredUsers = JSON.parse(localStorage.getItem("members")) || [];
  console.log(registeredUsers);
  // Find the user object with the matching email
  let user = registeredUsers.find((members) => members.email === loginEmail && members.password === loginPassword);
  console.log(user);


  if (user) {
    // Redirect to the dashboard page
    window.location.href = "dashboard.html";

    window.localStorage.setItem('currentUser', JSON.stringify(user));

    // Display the user's full name on the dashboard page
    // let dashboardWelcome = document.getElementById('welcome');
    // dashboardWelcome.innerHTML = `<h1 class="dashboard-welcome">Welcome, ${user.fullname}!</h1>`;
  } else {
    logInMessage.innerHTML = `
      <p id="failed-msg">Login failed! Please check your email and password.</p>
    `;
    setTimeout(() => {
      logInMessage.style.display = "none";
    }, 3000);
  }
}, 3000);
}

let getter = "";
function getUserInfo() {
  getter = JSON.parse(localStorage.getItem("member"));
  console.log(getter);
}
getUserInfo();
