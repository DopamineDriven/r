import { FC } from 'react';
import UpvoteTitleThumbnailDescription from './upvote-title-description';
import { MediaExtend } from '@/types/landing';
import { Container } from '@/components/UI';
import { MediaEmbed } from 'snoowrap/dist/objects/Submission';
import ReactMarkdown from 'react-markdown/with-html';
import React from 'react';
import gfm from 'remark-gfm';
// import parse from 'html-react-parser';
const SubmissionRich: FC<MediaExtend & MediaEmbed> = ({
	title,
	selftext,
	thumbnail,
	selftext_html,
	media,
	stickied,
	children,
	content,
	media_embed,
	ups
}) => {
	return (
		<>
			<div>
				<UpvoteTitleThumbnailDescription
					selftext={selftext}
					selftext_html={selftext_html}
					ups={ups}
					title={title}
					thumbnail={thumbnail}
				/>
				{media_embed != null &&
				media != null &&
				stickied !== true ? (
					<>
						<Container
							clean
							className={'mx-auto max-w-5xl lg:max-w-6xl'}
						>
							<div className='text-base text-right'>{children}</div>
						</Container>
					</>
				) : content ? (
					<Container
						clean
						className={'mx-auto max-w-5xl lg:max-w-6xl'}
					>
						<div
							className='flex flex-grow max-w-4xl mx-auto w-full align-middle '
							style={{ maxHeight: '60vh' }}
						>
							<ReactMarkdown
								plugins={[gfm]}
								children={content}
								allowDangerousHtml={true}
								className='w-full min-w-full mx-auto justify-center outline-none focus:outline-none col-span-1 max-w-4xl'
							/>
						</div>
					</Container>
				) : (
					<></>
				)}
			</div>
			<hr className='w-full bg-gray-200 z-100 min-w-full my-4 h-1' />
		</>
	);
};

export default SubmissionRich;

/*


	// const med = console.log(media_embed!.content!);
	// const meda = media_embed!.content!;
	// const parseMeda = parse(meda);
	// console.log('parseMeda: ', parseMeda);

	// const source = media!.oembed!.html.match(
	// 	/(width="([^"]+)")|(height="([^"]+)")|(src="([^"]+)")|(allow="([^"]+)")/g
	// );
	// const parseSrc = media!.oembed!.html.replace(/^\/|$/g, '');
	// console.log('parseSrc: ', parseSrc);
	// const Parsing = parse(parseSrc);

	// const ParsingRef = React.createRef.bind(Parsing);
	// console.log('ref: ', { ParsingRef });
	// const ParsedIframe = React.cloneElement(Parsing as JSX.Element);
	// console.log({ ParsedIframe });
	// const { src } = ParsedIframe.props;
	// console.log(src);
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
*/
