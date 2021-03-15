import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { CustomSubmissionType } from '@/types/data-handling';
import { fromUnixTime, format } from 'date-fns';
import parse from 'html-react-parser';
import {
	SubmissionVideo,
	SubmissionImage,
	SubmissionGif,
	SubmissionRich,
	SubmissionComment
} from '../Submission';
import { Fallback } from '../UI';
import NotFound from '../NotFound';
import Iframe from 'react-iframe';
// import { useGlobal } from '../Context/index';

export interface SubmissionCoalescedProps {
	subCoalesced: CustomSubmissionType[];
}

const SubmissionCoalesced: FC<SubmissionCoalescedProps> = ({
	subCoalesced
}) => {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (loading === true) {
			setLoading(true);
		}
	}, [loading]);
	// const { openModal, setModalView } = useGlobal();
	return (
		<>
			{subCoalesced ? (
				subCoalesced.map((sub, index) => {
					const { media } = sub;
					const post_hint = sub.post_hint;
					// clean html
					const parseSrc = sub.media?.oembed
						? sub!.media!.oembed!.html.replace(/^\/|$/g, '')
						: '';
					// html-to-react -- parse cleaned html
					const Parsing = parse(parseSrc);
					// clone react element
					const ParsedIframe = React.cloneElement(
						Parsing as JSX.Element
					);
					// chain into Parsing object for desired props
					const { src } = ParsedIframe.props;
					console.log(sub.url);
					console.log('parsed iframe url: ', src);
					const commentTally = (
						<div className={cn('text-lg text-gray-800 font-medium')}>
							{`${
								sub.num_comments > 1
									? `${sub.num_comments} Comments`
									: sub.num_comments === 1
									? `${sub.num_comments} Comment`
									: '0 Comments'
							}`}
						</div>
					);
					const parseCreatedYear = format(
						fromUnixTime(sub.created),
						`yyyy/MM/dd`
					);
					const parseCreatedTime = format(
						fromUnixTime(sub.created),
						`HH:mm`
					);
					const commentPlusCreatedFormat = (
						<div className='gird-cols-2 w-full pt-5 pb-2'>
							<div className='flex w-full col-span-1'>
								{commentTally}
							</div>
							<div className=' w-full flex col-span-1 text-right text-sm text-gray-800 font-medium'>
								{`${parseCreatedYear}`}
								<br />
								{`${parseCreatedTime} UTC`}
							</div>
						</div>
					);
					return loading ? (
						<Fallback />
					) : post_hint === 'hosted:video' &&
					  media != null &&
					  media.reddit_video != null ? (
						<>
							<SubmissionVideo
								key={index}
								media={media}
								secureMediaEmbedUrl={sub.secureMediaEmbedUrl}
								thumbnail={
									sub.post_hint !== 'self' ? sub.thumbnail : '/'
								}
								thumbnail_height={sub.thumbnail_height}
								thumbnail_width={sub.thumbnail_width}
								title={sub.title}
								selftext={sub.selftext}
								selftext_html={sub.selftext_html}
								ups={sub.ups}
								url={sub.url}
								id={sub.id}
								downs={sub.downs}
								post_hint={sub.post_hint}
								is_reddit_media_domain={sub.is_reddit_media_domain}
								hls_url={sub.hls_url}
								is_video={sub.is_video}
								is_self={sub.is_self}
								stickied={sub.stickied}
								scrubber_media_url={
									media.reddit_video.scrubber_media_url
								}
								dash_url={media.reddit_video.dash_url}
								fallback_url={media.reddit_video.fallback_url}
								is_gif={media.reddit_video.is_gif}
								transcoding_status={
									media.reddit_video.transcoding_status
								}
								height={media.reddit_video.height}
							>
								{commentPlusCreatedFormat}
							</SubmissionVideo>
						</>
					) : sub.post_hint === 'image' || sub.url.includes('gif') ? (
						<div
						// onClick={e => {
						// 	e.currentTarget.DOCUMENT_NODE;
						// 	openModal('OPEN_MODAL');
						// 	setModalView('IMAGE_VIEW');
						// }}
						>
							<SubmissionImage
								key={index}
								secureMediaEmbedUrl={sub.secureMediaEmbedUrl}
								selftext={sub.selftext}
								selftext_html={sub.selftext_html}
								post_hint={sub.post_hint}
								url={sub.url}
								ups={sub.ups}
								stickied={sub.stickied}
								media={sub.media}
								id={sub.id}
								downs={sub.downs}
								title={sub.title}
								thumbnail={sub.thumbnail}
								height={sub.height}
							>
								{commentPlusCreatedFormat}
							</SubmissionImage>
						</div>
					) : sub.url.includes('gifv') ? (
						<>
							<SubmissionGif
								key={index}
								selftext={sub.selftext}
								selftext_html={sub.selftext_html}
								ups={sub.ups}
								title={sub.title}
								num_comments={sub.num_comments}
								thumbnail={sub.thumbnail}
								is_gif={sub.is_gif}
								url={sub.url}
								secureMediaEmbedUrl={sub.secureMediaEmbedUrl}
								height={sub.height}
								media={sub.media}
								id={sub.id}
								downs={sub.downs}
							>
								<iframe src={sub.url} />
								{commentPlusCreatedFormat}
							</SubmissionGif>
						</>
					) : media != null &&
					  media.oembed != null &&
					  sub.media_embed.content != null &&
					  media.oembed.html != null &&
					  sub.url != null ? (
						<>
							<SubmissionRich
								key={index}
								selftext={sub.selftext}
								selftext_html={sub.selftext_html}
								ups={sub.ups}
								media_embed={sub.media_embed}
								num_comments={sub.num_comments}
								title={sub.title}
								thumbnail={sub.thumbnail}
								url={sub.url}
								secureMediaEmbedUrl={sub.secureMediaEmbedUrl}
								height={sub.height}
								media={sub.media}
								id={sub.id}
								content={sub.media_embed.content}
								downs={sub.downs}
							>
								{commentPlusCreatedFormat}
								<Iframe
									allow='autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen={true}
									width={'100%'}
									height={'360'}
									url={src}
									className='mx-auto inline-block min-w-full'
								/>
							</SubmissionRich>
						</>
					) : sub.url.includes('comment') ? (
						<div>
							<SubmissionComment
								key={index}
								selftext={sub.selftext}
								selftext_html={sub.selftext_html}
								ups={sub.ups}
								media_embed={sub.media_embed}
								title={sub.title}
								secureMediaEmbedUrl={sub.secureMediaEmbedUrl}
								height={sub.height}
								media={sub.media}
								id={sub.id}
								downs={sub.downs}
								thumbnail={sub.thumbnail}
							>
								{commentPlusCreatedFormat}
							</SubmissionComment>
						</div>
					) : (
						<></>
					);
				})
			) : (
				<NotFound />
			)}
		</>
	);
};

export default SubmissionCoalesced;
