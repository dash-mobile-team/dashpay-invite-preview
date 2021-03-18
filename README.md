# dashpay-invite-preview
System Requirements:
* Ubuntu 20.04 LTS
* Node.js (v10.19.0 recommended)
* npm (6.14.4 recommended)

[How To Install Node.js on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)

# Building from the command line
1. npm install -g firebase-tools
2. firebase login
3. git clone https://github.com/tomasz-ludek/dashpay-invite-preview.git
4. cd dashpay-invite-preview/functions
5. npm install
6. firebase serve --only functions,hosting

(npm install -g firebase-tools)

Sample Usage:
```
https://invitations.dashpay.io/fun/invite-preview
query params:
    - avatar-url (profile picture to be displayed inside the envelope)
    - display-name (for displaying first letter if no profile picture)
```
* [Profile picture with custom zoom](https://invitations.dashpay.io/fun/invite-preview?display-name=Ignored&avatar-url=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fknights-of-the-multiverse%2Fimages%2Fd%2Fd3%2FDaimos.png%2Frevision%2Flatest%3Fcb%3D20191018224051%26dashpay-profile-pic-zoom%3D0.30021408%2C0.0%2C0.70746654%2C0.20543462)
* [Regular, square profile picture](https://invitations.dashpay.io/fun/invite-preview?avatar-url=https%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Dview%26id%3D1OlhYLia6f848-rsxvXP3LBDiYQWE4CWq)
* [Empty profile picture](https://invitations.dashpay.io/fun/invite-preview?display-name=Iron%20Man&avatar-url=)
