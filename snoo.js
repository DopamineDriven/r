module.exports = {
	NEXT_PUBLIC_USER_AGENT:
		process.env.NEXT_PUBLIC_USER_AGENT || 'user-agent',
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
	REFRESH_TOKEN: process.env.REFRESH_TOKEN,
	NEXT_PUBLIC_USER_NAME: process.env.NEXT_PUBLIC_USER_NAME,
	PASSWORD: process.env.USER_PASSWORD
};
