/*
AutoAuth for UCLA
auto-user.js

Kevin Hsieh
13 February 2018
*/

setTimeout(() => {
    if (document.getElementById("logon").value != "") {
		document.getElementsByClassName("primary-button")[0].click();
	}
}, 100);
