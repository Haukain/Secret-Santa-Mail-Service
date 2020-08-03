// Importing libraries
let nodemailer = require('nodemailer');
let sendmail = require('./sendMail');
var fs = require('fs');

// Reading settings
let settings = require('./settings.json')

let args = process.argv.slice(2);
// args[0] service
// args[1] username
// args[2] password

// Checks
if(args.length<3) throw new Error('Sender email service, email address & password need to be passed as arguments. Like this: "node main.js gmail sender@gmail.com p@ssword"');
if(settings.participants.length<2) throw new Error('At least 2 participants should be registered');

// Shuffles the list of partipants
function shuffleSet(list) {

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    shuffledList = shuffle(list.map(e=>e.name));
    for (let i=0; i<list.length; i++) {
        // Will crash if only one participant is used, or if all participants have the same name
        if(list[i].name===shuffledList[i]) shuffleSet(list);
    }
    return shuffledList;
}
shuffledList = shuffleSet(settings.participants);

// Replace parts of the template to display desired texts & images
let html = fs.readFileSync(settings.template.path, 'utf8');
html = html.replace("$$title", settings.template.title);
html = html.replace("$$image", settings.template.image);
html = html.replace("$$text", settings.template.text);

// Creates a nodemailer transporter using the credentials passed as args
let transporter = nodemailer.createTransport({
    service: args[0],
    auth: {
           user: args[1],
           pass: args[2]
       }
   });

// Send one email for each participant
for ([i,e] of shuffledList.entries()) {
    // Customize the template with the name of the participant this user has to by a gift to
    contents = html.replace("$$name", e);
    sendmail(transporter, settings.mail.sender, settings.participants[i].email, settings.mail.subject, contents);
}