import { Subreddit, Listing } from 'snoowrap';
import { NextApiRequest, NextApiResponse } from 'next';
import { r } from '@/lib/snoo-config';

export type SearchSubreddits = {
	subreddit: Listing<Subreddit> | never[];
	found: boolean;
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<SearchSubreddits>
) => {
	const { q } = req.query;
	console.log(q);
	const data = q
		? await r.searchSubreddits({
				query: (q as string) ?? 'snowboarding',
				count: 10,
				limit: 3
		  })
		: [];
	res.statusCode = 200;
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=1200, stale-while-revalidate=600'
	);

	return res.status(200).json({
		subreddit: data,

		found: true
	});
};
export default handler;

/*
(method) Array<Submission>.find<S>(predicate: (this: void, value: Submission, index: number, obj: Submission[]) => value is S, thisArg?: any): S | undefined (+1 overload)

Returns the value of the first element in the array where predicate is true, and undefined otherwise.

@param predicate
find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. 
If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.

@param thisArg
If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead.
*/
