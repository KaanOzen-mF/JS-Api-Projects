document.getElementById("get-request-btn").addEventListener("click", () => {
  fetch("https://apis.scrimba.com/bored/api/activity")
    .then((res) => res.json())
    .then((res) => {
      if ((res.participants = 1)) {
        const activity = res.activity;
        document.getElementById(
          "placeholder-api"
        ).textContent = `You can do alone ${activity.toLowerCase()}`;
      } else {
        document.getElementById(
          "placeholder-api"
        ).textContent = `You have to ${res.participants} people to do ${res.activity}`;
      }
    });
});
