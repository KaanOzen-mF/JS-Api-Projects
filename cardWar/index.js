let deckId;

const handleClick = () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) =>
      res.json().then((data) => {
        deckId = data.deck_id;
        console.log(deckId);
        // Enable the draw card button after getting deckId
        document.getElementById("draw-card-btn").disabled = false;
      })
    )
    .catch((error) => {
      console.error("Error fetching new deck:", error);
    });
};

const drawCard = () => {
  if (!deckId) {
    return; // Don't do anything if deckId is empty
  }

  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      const cards = document.getElementById("cards-container");
      cards.innerHTML = `
      <div id="card-one"><img src="${data.cards[0].image}"/></div>
      <div id="card-two"><img src="${data.cards[1].image}"/></div>
      
      `;
    })
    .catch((error) => {
      console.error("Error drawing cards:", error);
    });
};

document.getElementById("new-deck-btn").addEventListener("click", handleClick);

document.getElementById("draw-card-btn").addEventListener("click", drawCard);
document.getElementById("draw-card-btn").disabled = true; // Disable the draw card button initially
