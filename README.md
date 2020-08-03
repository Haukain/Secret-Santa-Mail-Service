# Secret Santa Mail Service :santa:

Using a given list of participants, this program randomly group them in gifter/receiver pairs. It then sends an email to the gifter containing the name of the person he has to buy a gift for!

![mail contents](./docs/example.png "Example of a mailed invitation")
> Exemple of a mailed invitation for a participant with the name of another participant

## Install

Requires NodeJS and NPM installed locally.

After downloading this project, run `npm install` in the root directory of the project to install its dependencies. The project uses [NodeMailer](https://nodemailer.com/about/) to send emails.

## Setup

You can then setup the mail sending using the `settings.json` file:
- `mail.subject`: The subject of the email that will be sent to the participants (e.g Secret Santa !)
- `mail.sender`: The displayed sender of the email (e.g santa@north.pole) (:warning:: May not work depending on the service and the actual email address used to deliver the message will be shown)
- `participants`: A name/email pair of the participants to the secret santa (:warning:: The participant list must have more than two elements *obviously*)
- `template.path`: The path of the template.html to be used in the email
- `template.title`: The title text to display in the mail contents
- `template.image`: The static url to an hosted image for the mail background (:warning:: The image has to be hosted somewhere)
- `template.text`: The text to display in the mail contents

## Usage

The credentials of the email adress used to send the email are passed as arguments when running the program.

Use `node main.js service email@service.com p@ssword` to run the program. Where service is a well known SMTP service (e.g gmail) [that can be used by NodeMailer](https://nodemailer.com/smtp/well-known/).
*Only tested using gmail*