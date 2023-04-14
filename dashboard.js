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

// Get the array of blog posts from localStorage or create an empty array if it doesn't exist
let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

// Opens the create post
function makePost() {
  newPost.style.display = "block";
  blogPost.style.display = "none";
}

// Creates the post and opens view posts
function sendPost() {
  let post = {
    title: postTitleInput.value,
    content: postContent.value,
    author: currentUser.username,
    time: new Date().toLocaleString(),
    likes: 0
  };
  blogPosts.push(post);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  viewFeed();
}

// Shows the details of the blog post made
function viewFeed() {
  let blogPost = document.getElementById("blogPost");
  let postsHTML = "";
  blogPosts.forEach((post, i) => {
    postsHTML += `
      <div>
        <h1 class="post-title">${post.title}</h1>
        <p>${post.content}</p>
        <p>Author: ${post.author}</p>
        <p>Time: ${post.time}</p>
        <p>Likes: ${post.likes}</p>
        <button onclick="likePost(${i})">Like</button>
      </div>
    `;
  });
  blogPost.innerHTML = postsHTML;

  // Displays the blog posts made
  blogPost.style.display = "block";
  newPost.style.display = "none";
}

// Shows the details of the current user's blog posts
function viewMyPosts() {
  let blogPost = document.getElementById("blogPost");
  let postsHTML = "";
  blogPosts.forEach((post, i) => {
    if (post.author === currentUser.username) {
      postsHTML += `
        <div>
          <h1 class="post-title">${post.title}</h1>
          <p>${post.content}</p>
          <p>Author: ${post.author}</p>
          <p>Time: ${post.time}</p>
          <p>Likes: ${post.likes}</p>
          <button onclick="likePost(${i})">Like</button>
          <button onclick="deletePost(${i})">Delete</button>
        </div>
      `;
    }
  });
  blogPost.innerHTML = postsHTML;

  // Displays the blog posts made
  blogPost.style.display = "block";
  newPost.style.display = "none";
}

// Increments or decrements the number of likes for a post
function likePost(index) {
  let post = blogPosts[index];
  if (!post.likesBy) {
    post.likesBy = [];
  }
  if (post.likesBy.includes(currentUser.username)) {
    post.likes--;
    post.likesBy.splice(post.likesBy.indexOf(currentUser.username), 1);
  } else {
    post.likes++;
    post.likesBy.push(currentUser.username);
  }
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  viewFeed();
}

// Deletes a post
function deletePost(index) {
  blogPosts.splice(index, 1);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  viewMyPosts();
}

// Handle the logout process
logoutBtn.addEventListener("click", () => {
  // Remove the current user from localStorage and redirect to the login page
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});