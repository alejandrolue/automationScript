// ==UserScript==
// @name        riccardo
// @namespace   riccardo
// @match       https://www.ricardo.ch/de/list/
// @grant       none
// @version     1.0
// @author      Alejandro Lüthi
// @require https://code.jquery.com/jquery-3.2.1.min.js
// @require http://userscripts-mirror.org/scripts/source/107941.user.js
// @grant GM_setValue
// @grant GM_getValue
// @description 26/02/2024, 20:21:07
// ==/UserScript==

document.getElementById("Title").value

const divElement = document.querySelector('.ql-editor');

// Get the text content of the div element
const textContent = divElement.textContent.trim();

console.log(textContent);

// Get all radio buttons within the div
const radioButtons = document.querySelectorAll('input[type="radio"][name="pick-product type"]');

// Initialize a variable to store the selected value
let selectedValue = '';

// Loop through each radio button
radioButtons.forEach(radioButton => {
    // Check if the radio button is checked
    if (radioButton.checked) {
        // If checked, update the selectedValue variable with its value
        selectedValue = radioButton.value;
    }
});

// Log the selected value
console.log(selectedValue);

// Create a new select element
const selectElement = document.createElement('select');
selectElement.classList.add('custom-dropdown');

// Define the options for the dropdown
const options = [
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' }
];

// Create and append options to the select element
options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.textContent = option.text;
    optionElement.value = option.value;
    selectElement.appendChild(optionElement);
});

// Find the div element after which you want to insert the dropdown
const divElement = document.querySelector('.MuiGrid-root.MuiGrid-container.css-1b1jvye');

// Insert the select element after the div element
divElement.parentNode.insertBefore(selectElement, divElement.nextSibling);
<select class=​"custom-dropdown">​…​</select>​