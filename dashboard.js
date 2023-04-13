// import { user } from "./script.js";
let dashboard = document.getElementById("dashboard");

let dashboardWelcome = document.getElementById("welcome");

// Get the welcome div and the logout button
let welcomeDiv = document.getElementById("welcome");
let logoutBtn = document.getElementById("logout-btn");

// Get the current user information from localStorage
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// If there is no current user, redirect to the login page
if (!currentUser) {
  alert("you are not authorized to view this page, log in first");
  dashboard.style.display = "none";
  window.location.href = "index.html";
}

// Display the welcome message with the current user's name
dashboardWelcome.innerHTML = `Welcome, ${currentUser.username}!`;

// Hides the blogPost page on log in
blogPost.style.display = "none";

let newPost = document.getElementById("newPost");
let postTitleInput = document.getElementById("postTitleInput");
let postContent = document.getElementById("postContent");


function makePost() {
    newPost.style.display = "block";
    blogPost.style.display = "none";
    postTitleInput.value = "";
    postContent.value = "";
}

// Creates the post and opens view posts
function sendPost() {
  console.log(postTitleInput.value);
  console.log(postContent.value);
  viewPosts();
}

// Shows the details of the blog post made
function viewPosts() {
  let blogPost = document.getElementById("blogPost");
  // This contains all the posts made
  blogPost.innerHTML = `<div> <h1 class="post-title">${postTitleInput.value}</h1>
<p>${postContent.value}</p>
    </div>`;

  // Displays the blog posts made
  blogPost.style.display = "block";
  newPost.style.display = "none";

  console.log(blogPost);
}

// Handle the logout process
logoutBtn.addEventListener("click", () => {
  // Remove the current user from localStorage and redirect to the login page
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});
