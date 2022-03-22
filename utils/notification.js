const nodemailer = require("nodemailer");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken, {
	lazyLoading: true,
});

exports.sendNotification = async (msgBody, toNum, toMail) => {
	try {
		// mobile messages system with twilio
		await client.messages.create({
			body: msgBody,
			from: "+12606328062",
			to: toNum,
		});

		// gmail notification system with nodemailer
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "phonixgaruda2021@gmail.com",
				pass: process.env.EMAIL_PASS,
			},
		});

		const mailOptions = {
			from: "phonixgaruda2021@gmail.com",
			to: toMail,
			subject: "About checkout",
			text: msgBody,
		};
		await transporter.sendMail(mailOptions);
	} catch (err) {
		console.error(err);
	}
};
