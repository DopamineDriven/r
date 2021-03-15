import { FC } from 'react';
import cn from 'classnames';
import css from './submission.module.css';
import UpvoteTitleThumbnailDescription from './upvote-title-description';
import IsVideo from './IsVideo/is-video';
import { MediaExtend } from '@/types/landing';
// import CommentCount from './comment-count';
import Image from 'next/image';

const SubmissionVideo: FC<MediaExtend> = ({
	title,
	post_hint,
	stickied,
	is_video,
	is_self,
	is_reddit_media_domain,
	fallback_url,
	height,
	downs,
	is_gif,
	media,
	// num_comments,
	scrubber_media_url,
	dash_url,
	transcoding_status,
	selftext,
	thumbnail,
	selftext_html,
	url,
	id,
	ups,
	children,
	hls_url,
	media_embed,
	secureMediaEmbedUrl
}) => {
	return (
		<>
			<div className=''>
				<UpvoteTitleThumbnailDescription
					selftext={selftext}
					selftext_html={selftext_html}
					ups={ups}
					title={title}
					thumbnail={thumbnail}
				/>
				<div className='text-base text-right'>{children}</div>
				{is_video === true ? (
					<div className={cn('w-full min-w-full', css.prose)}>
						<IsVideo
							media={media}
							media_embed={media_embed}
							url={url}
							post_hint={post_hint}
							stickied={stickied}
							hls_url={hls_url}
							is_self={is_self}
							is_reddit_media_domain={is_reddit_media_domain}
							fallback_url={fallback_url}
							height={height}
							is_gif={is_gif}
							scrubber_media_url={scrubber_media_url}
							dash_url={dash_url}
							transcoding_status={transcoding_status}
							is_video={is_video}
							secureMediaEmbedUrl={secureMediaEmbedUrl}
							downs={downs}
							selftext={selftext}
							id={id}
							ups={ups}
							selftext_html={selftext_html}
							thumbnail={thumbnail}
							title={title}
							children={children}
						/>
					</div>
				) : url != null ? (
					<Image
						src={url}
						width={'100%'}
						height='auto'
						objectFit='cover'
					/>
				) : (
					<></>
				)}
			</div>
			<hr className='w-full bg-gray-200 z-100 min-w-full my-4 h-1' />
		</>
	);
};

export default SubmissionVideo;
