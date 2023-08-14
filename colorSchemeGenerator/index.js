document.getElementById("color").addEventListener("change", function () {
  var selectedColor = this.value;
  this.style.backgroundColor = selectedColor; // Set the background color of the select element
});

const form = document.getElementById("color-form");
const colorSelect = document.getElementById("color");
const modeSelect = document.getElementById("mode");
const colorPicker = document.getElementById("color-picker-body");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let selectedColor = colorSelect.value.replace("#", "");
  const selectedMode = modeSelect.value;

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMode}&count=6`
  )
    .then((res) => res.json())
    .then((color) => generateColorPalette(color));
});

const generateColorPalette = (color) => {
  colorPicker.innerHTML = "";
  const colorsData = color.colors;
  colorsData.forEach((colorInfo) => {
    const colorContainer = document.createElement("div");
    colorContainer.classList.add("color-container");
    colorContainer.style.backgroundColor = colorInfo.hex.value;

    const colorCode = document.createElement("div");
    colorCode.classList.add("color-code");
    colorCode.textContent = colorInfo.hex.value;

    colorContainer.appendChild(colorCode);
    colorPicker.appendChild(colorContainer);

    colorContainer.addEventListener("click", () => {
      copyToClipboard(colorInfo.hex.value);
    });
  });
};

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
