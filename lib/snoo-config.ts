import snoowrap from 'snoowrap';

import {
	CLIENT_ID,
	CLIENT_SECRET,
	NEXT_PUBLIC_USER_AGENT,
	REFRESH_TOKEN
} from '../snoo';

export const r = new snoowrap({
	userAgent: NEXT_PUBLIC_USER_AGENT,
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	refreshToken: REFRESH_TOKEN
});
