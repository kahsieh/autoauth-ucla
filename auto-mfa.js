/*
AutoAuth for UCLA
auto-mfa.js

Kevin Hsieh
13 February 2018
*/

setTimeout(() => {
	// Add "Enter Passcodes" button.
	document.getElementsByClassName("base-body")[0].children[0].innerHTML +=
		"<input type='button' id='enter-passcodes' value='Enter Passcodes' />";
	document.getElementById("enter-passcodes").onclick =
		() => getPasscodes(true);

	// Page interaction.
	let authButtons = document.getElementsByClassName("positive auth-button");
	authButtons[authButtons.length - 1].click();
	document.getElementsByName("passcode")[0].disabled = true;
	getPasscodes();
}, 100);

// Retrieves and fills in the passcode.
// resetPasscodes: Displays a prompt to enter and store new passcodes.
// ignoreMissingNext: Inserts the first passcode if next can't be found.
function getPasscodes(resetPasscodes = false, ignoreMissingNext = false) {
	browser.storage.local.get().then(item => {
		let passcodes =
			item.hasOwnProperty("passcodes") ? item["passcodes"] : null;
			// An array of 10 strings, or null if not found.
		let lastUsed =
			item.hasOwnProperty("lastUsed") ? item["lastUsed"] : Infinity;
			// The index of the last used passcode.
		let next =
			parseInt(document.getElementsByName("next-passcode")[0].value);
			// The first number of the passcode we need.
		let next_i = !isNaN(next) ? (next + 9) % 10 :
			ignoreMissingNext ? 0 : -1;
			// The index of the passcode we need, or -1 if unknown.
		if (resetPasscodes) {
			setPasscodes(passcodes ? passcodes : []);
		}
		else if (passcodes && next_i > lastUsed) {
			document.getElementsByName("passcode")[0].value = passcodes[next_i];
			document.getElementsByClassName("auth-button positive")[2].click();
			setLastUsed(next_i);
		}
	}, error => console.log("AutoAuth: Storage error!"));
}

// Displays a prompt to enter and store new passcodes.
// currentPasscodes.join(" ") serves as the default value of the prompt.
function setPasscodes(currentPasscodes) {
	let passcodes = window.prompt("AutoAuth: Enter your next ten passcodes" +
		" separated by spaces:", currentPasscodes.join(" ")).split(" ");
	browser.storage.local.set({
		"passcodes": passcodes,
		"lastUsed": -1
	}).then(() => getPasscodes(false, true),
		error => console.log("AutoAuth: Storage error!"));
}

// Stores the index of the last used passcode.
function setLastUsed(value) {
	browser.storage.local.set({
		"lastUsed": value
	}).then(null, error => console.log("AutoAuth: Storage error!"));
}
