import fetch from 'isomorphic-unfetch';
import { NextApiRequest, NextApiResponse } from 'next';

// for use with SWR in components
export default function fetcher(
	input: RequestInfo,
	args: any[]
) {
	return fetch(input, ...args).then((response: Response) =>
		response.json()
	);
}

// for use in api routes
export type SubredditConstructorClass<
	T = Record<string, unknown>
> = new (...args: any[]) => T;

export type SubredditFetcher = SubredditConstructorClass<{
	fetcher: (url: string, init?: RequestInit) => Promise<Response>;
}>;

export async function FetcherExample(
	fetch: SubredditFetcher,
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const { q } = req.query;

	// invoke a new class instance
	const fetcher = await new fetch().fetcher(
		`https://www.reddit.com/r/${q}/new/.json?Request_url=https://oauth.reddit.com/r/${q}/new/.json?limit-5`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer: ${process.env.REFRESH_TOKEN}`
			},
			credentials: 'include'
		}
	);

	res.statusCode = 200;
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=1200, stale-while-revalidate=600'
	);

	return await fetcher.json();
}
