const searchInput = document.getElementById('searchInput');
const storiesContainer = document.getElementById('storiesContainer');
const postsContainer = document.getElementById('postsContainer');

// Sample data for stories and posts (replace with your own data from backend)
const stories = [
  {
    id: 1,
    imageUrl: 'images/story1.jpg',
    user: 'user1',
  },
  // Add more stories here
];

const posts = [
  {
    id: 1,
    imageUrl: 'images/post1.jpg',
    caption: 'Beautiful scenery! #nature',
    likes: 120,
    comments: [
      { username: 'user1', text: 'Awesome!' },
      { username: 'user2', text: 'Love it!' }
    ]
  },
  // Add more posts here
];

// Function to create a single story element
function createStoryElement(story) {
  const storyElement = document.createElement('div');
  storyElement.classList.add('story');

  storyElement.innerHTML = `
    <img src="${story.imageUrl}" alt="${story.user}" title="${story.user}">
  `;

  return storyElement;
}

// Function to render all stories
function renderStories() {
  storiesContainer.innerHTML = '';

  stories.forEach(story => {
    const storyElement = createStoryElement(story);
    storiesContainer.appendChild(storyElement);
  });
}

// Function to create a single post element
function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');
  postElement.dataset.postId = post.id;

  postElement.innerHTML = `
    <img src="${post.imageUrl}" alt="Post">
    <p>${post.caption}</p>
    <button class="like-btn" onclick="handleLike(${post.id})">${post.likes} Likes</button>
  `;

  const commentsList = document.createElement('ul');
  commentsList.classList.add('comments');

  post.comments.forEach(comment => {
    const commentItem = document.createElement('li');
    commentItem.innerHTML = `<strong>${comment.username}</strong> ${comment.text}`;
    commentsList.appendChild(commentItem);
  });

  postElement.appendChild(commentsList);

  return postElement;
}

// Function to render all posts or filtered posts
function renderPosts(filteredPosts = null) {
  postsContainer.innerHTML = '';

  const postsToRender = filteredPosts || posts;

  postsToRender.forEach(post => {
    const postElement = createPostElement(post);
    postsContainer.appendChild(postElement);

    // Add color palette for each post
    const colorPaletteElement = createColorPalette(post.imageUrl, post.colors);
    postElement.appendChild(colorPaletteElement);
  });
}

// Function to handle like button click
function handleLike(postId) {
  const post = posts.find(post => post.id === postId);
  if (post) {
    post.likes += 1;
    renderPosts();
  }
}

// Function to extract colors from an image
function extractColorsFromImage(imageUrl) {
  // For demonstration purposes, we will use random colors.
  // In a real implementation, you would need a color extraction algorithm or library.
  const randomColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

  return randomColors;
}

// Function to create the color palette for a post
function createColorPalette(imageUrl, colors) {
  const paletteElement = document.createElement('div');
  paletteElement.classList.add('color-palette');

  const paletteColors = colors.map(color => `<div class="palette-color" style="background-color: ${color};"></div>`).join('');

  paletteElement.innerHTML = `
    <div class="image-with-palette">
      <img src="${imageUrl}" alt="Post">
      <div class="colors">${paletteColors}</div>
    </div>
  `;

  return paletteElement;
}

// Function to filter posts based on hashtags
function searchPosts() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Filter posts with matching hashtags
  const filteredPosts = posts.filter(post => {
    const hashtags = post.caption.toLowerCase().split(' ');
    return hashtags.includes(`#${searchTerm}`);
  });

  // Render the filtered posts
  renderPosts(filteredPosts);
}

// Initial rendering of stories and posts
renderStories();
renderPosts();
