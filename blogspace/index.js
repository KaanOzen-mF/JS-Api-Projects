fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((res) => {
    const posts = res.slice(1, 5);
    for (let i = 0; i < posts.length; i++) {
      document.getElementById(
        "post-container"
      ).innerHTML += `<h2>${posts[i].title}</h2>
                      <p>${posts[i].body}</p>
                      <hr>
                      `;
    }
  });

document.getElementById("new-post").addEventListener("sumbit", (e) => {
  e.preventDefault();
  const postTitle = document.getElementById("post-title").value;
  const postBody = document.getElementById("post-body").value;
  const data = {
    title: postTitle,
    body: postBody,
  };
  console.log(data);
});
