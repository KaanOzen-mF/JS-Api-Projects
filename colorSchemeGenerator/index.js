// Event listener for the color input field
document.getElementById("color").addEventListener("change", function () {
  var selectedColor = this.value;
  this.style.backgroundColor = selectedColor; // Set the background color of the select element
});

// Getting references to various elements in the HTML
const form = document.getElementById("color-form");
const colorSelect = document.getElementById("color");
const modeSelect = document.getElementById("mode");
const colorPicker = document.getElementById("color-picker-body");

// Event listener for the form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Extracting selected color and mode
  let selectedColor = colorSelect.value.replace("#", "");
  const selectedMode = modeSelect.value;

  // Fetching color scheme data from an external API
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMode}&count=6`
  )
    .then((res) => res.json())
    .then((color) => generateColorPalette(color));
});

// Function to generate color palette
const generateColorPalette = (color) => {
  colorPicker.innerHTML = "";
  const colorsData = color.colors;
  colorsData.forEach((colorInfo) => {
    // Creating a container for each color
    const colorContainer = document.createElement("div");
    colorContainer.classList.add("color-container");
    colorContainer.style.backgroundColor = colorInfo.hex.value;

    // Displaying color code
    const colorCode = document.createElement("div");
    colorCode.classList.add("color-code");
    colorCode.textContent = colorInfo.hex.value;

    colorContainer.appendChild(colorCode);
    colorPicker.appendChild(colorContainer);

    // Adding event listener to copy color code to clipboard
    colorContainer.addEventListener("click", () => {
      copyToClipboard(colorInfo.hex.value);
      alert(`${colorInfo.hex.value} copy to clipboard`);
    });
  });
};

// Function to copy text to clipboard
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Color code copied to clipboard:", text);
    })
    .catch((err) => {
      console.error("Failed to copy color code to clipboard:", err);
    });
}
