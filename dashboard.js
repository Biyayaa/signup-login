// Get references to HTML elements
let dashboard = document.getElementById("dashboard");
let dashboardWelcome = document.getElementById("welcome");
let welcomeDiv = document.getElementById("welcome");
let logoutBtn = document.getElementById("logout-btn");

// Get the current user from local storage
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Check if the user is logged in, redirect to login page if not
if (!currentUser) {
  alert("You are not authorized to view this page. Please log in first.");
  window.location.href = "index.html";
}

// Display a welcome message with the user's username
dashboardWelcome.innerHTML = `Welcome, ${currentUser.username}!`;

// Get references to HTML elements for displaying blog posts
let blogPost = document.getElementById("blogPost");
blogPost.style.display = "none";

// Get references to HTML elements for creating new blog posts
let newPost = document.getElementById("newPost");
let postTitleInput = document.getElementById("postTitleInput");
let postContent = document.getElementById("postContent");

// Get the list of blog posts from local storage, or create an empty array if none exists
let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

// Function to display the form for creating a new blog post
function makePost() {
  newPost.style.display = "block";
  blogPost.style.display = "none";
}

// make the file input and delete image button hidden
let fileInput = document.getElementById("file");
fileInput.style.display = "none";
let deleteImageBtn = document.getElementById("delete-image-btn");
deleteImageBtn.style.display = "none";


// function to attach picture to the blog post
function toggleImageInput() {
  let fileInput = document.getElementById("file");
  let attachImageBtn = document.getElementById("attach-image-btn");
  let previewImg = document.getElementById("previewImg");
  let deleteImageBtn = document.getElementById("delete-image-btn");
  if (fileInput.style.display === "none") {
    fileInput.style.display = "block";
    attachImageBtn.innerHTML = "Cancel";
    previewImg.style.display = "none";
    deleteImageBtn.style.display = "none";
  } else {
    fileInput.style.display = "none";
    attachImageBtn.innerHTML = "Attach Image";
    previewImg.style.display = "none";
    deleteImageBtn.style.display = "none";
  }
}

// function to preview attached image
function previewImage() {
  let fileInput = document.getElementById("file");
  let previewImg = document.getElementById("previewImg");
  let deleteImageBtn = document.getElementById("delete-image-btn");
  if (fileInput.files && fileInput.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
      deleteImageBtn.style.display = "block";
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}

// function to delete attached image
function deleteImage() {
  let fileInput = document.getElementById("file");
  let previewImg = document.getElementById("previewImg");
  let deleteImageBtn = document.getElementById("delete-image-btn");
  fileInput.value = "";
  previewImg.src = "";
  previewImg.style.display = "none";
  deleteImageBtn.style.display = "none";
}

// Function to create a new blog post and add it to the list of posts
function sendPost() {
  let fileInput = document.getElementById("file");
  let post = {
    title: postTitleInput.value,
    content: postContent.value,
    author: currentUser.username,
    time: new Date().toLocaleString(),
    likes: 0,
    image: null
  };
  if (fileInput.files && fileInput.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      post.image = e.target.result;
      blogPosts.push(post);
      localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
      postTitleInput.value = "";
      postContent.value = "";
      fileInput.value = "";
      viewFeed();
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    blogPosts.push(post);
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
    postTitleInput.value = "";
    postContent.value = "";
    fileInput.value = "";
    previewImg.style.display = "none";
    viewFeed();
  }
}

// Function to display all blog posts
function viewFeed() {
  let postsHTML = "";
  if (blogPosts.length === 0) {
    postsHTML = "<p>No posts made.</p>";
  } else {
    blogPosts.forEach((post, i) => {
      let likeBtnText =
        post.likesBy && post.likesBy.includes(currentUser.username)
          ? "Unlike"
          : "Like";
      let imageHTML = post.image
        ? `<img src="${post.image}" alt="Post image" class="post-image">`
        : "";
      postsHTML += `
        <div id="postdata">
          <h1 class="post-title">${post.title}</h1>
          <p>${post.content}</p>
          ${imageHTML}
          <div id="postinfo">
          <p>Author: ${post.author}</p>
          <p>Time: ${post.time}</p>
          <p>Likes: <span id="likes-${i}">${post.likes}</span></p>
          <button onclick="likePost(${i})">${likeBtnText}</button></div>
        </div>
      `;
    });
  }
  blogPost.innerHTML = postsHTML;
  blogPost.style.display = "block";
  newPost.style.display = "none";
}

// Function to display only the current user's blog posts
function viewMyPosts() {
  let postsHTML = "";
  if (blogPosts.length === 0) {
    postsHTML = `<button onclick="makePost()">Make a post</button>`;
  } else {
    blogPosts.forEach((post, i) => {
      if (post.author === currentUser.username) {
        let likeBtnText =
          post.likesBy && post.likesBy.includes(currentUser.username)
            ? "Unlike"
            : "Like";
            let imageHTML = post.image
        ? `<img src="${post.image}" alt="Post image" class="post-image">`
        : "";
        postsHTML += `
          <div>
            <h1 class="post-title">${post.title}</h1>
            <p>${post.content}</p>
            ${imageHTML}
            <p>Author: ${post.author}</p>
            <p>Time: ${post.time}</p>
            <p>Likes: <span id="likes-${i}">${post.likes}</span></p>
            <button onclick="likePost(${i})">${likeBtnText}</button>
            <button onclick="deletePost(${i})">Delete</button>
          </div>
        `;
      }
    });
    if (postsHTML === "") {
      postsHTML = "<p>You have not made any posts.</p>";
    }
    postsHTML += `<button onclick="makePost()">Create a post</button>`;
  }
  blogPost.innerHTML = postsHTML;
  blogPost.style.display = "block";
  newPost.style.display = "none";
}

// Function to display only the blog posts that the current user has liked
function viewLikedPosts() {
  let postsHTML = "";
  if (blogPosts.length === 0) {
    postsHTML = "<p>No liked posts.</p>";
  } else {
    let likedPosts = blogPosts.filter(
      (post) => post.likesBy && post.likesBy.includes(currentUser.username)
    );
    if (likedPosts.length === 0) {
      postsHTML = "<p>You have not liked any posts.</p>";
    } else {
      likedPosts.forEach((post, i) => {
        let likeBtnText = "Unlike";
        postsHTML += `
          <div>
            <h1 class="post-title">${post.title}</h1>
            <p>${post.content}</p>
            <p>Author: ${post.author}</p>
            <p>Time: ${post.time}</p>
            <p>Likes: <span id="likes-${i}">${post.likes}</span></p>
            <button onclick="likePost(${i})">${likeBtnText}</button>
          </div>
        `;
      });
    }
  }
  blogPost.innerHTML = postsHTML;
  blogPost.style.display = "block";
  newPost.style.display = "none";
}

// function to like or unlike post
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
  document.getElementById(`likes-${index}`).innerHTML = post.likes;
}

function deletePost(index) {
  blogPosts.splice(index, 1);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  viewMyPosts();
}

// logs out current user
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

// Show the feed page on load
viewFeed();
