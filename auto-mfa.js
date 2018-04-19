/*
AutoAuth for UCLA
auto-mfa.js

Kevin Hsieh
13 February 2018
*/

function gebId(str) { return document.getElementById(str); }
function gebName(str) { return document.getElementsByName(str); }
function gebClass(str) { return document.getElementsByClassName(str); }

setTimeout(() => {
    // Click "Enter a Passcode".
    if (gebClass("positive auth-button").length == 0) {
        // console.log("AutoAuth: Not an MFA page");
        return;
    }
    let authButtons = gebClass("positive auth-button");
    authButtons[authButtons.length - 1].click();

    // Add "Enter Passcodes" button.
    if (!gebId("login-form")) {
        console.log("AutoAuth: Login form not found");
        return;
    }
    gebId("login-form").innerHTML +=
        "<input type='button' id='enter-passcodes' value='Enter Passcodes' />" +
        "<p id='autoauth-message' align='center'></p>";
    gebId("enter-passcodes").onclick = () => setPasscodes();

    // Check "Remember me for 12 hours".
    if (gebName("dampen_choice").length == 0) {
        console.log("AutoAuth: 'Remember me for 12 hours' checkbox not found");
        // Don't return just because this checkbox isn't present.
    }
    else {
        gebName("dampen_choice")[0].checked = true;
    }

    // Insert passcode.
    if (gebName("passcode").length == 0) {
        console.log("AutoAuth: Passcode field not found");
        return;
    }
    gebName("passcode")[0].disabled = true;
    autoFill(false);
}, 100);

/**
 * Retrieves and fills in the passcode.
 * 
 * @param {boolean} doneReset Directly insert the first stored passcode.
 */
function autoFill(doneReset) {
    browser.storage.sync.get().then(item => {
        let passcodes = item.hasOwnProperty("passcodes") ?
            item["passcodes"] : null;
            // Array of 10 strings (null if not found).
        let lastUsed = item.hasOwnProperty("lastUsed") ?
            item["lastUsed"] : Infinity;
            // Index of last used passcode (Infinity if not found).
        let next = gebName("next-passcode").length > 0 ?
            parseInt(gebName("next-passcode")[0].value) : NaN;
            // First number of the passcode we need (NaN if not found).
        let next_i = !isNaN(next) ?
            (next + 9) % 10 : doneReset ? 0 : -1;
            // Index of the passcode we need (-1 if unknown).
        if (passcodes && next_i > lastUsed) {
            gebName("passcode")[0].value = passcodes[next_i];
            if (gebClass("auth-button positive").length == 0) {
                console.log("AutoAuth: Auth button not found");
                return;
            }
            setLastUsed(next_i);
            console.log("AutoAuth: Auto MFA using passcode " + next_i);
            let authButtons = gebClass("auth-button positive");
            authButtons[authButtons.length - 1].click();
        }
        else {
            gebId("autoauth-message").innerHTML =
                "Please enter new passcodes.";
        }
    }, error => console.log("AutoAuth: Storage error"));
}

/**
 * Displays a prompt to enter new passcodes.
 */
function setPasscodes() {
    let passcodes = window.prompt("Enter the ten passcodes from your most" +
        " recent MFA SMS message (separated by spaces):", "").trim().split(" ");
    if (passcodes.length != 10) {
        gebId("autoauth-message").innerHTML =
            "Invalid entry. Please try again.";
    }
    else {
        browser.storage.sync.set({
            "passcodes": passcodes,
            "lastUsed": -1
        }).then(() => autoFill(true),
                e => console.log("AutoAuth: Storage error"));
    }
}

/**
 * Stores the index of the last used passcode.
 * 
 * @param {number} value 
 */
function setLastUsed(value) {
    browser.storage.sync.set({
        "lastUsed": value
    }).then(null,
            e => console.log("AutoAuth: Storage error"));
}
