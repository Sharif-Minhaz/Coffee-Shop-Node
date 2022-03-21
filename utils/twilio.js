const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken, {
	lazyLoading: true,
});

exports.sendNotification = async (msgBody, to) => {
	try {
		await client.messages.create({
			body: msgBody,
			from: "+12606328062",
			to: to,
		});
	} catch (err) {
		next(err);
	}
};
