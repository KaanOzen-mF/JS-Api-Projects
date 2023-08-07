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
