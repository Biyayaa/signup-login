// import { user } from "./script.js";

// let dashboardWelcome = document.getElementById("welcome");
// dashboardWelcome.innerHTML = `<h1 class="dashboard-welcome"> Welcome, ${user.fullname}! <h1>`;


let currentUser = JSON.parse(window.localStorage.getItem('currentUser'));

let dashboardWelcome = document.getElementById('welcome');
dashboardWelcome.innerHTML = `<h1 class="dashboard-welcome">Welcome, ${currentUser.fullname}!</h1>`;