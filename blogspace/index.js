let postArray = [];

function renderPost() {
  let html = "";
  for (let post of postArray) {
    html += `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr />
    `;
  }
  document.getElementById("post-container").innerHTML = html;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((res) => {
    postArray = res.slice(1, 5);
    renderPost();
  });

document.getElementById("new-post").addEventListener("submit", (e) => {
  e.preventDefault();
  const postTitle = document.getElementById("post-title").value;
  const postBody = document.getElementById("post-body").value;
  const data = {
    title: postTitle,
    body: postBody,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      postArray.unshift(post);
      renderPost();
    });
});
