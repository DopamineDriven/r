### Paths Graveyard

```tsx
export async function getStaticPaths(
	// { paths }: ParsedUrlQuery,
	ParsedUrlQuery: GetStaticPaths,
	{ locales }: GetStaticPathsContext
): Promise<
	GetStaticPathsResult<{
		path: string[];
		locale?: string;
	}>
> {
	const paths = (await ParsedUrlQuery({})).paths;
	const snoo = await r.searchSubreddits({
		// interface ParsedUrlQuery extends NodeJS.Dict<string | string[]> { }
		query: paths ? (paths[0] as string) : (paths as string),
		count: 30,
		limit: 1
	});

	return {
		paths: locales
			? locales.reduce<string[]>((arr, locale) => {
					//add a subreddit path for each locale
					snoo.forEach(post => {
						arr.push(`/${locale}/r/${post.display_name}`);
					});
					return arr;
			  }, [])
			: snoo.map(post => `/r/${post.display_name}`),
		fallback: true
	};
}
```

### Props Graveyard

```tsx
export async function getStaticProps(
	ctx: GetStaticPropsContext
): Promise<
	GetStaticPropsResult<{
		postttt: string;
		submissionJSONified: string;
	}>
> {
	const params = ctx.params as Params;
	const display_name = params.display_name as string;
	const snoo = await r.searchSubreddits({
		query: ctx.params
			? (ctx.params.display_name as string)
			: display_name ?? 'snowboarding',
		count: 1,
		limit: 1,
		show: 'all'
	});
	// get FullName to pass in as a variable in the next getNew call
	// the author_fullname value can be extracted from the array as a unique
	// identifier for the `after:` key of Submission ListOptions
	// this allows for array elements to be accurately appended on fetchMore event
	const snooSubs = await r
		.getNew(
			ctx.params
				? (ctx.params.display_name as string)
				: display_name ?? 'snowboarding',
			{
				limit: 25,
				count: 25,
				show: 'all',
				after: ''
			}
		)
		.then(fetch => {
			fetch.fetchMore({
				amount: 10,
				append: true
			});
			return fetch;
		});
	const snoooooo = snooSubs.toJSON();
	const RedditSubJsonified: SubmissionJSONified = snoooooo.map(
		s => {
			const { ...x } = s.media!;
			const { ...xx } = x!;
			const xxx = xx.reddit_video!;
			const {
				dash_url,
				scrubber_media_url,
				fallback_url,
				height,
				transcoding_status,
				is_gif,
				hls_url,
				duration
			} = xxx ?? '';
			const {
				media,
				thumbnail,
				thumbnail_height,
				thumbnail_width,
				title,
				selftext,
				selftext_html,
				post_hint,
				ups,
				is_reddit_media_domain,
				is_video,
				is_self,
				stickied,
				subreddit_subscribers,
				subreddit_name_prefixed
			} = s;
			const r = s;
			return {
				dash_url,
				media,
				thumbnail_height,
				thumbnail_width,
				scrubber_media_url,
				fallback_url,
				height,
				transcoding_status,
				is_gif,
				hls_url,
				duration,
				thumbnail,
				title,
				selftext,
				selftext_html,
				post_hint,
				ups,
				is_reddit_media_domain,
				is_video,
				is_self,
				stickied,
				subreddit_subscribers,
				subreddit_name_prefixed
			};
		}
	);
	const submissionJSONified = new Serializer().serialize(
		RedditSubJsonified
	);
	// const snoored = new Serializer<
	// 	JSONified<CustomSubmissionType[]>
	// >().serialize(RedditSubJsonified);
	const snoopost = snoo.toJSON();
	const post: SubredditJSONified = snoopost.map(mapped => {
		const {
			created,
			public_description_html,
			banner_img,
			active_user_count,
			description_html,
			icon_img,
			id,
			title,
			banner_size,
			url,
			icon_size,
			description,
			display_name_prefixed
		} = mapped;
		return {
			id,
			banner_size,
			display_name_prefixed,
			banner_img,
			description_html,
			public_description_html,
			title,
			icon_img,
			description,
			active_user_count,
			created,
			icon_size,
			url,
			display_name
		};
	});

	const postttt = new Serializer().serialize(
		JSON.parse(JSON.stringify(post))
	);
	// const postSerialized = new Serializer<
	// 	JSONified<CustomSubredditType[]>
	// >().serialize(post);
	// const postsss = JSON.stringify(JSON.parse(postSerialized));
	// const snooSubred = snoo.toJSON().splice(0, 10);
	// const snooSub = snooSubs.toJSON();
	// const snooComm = snooComment.toJSON();
	// const snooSub = snooSubs.toJSON();
	// const commentSerializer = new Serializer<
	// 	JSONified<Comment[]>
	// >().serialize(snooComm);
	// const submissionSerializer = new Serializer<
	// 	JSONified<Submission[]>
	// >().serialize(snooSub);
	return {
		props: {
			// submissionSerializer,
			// RedditSubJsonified,
			// post,
			postttt,
			submissionJSONified
			// commentSerializer,
			// post,
			// path: `/r/${display_name}`
		},
		revalidate: 10
	};
}
```
