document.getElementById("get-request-btn").addEventListener("click", () => {
  fetch("https://apis.scrimba.com/bored/api/activity")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      document.getElementById("placeholder-api").textContent = res.activity;
    });
});
