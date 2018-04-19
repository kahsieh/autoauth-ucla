/*
AutoAuth for UCLA
auto-user.js

Kevin Hsieh
13 February 2018
*/

function gebId(str) { return document.getElementById(str); }
function gebName(str) { return document.getElementsByName(str); }
function gebClass(str) { return document.getElementsByClassName(str); }

setTimeout(() => {
    if (!gebId("logon") || gebClass("primary-button").length == 0) {
        // console.log("AutoAuth: Not a primary authentication page");
        return;
    }
    if (gebId("logon").value != "") {
        console.log("AutoAuth: Auto sign-in")
        gebClass("primary-button")[0].click();
    }
}, 100);
