# AutoAuth for UCLA
Speed up UCLA Single Sign-On.

**Update (May 2022): UCLA MFA no longer sends 10 SMS passcodes at a time, so this extension doesn't work anymore. I'd recommend using a security key to speed up MFA instead.**

This is a WebExtension designed for Firefox and Chrome. To install, please go
to Firefox Add-ons or the Chrome Web Store.

For Multi-Factor Authentication (MFA) users, you can give AutoAuth your next 10
SMS passcodes and it will automatically enter them until you need new
passcodes. AutoAuth also automatically checks "Remember me for 12 hours" when
it's available.

## Usage

Sign in normally. On the MFA screen, if AutoAuth prompts you to enter new
passcodes, then press "Text me new codes" and enter the 10 passcodes you
receive. It's recommended that you use Google Voice or iMessage in order to
easily copy-paste the codes, and that you continue using Duo Push when away
from your primary computer.

Firefox only: AutoAuth also automatically signs in with your UCLA Logon ID and
UCLA Logon Password if your browser is set to fill them in automatically.

Uses graphic(s) from [Material Design](https://material.io/icons/).

Copyright © 2018 Kevin Hsieh. All Rights Reserved. 
