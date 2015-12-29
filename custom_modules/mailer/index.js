var nodemailer = require('nodemailer');
var mail = {
    google:{
        smtpTransport : {}
    }
};

module.exports = function (config, callback) {
    // GMail SMTP registration [ create reusable transport method (opens pool of SMTP connections) ]
    mail.google.smtpTransport = nodemailer.createTransport("SMTP", {
        service: config.gmail.service,
        auth: {
            user: config.gmail.username,
            pass: config.gmail.password
        }
    });

    // Add other transport methods

    // setup e-mail data with unicode symbols
    /*var mailOptions = {
        from: "Fred Foo ✔ <feedback.platform.dev@gmail.com>", // sender address
        to: "guptkashish@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world ✔", // plaintext body
        html: "<b>Hello world ✔</b>" // html body
    };*/

// send mail with defined transport object
    /*gmailSmtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });*/

    callback(null, mail);
};