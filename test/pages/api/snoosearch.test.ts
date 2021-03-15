import fetch from 'isomorphic-unfetch';
test('query', async () => {
	const q = 'snowboarding';
	const data = await fetch(
		`https://subreddit-search.vercel.app/api/snoosearch?q=${q}`
	);
	const res = data.json();
	expect(q).toEqual('snowboarding');
	expect(res).toBeDefined();
	expect(q).toMatchSnapshot();
	expect(res).toMatchSnapshot();
});
