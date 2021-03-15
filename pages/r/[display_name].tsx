import {
	GetStaticPropsResult,
	InferGetStaticPropsType,
	GetStaticPropsContext,
	GetStaticPathsContext,
	GetStaticPathsResult,
	NextPage
} from 'next';
import { r } from '@/lib/snoo-config';
import { SubredditCoalesced } from '@/components/Subreddit';
import { Serializer } from '@/types/json';
import { Params } from 'next/dist/next-server/server/router';
import {
	SubmissionJSONified,
	SubredditJSONified,
	CustomSubmissionType,
	CustomSubredditType
} from '@/types/data-handling';
import React from 'react';
import { Submission } from 'snoowrap/dist/objects';

export default function DisplayName({
	submissionJSONifiedSerialized,
	subredditJSONifiedSerialized,
	serverlessSubmissions
}: NextPage & InferGetStaticPropsType<typeof getStaticProps>) {
	const submissionDeserialized: CustomSubmissionType[] = new Serializer().deserialize(
		submissionJSONifiedSerialized
	);

	const subredditDeserialized: CustomSubredditType[] = new Serializer().deserialize(
		subredditJSONifiedSerialized
	);

	const serverlessSubmissionsDeserialized: Submission[] = new Serializer().deserialize(
		serverlessSubmissions
	);

	return (
		<SubredditCoalesced
			subreddCoalesced={subredditDeserialized}
			subCoalesced={submissionDeserialized}
		/>
	);
}

export async function getStaticProps(
	ctx: GetStaticPropsContext
): Promise<
	GetStaticPropsResult<{
		subredditJSONifiedSerialized: string;
		serverlessSubmissions: string;
		submissionJSONifiedSerialized: string;
		display_name: string;
	}>
> {
	const params = ctx.params as Params;

	const display_name = params.display_name as string;
	console.log(display_name);

	// get FullName to pass in as a variable in the next getNew call
	// the author_fullname value can be extracted from the array as a unique
	// identifier for the `after:` key of Submission ListOptions
	// this allows for array elements to be accurately appended on fetchMore event
	// (await r.getNewComments('snowboarding')

	const snooSubs = await r.getNew(
		display_name ?? 'snowboarding',
		{
			limit: 30,
			count: 30,
			show: 'all',
			after: ''
		}
	);

	const snoooooo = snooSubs.toJSON();

	const RedditSubJsonified: SubmissionJSONified = snoooooo.map(
		s => {
			const secureMediaEmbedUrl = s.secure_media_embed;
			const content = secureMediaEmbedUrl.content;
			const url = s.url;
			const { ...x } = s.media!;
			const xxx = x.reddit_video!;
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
				author_fullname,
				selftext_html,
				id,
				post_hint,
				ups,
				created,
				downs,
				is_reddit_media_domain,
				is_video,
				is_self,
				stickied,
				subreddit_subscribers,
				subreddit_name_prefixed,
				num_comments,
				media_embed
			} = s;

			return {
				media_embed,
				secureMediaEmbedUrl,
				id,
				num_comments,
				author_fullname,
				url,
				content,
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
				created,
				title,
				selftext,
				selftext_html,
				post_hint,
				ups,
				downs,
				is_reddit_media_domain,
				is_video,
				is_self,
				stickied,
				subreddit_subscribers,
				subreddit_name_prefixed
			};
		}
	);
	const submissionJSONifiedSerialized = new Serializer().serialize(
		JSON.parse(JSON.stringify(RedditSubJsonified))
	);

	const snoo = await r.searchSubreddits({
		query: ctx.params
			? (ctx.params.display_name as string)
			: display_name ?? 'snowboarding',
		count: 1,
		limit: 1,
		show: 'all'
	});

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

	const subredditJSONifiedSerialized = new Serializer().serialize(
		JSON.parse(JSON.stringify(post))
	);
	const isDev =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:5000'
			: 'https://subreddit-search.vercel.app';

	const res = await fetch(
		`${isDev}/api/snooSubmissions?q=${display_name}`
	);
	const submissions: Submission[] = await res.json();
	const serverlessSubmissions = new Serializer<
		Submission[]
	>().serialize(JSON.parse(JSON.stringify(submissions)));
	return {
		props: {
			display_name,
			subredditJSONifiedSerialized,
			submissionJSONifiedSerialized,
			serverlessSubmissions
		},
		revalidate: 10
	};
}

export async function getStaticPaths(
	// { path }: GetStaticPaths,
	{ locales, defaultLocale }: GetStaticPathsContext
): Promise<
	GetStaticPathsResult<{
		paths: string[];
		display_name?: string;
	}>
> {
	const snoo = await r.searchSubreddits({
		query: 'snowboarding',
		count: 1,
		limit: 1
	});

	`${
		locales
			? locales
			: defaultLocale
			? defaultLocale
			: 'snowboarding'
	}`;
	return {
		paths: locales
			? locales.reduce<string[]>((arr, locale) => {
					//add a subreddit path for each locale
					snoo.forEach(post => {
						arr.push(`/${locale}/${post.display_name_prefixed}`);
					});
					return arr;
			  }, [])
			: snoo.map(post => `/${post.display_name_prefixed}`),
		fallback: 'blocking'
	};
}

/*

	const ListingWithFetchSerialized = new Serializer<ListingWithFetch>().serialize(
		JSON.parse(JSON.stringify(snooSubs))
	);

const snooComment = await r.getNewComments(
		display_name ?? 'snowboarding',
		{
			count: 25,
			limit: 25
		}
	);

	const snooCommentToJson = snooComment.toJSON();

	const snooCommentJsonifiedSerialized: CommentsJSONified = snooCommentToJson.map(
		s => {
			const {
				is_submitter,
				link_id,
				body,
				parent_id,
				body_html,
				author_fullname,
				approved_at_utc,
				author
			} = s;
			return {
				is_submitter,
				author,
				link_id,
				parent_id,
				body,
				body_html,
				author_fullname,
				approved_at_utc
			};
		}
	);
	const commentsJSONifiedSerialized = new Serializer().serialize(
		JSON.parse(JSON.stringify(snooCommentJsonifiedSerialized))
	);

	// pass the above into get static props 
	// feed what follows to the client

	const customCommentsDeserialized: CustomComments[] = new Serializer().deserialize(
		commentsJSONifiedSerialized
	);
	const mappingComments = (
		<>
			{customCommentsDeserialized ? (
				customCommentsDeserialized.map(r => {
					console.log('parent_id: ', r.parent_id);
					console.log('link_id : ', r.link_id);
					const is_submitter = r.is_submitter;
					return (
						<>
							{is_submitter ? (
								<ReactMarkdown
									plugins={[gfm]}
									children={r.body_html ? r.body_html : r.body}
									allowDangerousHtml={r.body_html ? true : false}
								/>
							) : (
								<ReactMarkdown
									plugins={[gfm]}
									allowDangerousHtml={true}
									children={r.body_html}
								/>
							)}
						</>
					);
				})
			) : (
				<></>
			)}
		</>
	);
*/
