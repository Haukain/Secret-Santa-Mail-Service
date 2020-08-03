function sendmail(transporter, sender_email,receiver_email, subject, contents) {
    const mailOptions = {
        from: sender_email,
        to: receiver_email,
        subject: subject,
        html: contents
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          return err
        else
          return info
     });
}

var exports = module.exports = sendmail