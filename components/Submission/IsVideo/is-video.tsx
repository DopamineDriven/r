import { FC } from 'react';
import cn from 'classnames';
import { Container } from '../../UI';
import { cleanRemoteIframe } from '../../../lib/helpers';
import { MediaExtend } from '@/types/landing';

const IsVideo: FC<MediaExtend> = ({
	media,
	post_hint,
	className,
	stickied,
	children,
	is_video,
	media_embed,
	is_reddit_media_domain,
	fallback_url,
	height = 500,
	is_gif,
	secureMediaEmbedUrl,
	url
}) => {
	const richVideo = (
		<>
			{media != null &&
			media.oembed != null &&
			is_reddit_media_domain === true ? (
				<a
					aria-label={media.oembed.title}
					dangerouslySetInnerHTML={{
						__html: cleanRemoteIframe({
							height: media.oembed.height.toString(),
							html: media.oembed.html,
							width: media.oembed.width.toString()
						})
					}}
				></a>
			) : is_reddit_media_domain !== true &&
			  media != null &&
			  media.oembed != null ? (
				<>
					<a
						aria-label={media.oembed.title}
						dangerouslySetInnerHTML={{
							__html: cleanRemoteIframe({
								height: media.oembed.height.toString(),
								html: media.oembed.html,
								width: media.oembed.width.toString()
							})
						}}
					></a>
				</>
			) : (
				<></>
			)}
		</>
	);

	return (
		<Container
			clean
			className={cn('mx-auto max-w-5xl lg:max-w-6xl', className)}
		>
			{stickied !== true ? (
				<div
					className='flex flex-grow max-w-4xl mx-auto w-full align-middle'
					style={{ maxHeight: '60vh' }}
				>
					<video
						preload='auto'
						controls
						controlsList={'nodownload; encrypted'}
						loop
						muted
						webkit-playsinline='true'
						playsInline={true}
						src={fallback_url}
						height={'360'}
						width={'100%'}
						className='w-full min-w-full mx-auto justify-center outline-none focus:outline-none col-span-1 max-w-4xl'
					>
						<source
							aria-controls='audio'
							title='fullHD'
							type='video/mp4'
							src={fallback_url}
						/>
					</video>
				</div>
			) : is_gif === true ? (
				<>
					{' '}
					<video
						src={
							post_hint === 'link' ? url!.replace('.gifv', '.mp4') : url
						}
						preload='auto'
						controls
						controlsList={'nodownload; encrypted'}
						loop
						muted
						webkit-playsinline='true'
						playsInline={true}
						height={'480'}
						width={'640'}
						className='w-full min-w-full mx-auto justify-center outline-none focus:outline-none col-span-1 max-w-4xl'
					></video>
					)
				</>
			) : is_video === true &&
			  post_hint === 'rich:video' &&
			  media != null &&
			  media.oembed != null &&
			  media.oembed.html != null &&
			  media.oembed.type === 'rich' ? (
				<>{richVideo}</>
			) : post_hint !== 'self' &&
			  secureMediaEmbedUrl.media_domain_url ? (
				<>
					<h2 className='text-semibold text-4xl'>
						{media_embed?.height && media_embed.width}
					</h2>
					<label>is Scrolling? {secureMediaEmbedUrl.scrolling}</label>
					<iframe
						src={secureMediaEmbedUrl.media_domain_url + '?autoplay=1'}
						height={secureMediaEmbedUrl.height ?? 460}
						width={'100%' ?? secureMediaEmbedUrl.width}
						className='w-full my-5'
						allow={`autplay; encrypted-media`}
						frameBorder='0'
					/>
				</>
			) : (
				<>{children}</>
			)}
			{/* <CommentTemplate custom={custom} ups={ups} downs={downs} /> */}
		</Container>
	);
};

export default IsVideo;

// oembed?: {
//     /** The username of the uploader of the source media */
//     author_name?: string;
//     /** URL to the author's profile on the source website */
//     author_url?: string;
//     description?: string;
//     height: number;
//     html: string;
//     /** Name of the source website, e.g. "gfycat", "YouTube" */
//     provider_name: string;
//     /** URL of the source website, e.g. "https://www.youtube.com" */
//     provider_url: string;
//     thumbnail_height: number;
//     thumbnail_url: string;
//     thumbnail_width: number;
//     /** Name of the media on the content site, e.g. YouTube video title */
//     title: string;
//     type: 'video' | 'rich';
//     version: string;
//     width: number;
//   };
