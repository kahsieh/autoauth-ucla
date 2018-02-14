/*
AutoAuth for UCLA
auto-mfa.js

Kevin Hsieh
13 February 2018
*/

// -----------------------------------------------------------------------------
// Add "Enter Passcodes" button.
// -----------------------------------------------------------------------------

document.getElementsByClassName("base-body")[0].children[0].innerHTML +=
	"<input type='button' id='enter-passcodes' value='Enter Passcodes' />";
document.getElementById("enter-passcodes").onclick = () => getPasscodes(true);

// -----------------------------------------------------------------------------
// Page interaction.
// -----------------------------------------------------------------------------

document.getElementsByClassName("positive auth-button")[2].click();
document.getElementsByName("passcode")[0].disabled = true;
getPasscodes(false);

// -----------------------------------------------------------------------------
// Functions.
// -----------------------------------------------------------------------------

// Get passcodes from the browser storage and fill in the passcode if it's
// available. Display a prompt to enter and store new passcodes when
// resetPasscodes is true.
function getPasscodes(resetPasscodes) {
	browser.storage.local.get("passcodes").then(item => {
		let passcodes = Object.keys(item).length > 0 ? item["passcodes"] : null;
			// array of 10 strings, or null if not found
		if (resetPasscodes) {
			setPasscodes(passcodes ? passcodes : []);
		}
		else if (passcodes) {
			let next = document.getElementsByName("next-passcode")[0].value;
				// first number in the passcode we need
			if (next != "None") {
				let i = (parseInt(next) + 9) % 10;
				document.getElementsByName("passcode")[0].value = passcodes[i];
				document.getElementsByClassName("auth-button positive")[2]
					.click();
			}
		}
	}, error => console.log("AutoAuth: Storage error!"));
}

// Displays a prompt to enter and store new passcodes.
// currentPasscodes.join(" ") serves as the default value of the prompt.
function setPasscodes(currentPasscodes) {
	let passcodes = window.prompt("AutoAuth: Enter your next ten passcodes" +
		" separated by spaces:", currentPasscodes.join(" ")).split(" ");
	browser.storage.local.set({
		"passcodes": passcodes
	}).then(getPasscodes, error => console.log("AutoAuth: Storage error!"));
}
