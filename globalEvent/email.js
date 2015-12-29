module.exports = [
    {
        eventName: 'defaultEmailNotification',
        handler: function (data) {
            console.log('Send default Email');
            var mailOptions = {
                from: "Feedback Dev <feedback.platform.dev@gmail.com>", // sender address
                to: "guptkashish@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world ✔", // plaintext body
                html: "<b>Hello world ✔</b>" // html body
            };
            Mail.google.smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Message sent: " + response.message);
                }
            })
        }
    }
];
