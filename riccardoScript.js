// ==UserScript==
// @name        ricardo
// @namespace   ricardo
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

$(document).ready(function () {
    waitForElm(".card--2wTIL").then((elm) => {
        const state = localStorage.getItem('storedData');
        let data = [];
        if (state) {
            data = [...JSON.parse(state)];
        } else {
            console.log("empty")
        }
        // Get a reference to the parent element
        const parentDiv1 = document.querySelector('.jss11');

        // Create a new dropdown element
        const dropdown = document.createElement('select');
        dropdown.id = "selectDropdown"


        const titleOption = document.createElement('option');
        titleOption.textContent = 'Select an option';
        titleOption.disabled = true;
        dropdown.appendChild(titleOption);

        // Create and append option elements to the dropdown
        data.forEach(option => {
            console.log(option)
            const optionElement = document.createElement('option');
            optionElement.value = option[3];
            optionElement.textContent = option[3];
            dropdown.appendChild(optionElement);
        });

        // Set the default value for the dropdown
        dropdown.value = ''; // No default value

        // Insert the dropdown after the parent div
        parentDiv1.insertAdjacentElement('afterend', dropdown);

        document.getElementById("selectDropdown").onchange = function () {
            onSelect(data);
            $("#selectDropdown").on('blur', (e) => (e.target.value = 'Select'));
        }

        // Get a reference to the parent element
        const parentDiv = document.querySelector('.card--2wTIL');

        // Define the HTML content for the button
        const buttonHTML = '<button id="myButtonClass">Save</button>';

        const inputHTML = '<input type="text" id="dropdownValue" placeholder="category name"/>'

        // Insert the button HTML after the parent div
        parentDiv.insertAdjacentHTML('afterend', buttonHTML);
        parentDiv.insertAdjacentHTML('afterend', inputHTML);


        document.getElementById("myButtonClass").onclick = function () {
            // Get the title value
            const titleValue = document.getElementById("Title").value
            console.log(titleValue)

            const divElement1 = document.querySelector('.ql-editor');

            // Get the text content of the div element
            const textContent = divElement1.textContent.trim();

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

            const categoryName = document.getElementById("dropdownValue").value

            data.push([titleValue, textContent, selectedValue, categoryName])
            localStorage.setItem('storedData', JSON.stringify(data));
            console.log(data)
            // Log the selected value
            console.log(selectedValue);
        }


    })
})

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true, subtree: true
        });
    });
}

function onSelect(data) {
    const dropdown = document.querySelector('select');


    const selectedIndex = dropdown.selectedIndex - 1;
    console.log(selectedIndex);



    // Example usage: Set value of the Material-UI input field
    simulateReactInput('#Title', data[selectedIndex][0]);


    // Get the Quill editor container element
    const quillEditor = document.querySelector('.ql-editor');

    // Set the new value
    quillEditor.textContent = data[selectedIndex][1];
}

// Function to simulate typing into an input field managed by React
function simulateReactInput(selector, value) {
    const input = document.querySelector(selector);
    if (!input) return;

    // Set the value
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, value);

    // Dispatch a 'input' event
    const inputEvent = new Event('input', { bubbles: true });
    input.dispatchEvent(inputEvent);

    // Dispatch a 'change' event for React components
    const changeEvent = new Event('change', { bubbles: true });
    input.dispatchEvent(changeEvent);
}
