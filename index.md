### LandingPageSnapshot Before Cleanup

```tsx
import { Container } from '@/components/UI';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';
import cn from 'classnames';
import {
	InferGetStaticPropsType,
	GetStaticPropsContext,
	GetStaticPropsResult
} from 'next';
import { r } from '@/lib/snoo-config';
import {
	LandingPage,
	LandingPageWrapper,
	LandingData,
	LandingDataWrapper
} from '@/components/Landing';
import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Submission } from 'snoowrap/dist/objects';
// import ReactMarkdown from 'react-markdown';
// import { CustomComments } from '../types/data-handling';
// import gfm from 'remark-gfm';
import { Serializer } from '@/types/json';
// import Image, { ImageLoaderProps } from 'next/image';
// import Subreddit from 'snoowrap/dist/objects/Subreddit';
import Comment from 'snoowrap/dist/objects/Comment';
import { Meta } from '@/components/Meta';
import {
	IndexSubmissionJSONified,
	CommentsJSONified
} from '@/types/data-handling';
import { MediaExtendedJSONified } from '@/types/landing';
import ReactMarkdown from 'react-markdown';
import { Author } from 'snoowrap/dist/objects/ModmailConversation';
import PostHintSwitch from '@/components/Submission/post-hint';
import { MediaExtendLanding } from '../types/landing';

export default function Index({
	snooSubredd,
	snooSubmissionJSONifiedSerialized,
	snooSerializedComments,
	postHintMediaSerialized
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [search, setSearch] = useState('');
	const { asPath } = useRouter();
	const router = useRouter();

	useEffect(() => {
		const pathSubString = asPath.split('/');
		if (!asPath.includes('/r/[display_name]/')) {
			setSearch('');
			return;
		}
		if (
			asPath.includes('/r/[display_name]/') &&
			asPath.length === 3
		) {
			setSearch(pathSubString[3]);
			return;
		}
		console.log('index asPath', asPath);
	}, [asPath]);

	const deserializePostHintSwitch: MediaExtendLanding[] = new Serializer().deserialize(
		postHintMediaSerialized
	);

	const deserializedSubission: Submission[] = new Serializer().deserialize(
		snooSubmissionJSONifiedSerialized
	);

	const deserializeCommentSelection: Comment[] = new Serializer().deserialize(
		snooSerializedComments
	);

	const childrenButtons = (
		<>
			{snooSubredd
				? snooSubredd.map(prop => {
						return (
							<>
								<Link
									href={'/r/[display_name]'} // = /r/subreddit/query
									as={`/r/${prop.display_name}`}
									key={prop.title}
									passHref={true}
								>
									<a
										type='button'
										key={prop.id}
										className={cn(
											'flex normal-case w-full min-w-full mx-auto sm:w-auto items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-gray-100 bg-opacity-25 bg-redditSearch ring-2 ring-rojo-100 ring-inset hover:bg-black hover:text-gray-50  sm:px-8 z-50 transition-colors duration-150'
										)}
									>
										/{`${prop.display_name_prefixed}`}
									</a>
								</Link>
							</>
						);
				  })
				: ''}
		</>
	);

	const mappingImages = (
		<>
			{deserializeCommentSelection ? (
				deserializeCommentSelection.map(s => {
					return (
						<>
							<div className='prose-lg text-gray-200 font-medium leading-tight mx-auto block'>
								{s.author_fullname}
								<ReactMarkdown
									children={s.author_fullname}
									allowDangerousHtml={true}
									className='text-3xl'
								/>
								<ReactMarkdown
									children={s.body_html}
									allowDangerousHtml={true}
									className=' font-sans'
								/>
								<div className='text-6xl text-gray-100'>
									{s.parent_id}
								</div>
							</div>
						</>
					);
				})
			) : (
				<></>
			)}
		</>
	);

	const postHintSwitchDeserializedMapped = (
		<>
			{deserializePostHintSwitch ? (
				deserializePostHintSwitch.map(prop => {
					return (
						<PostHintSwitch
							id={prop.id}
							ups={prop.ups}
							downs={prop.downs}
							is_video={prop.is_video}
							is_self={prop.is_self}
							url={prop.url}
							title={prop.title}
							stickied={prop.stickied}
							post_hint={prop.post_hint}
							media={prop.media}
							is_reddit_media_domain={prop.is_reddit_media_domain}
							secureMediaEmbedUrl={prop.secureMediaEmbed}
							media_embed={prop.media_embed as JSX.Element}
							height={prop.media!.reddit_video!.height ?? '500'}
							selftext={prop.selftext}
							selftext_html={prop.selftext_html}
							thumbnail={prop.thumbnail}
						/>
					);
				})
			) : (
				<></>
			)}
		</>
	);

	const ImgCatch = (
		<>
			<LandingDataWrapper>
				<Container clean className='w-screen min-w-full'>
					{deserializedSubission.map(r => {
						return (
							<LandingData
								id={r.id}
								url={r.url}
								title={r.title}
								display_name={
									r.subreddit.display_name ??
									snooSubredd.map(
										display_name => display_name.display_name
									)
								}
								display_name_prefixed={r.subreddit_name_prefixed}
							/>
						);
					})}
				</Container>
			</LandingDataWrapper>
		</>
	);

	return (
		<>
			<Meta />
			<Navbar />
			<Head>
				<title>{'Subreddit Search Home'}</title>
			</Head>
			{/* <SearchReddit /> */}
			<Container clean className='fit'>
				<LandingPageWrapper>
					<LandingPage
						children={childrenButtons}
						pics={deserializedSubission.map(r => {
							return (
								<LandingData
									id={r.id}
									url={r.url}
									title={r.title}
									display_name={
										r.subreddit.display_name ??
										snooSubredd.map(
											display_name => display_name.display_name
										)
									}
									display_name_prefixed={r.subreddit_name_prefixed}
								/>
							);
						})}
					/>
				</LandingPageWrapper>
				<div className='grid lg:grid-cols- mx-auto p-4'>
					{mappingImages}
				</div>
			</Container>
		</>
	);
}
// https://stackoverflow.com/questions/38688822/how-to-parse-json-string-in-typescript

export async function getStaticProps(
	ctx: GetStaticPropsContext
): Promise<
	GetStaticPropsResult<{
		// submissionSerializer: string;
		// commentSerializer: string;
		snooSubredd: {
			display_name_prefixed: string;
			url: string;
			id: string;
			title: string;
			display_name: string;
			icon_img: string;
		}[];
		snooSubmissionJSONifiedSerialized: string;
		postHintMediaSerialized: string;
		snooSerializedComments: string;
	}>
> {
	const display_name = ctx.params
		? (ctx.params.q as string)
		: 'ssnowboarding';

	const snoos = await r
		.getHot(ctx.params ? (ctx.params.q as string) : 'pics', {
			count: 12,
			limit: 12
		})
		.then(s => {
			return s;
		});

	const snoosToJSON = snoos.toJSON();
	const snooSubmissionJSONifiedSerialized = new Serializer<IndexSubmissionJSONified>().serialize(
		JSON.parse(JSON.stringify(snoosToJSON))
	);

	const mediaExtended = await r.getNew(
		display_name ? display_name : 'snowboarding',
		{
			count: 20,
			limit: 20,
			show: 'all'
		}
	);

	const mediaExtendedtoJSON = mediaExtended.toJSON();

	const mediaExtendedJSONifiedNonNull: MediaExtendedJSONified = mediaExtendedtoJSON.map(
		prop => {
			const {
				media,
				post_hint,
				stickied,
				is_video,
				is_self,
				ups,
				downs,
				id,
				selftext,
				selftext_html,
				title,
				thumbnail,
				media_embed,
				is_reddit_media_domain,
				url
			} = prop;
			// const { ...x } = media!;
			// const { ...mediaProps } = x!;
			// const oembed = mediaProps.oembed;
			// const reddit_video = mediaProps.reddit_video;
			// const scrubber_media_url = mediaProps.reddit_video!
			// 	.scrubber_media_url;
			// const hls_url = mediaProps.reddit_video!.hls_url;
			// const dash_url = mediaProps.reddit_video!.dash_url;
			// const transcoding_status = mediaProps.reddit_video!
			// 	.transcoding_status;
			// const fallback_url = reddit_video!.fallback_url;
			// const height = reddit_video!.height;
			const secureMediaEmbed = prop.secure_media_embed;
			return {
				media,
				post_hint,
				stickied,
				is_video,
				is_self,
				media_embed,
				is_reddit_media_domain,
				url,
				// fallback_url,
				// oembed,
				secureMediaEmbed,
				ups,
				downs,
				id,
				selftext,
				selftext_html,
				title,
				thumbnail
				// height,
				// transcoding_status,
				// dash_url,
				// hls_url,
				// scrubber_media_url
			};
		}
	);
	const postHintMediaSerialized = new Serializer().serialize(
		JSON.parse(JSON.stringify(mediaExtendedJSONifiedNonNull))
	);
	const snooComment = await r
		.getNewComments(
			ctx.params ? (ctx.params.q as string) : 'snowboarding',
			{
				count: 12,
				limit: 12
			}
		)
		.then(c => {
			return c;
		});
	const snooCommentToJson = snooComment.toJSON();
	const snooCommentJsonifiedSerialized: CommentsJSONified = snooCommentToJson.map(
		s => {
			const {
				body,
				body_html,
				author_fullname,
				approved_at_utc,
				parent_id,
				author,
				is_submitter,
				link_id
			} = s;

			return {
				is_submitter,
				parent_id,
				body,
				body_html,
				author_fullname,
				approved_at_utc,
				author,
				link_id
			};
		}
	);

	const snooSerializedComments = new Serializer().serialize(
		JSON.parse(JSON.stringify(snooCommentJsonifiedSerialized))
	);
	const snooSubreddit = await r.searchSubreddits({
		query: ctx.params ? (ctx.params.q as string) : 'snowboarding',
		limit: 10,
		count: 10,
		show: '10'
	});

	const snoooooo = await r.getNew(
		ctx.params ? (ctx.params.q as string) : 'nextjs'
	);

	const snooSubredd = snooSubreddit.map(snooSub => {
		const {
			display_name_prefixed,
			url,
			id,
			title,
			display_name,
			icon_img
		} = snooSub;
		return {
			display_name_prefixed,
			url,
			icon_img,
			id,
			title,
			display_name
		};
	});
	const snooSub = snoos.toJSON().splice(0, 10);
	const snooComm = snooComment.toJSON();
	const snooCommMap = snooComm.map(s => {
		return s;
	});
	const submissionSerializer = new Serializer<
		Submission[]
	>().serialize(snooSub);
	const commentSerializer = new Serializer<Comment[]>().serialize(
		snooComm
	);
	return {
		props: {
			snooSubredd,
			snooSubmissionJSONifiedSerialized,
			snooSerializedComments,
			postHintMediaSerialized
		},
		revalidate: 10
	};
}
```
