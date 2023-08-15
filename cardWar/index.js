let deckId;

let computerScore = 0;
let myScore = 0;

const newDeckBtn = document.getElementById("new-deck-btn");
const drawCardBtn = document.getElementById("draw-card-btn");
const winnerText = document.getElementById("winner-txt");
const remainingCardText = document.getElementById("remaining-card-txt");
const myScoreEl = document.getElementById("my-score");
const computerScoreEl = document.getElementById("computer-score");

const handleClick = () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) =>
      res.json().then((data) => {
        deckId = data.deck_id;

        remainingCardText.textContent = `Remaining cards 52`;
        // Enable the draw card button after getting deckId

        drawCardBtn.disabled = false;
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

  const winner = (card1, card2) => {
    const valueOption = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "JACK",
      "QUEEN",
      "KING",
      "ACE",
    ];
    const card1ValueIndex = valueOption.indexOf(card1);
    const card2ValueIndex = valueOption.indexOf(card2);

    if (card1ValueIndex > card2ValueIndex) {
      computerScore++;
      computerScoreEl.textContent = `Computer score: ${computerScore}`;
      return "Computer Wins!";
    } else if (card1ValueIndex < card2ValueIndex) {
      myScore++;
      myScoreEl.textContent = `My score: ${myScore}`;
      return "I Win!";
    } else {
      return "Tie!";
    }
  };

  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      const cards = document.getElementById("cards-container");
      cards.children[0].innerHTML = `<img src="${data.cards[0].image}"/>`;
      cards.children[1].innerHTML = `<img src="${data.cards[1].image}"/>`;
      remainingCardText.textContent = `Remaining cards ${data.remaining}`;

      winnerText.textContent = winner(data.cards[0].value, data.cards[1].value);

      if (data.remaining === 0) {
        drawCardBtn.disabled = true; // Disable the draw card button
        if (computerScore > myScore) {
          winnerText.textContent = "Computer Win";
        } else if (myScore > computerScore) {
          winnerText.textContent = "You Win";
        } else {
          winnerText.textContent = "It's a tie game!";
        }
      }
    })
    .catch((error) => {
      console.error("Error drawing cards:", error);
    });
};

newDeckBtn.addEventListener("click", handleClick);
drawCardBtn.addEventListener("click", drawCard);
drawCardBtn.disabled = true; // Disable the draw card button initially
