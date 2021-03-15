import { NextApiRequest, NextApiResponse } from 'next';
import { Submission } from 'snoowrap';
import { r } from '@/lib/snoo-config';

export type SearchSubmissions = {
	body: Submission[] | never[];
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<SearchSubmissions>
) => {
	const { q } = req.query;
	const data = q
		? await r.getNew(q as string, {
				show: 'all',
				limit: 10,
				count: 10
				// after: after as string
		  })
		: [];
	res.statusCode = 200;
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=1200, stale-while-revalidate=600'
	);
	if (!data) {
		console.log('error in searchSubmission', `${data}`);
	}
	return res.send({
		body: data
	});
};
export default handler;
