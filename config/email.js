const nodemailer = require("nodemailer");

let Email = {};

Email.transporter = nodemailer.createTransport(
    {
        service: 'Hotmail',
        auth: {
            user: '',
            pass: ''
        }
    },
    {
        from: 'Takeshi Code <takeshi13x@hotmail.com>',
        headers: {

        }
    }
)


module.exports = Email;