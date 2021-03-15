## Remotion Config

```ts
import { Config } from 'remotion';

Config.Rendering.setConcurrency(8);
Config.Output.setPixelFormat('yuv420p');
Config.Output.setCodec('h264');
Config.Rendering.setImageFormat('png');
Config.Rendering.setQuality(90);
Config.Output.setCrf(0);

export { Config };
```

### VideoConfigFile

```tsx
import { Composition } from 'remotion';
import { FC } from 'react';
import Submission from './submission';

const VideoConfig: FC = () => {
	return (
		<>
			<Composition
				id='redditvideo'
				component={Submission}
				durationInFrames={450}
				fps={30}
				width={720}
				height={540}
			/>
		</>
	);
};

export default VideoConfig;
```

### Submission.tsx

```tsx
import { FC, useEffect, useRef } from 'react';
import Image from 'next/image';
import gfm from 'remark-gfm';
import { Container } from '../UI';
import {
	SubmissionProps,
	SubmissionVidProps
} from '@/types/data-handling';
import cn from 'classnames';
import css from './submission.module.css';
import UpArrow from '../UI/Icons/up-arrow';
import ReactMarkdown from 'react-markdown/with-html';
import React from 'react';
import VotingArrow from '../UI/Icons/up-arrow-encircled';
import {
	Video,
	Composition,
	useVideoConfig,
	Audio,
	RemotionAudioProps
} from 'remotion';

interface RemoteAud {
	props: RemotionAudioProps;
}
// keep icon_img under
const SubmissionTemplate: FC<SubmissionProps> = ({
	title,
	post_hint,
	stickied,
	is_video,
	is_self,
	is_reddit_media_domain,
	fallback_url,
	height,
	is_gif,
	scrubber_media_url,
	dash_url,
	transcoding_status,
	selftext,
	thumbnail,
	selftext_html,
	ups,
	children,

	hls_url,
	thumbnail_width,
	media_embed
}) => {
	const VideoConfig: FC = () => {
		return (
			<Video
				id='reddit-video'
				preload='auto'
				controlsList={'nodownload; encrypted'}
				loop
				aria-controls={`${Audio}`}
				muted={true}
				webkit-playsinline='true'
				playsInline={true}
				src={dash_url}
				width={'100$'}
				height={540}
				className='w-full min-w-full mx-auto justify-center outline-none focus:outline-none col-span-1 max-w-4xl'
			>
				<source
					aria-controls='audio'
					title='fullHD'
					type='video/mp4'
					src={fallback_url}
				/>
				<source
					title='dash'
					type='application/dash+xml'
					src={dash_url}
				/>
				<source
					title='scrubber'
					type='video/mp4'
					src={scrubber_media_url}
				/>
			</Video>
		);
	};
	const AudioConfigComp: FC = () => (
		<>
			<Composition
				id='reddit-audio'
				component={Audio}
				durationInFrames={450}
				fps={30}
				width={720}
				height={540}
			/>
		</>
	);
	const VideoConfigComp: FC = () => (
		<>
			<Composition
				id='reddit-video'
				component={VideoConfig}
				durationInFrames={450}
				fps={30}
				width={720}
				height={540}
			/>
		</>
	);
	const IsVideo: FC<SubmissionVidProps> = ({
		post_hint,
		stickied,
		is_video,
		hls_url,
		is_self,
		is_reddit_media_domain,
		fallback_url,
		// height = 450,
		is_gif,
		scrubber_media_url,
		dash_url
		// transcoding_status
	}) => {
		return is_video === true &&
			stickied !== true &&
			post_hint !== 'self' &&
			is_self !== true &&
			hls_url &&
			is_reddit_media_domain === true ? (
			<Container>
				<div className='flex flex-grow mx-auto w-full align-middle max-h-100'>
					<AudioConfigComp>
						<Audio
							id='reddit-audio'
							src={fallback_url ?? dash_url}
							aria-controls={`${Video}`}
							loop={true}
							autoPlay={true}
							preload='auto'
						>
							<VideoConfigComp>
								<VideoConfig />
							</VideoConfigComp>
						</Audio>
					</AudioConfigComp>
					<div className='flex col-span-3'>
						<div className='mr-4 flex-shrink-0'>
							{thumbnail ? (
								<Image
									src={thumbnail ?? '/doge-404.jpg'}
									width={56}
									height={56}
									priority
									className='inline-block h-16 w-16'
								/>
							) : (
								<svg
									className='h-16 w-16 border border-gray-300 bg-white text-gray-300'
									preserveAspectRatio='none'
									stroke='currentColor'
									fill='none'
									viewBox='0 0 200 200'
									aria-hidden='true'
								>
									<path
										vectorEffect='non-scaling-stroke'
										strokeWidth='1'
										d='M0 0l200 200M0 200L200 0'
									/>
								</svg>
							)}
						</div>
						{/* <div>
							<h4 className='text-lg font-bold text-gray-700'>
								{comments.author_fullname}
							</h4>

							{comments.body_html ? (
								<ReactMarkdown
									children={comments.body_html}
									plugins={[gfm]}
									allowDangerousHtml={true}
									className='mt-1'
								/>
							) : (
								<ReactMarkdown
									children={comments.body}
									plugins={[gfm]}
									className='mt-1'
								/>
							)}
						</div> */}
					</div>
				</div>
			</Container>
		) : is_gif === true ? (
			<Container>🧙‍♂️</Container>
		) : (
			<></>
		);
	};
	return (
		<>
			<div className=''>
				<div
					className={cn('flex text-somaDisplay prose-sm', css.prose)}
				>
					<div className='inline-flex'>
						<div className='w-auto'>
							<p className='my-auto align-middle block'>
								<VotingArrow className='inline-block h-10 my-auto align-top' />
							</p>
						</div>
						<div className='inline-flex text-gray-700 align-top justify-items-center my-1 prose-lg mr-2 font-semibold'>
							{ups}
						</div>
					</div>
					<div className='flex'>
						<div className='mr-4 flex-shrink-0'>
							{thumbnail ? (
								<>
									<Image
										src={'/reddit-next.png'}
										width={2}
										height={28}
										priority
										className='inline-block h-16 w-16 overflow-x-hidden overflow-y-hidden align-middle my-auto'
									/>
									{/* <div className='pr-4'>
												<h4 className='text-lg font-bold text-gray-700'>
													{title}
												</h4>

												<ReactMarkdown
													children={selftext_html ? selftext_html : selftext}
													plugins={[gfm]}
													allowDangerousHtml={selftext_html ? true : false}
													className='mt-1 text-gray-600 prose-sm'
												/>
											</div> */}
								</>
							) : (
								<svg
									className='h-16 w-16 border border-gray-300 text-gray-300'
									preserveAspectRatio='none'
									stroke='currentColor'
									fill='none'
									viewBox='0 0 200 200'
									aria-hidden='true'
								>
									<path
										vectorEffect='non-scaling-stroke'
										strokeWidth='1'
										d='M0 0l200 200M0 200L200 0'
									/>
								</svg>
							)}
						</div>
						<div className='align-top'>
							<h4 className='text-xl font-bold text-gray-700 align-top my-0 font-sans'>
								{title}
							</h4>

							{selftext_html ? (
								<ReactMarkdown
									children={selftext_html}
									plugins={[gfm]}
									allowDangerousHtml={true}
									className='mt-1 text-gray-700'
								/>
							) : (
								<ReactMarkdown
									children={selftext}
									plugins={[gfm]}
									className='mt-1 text-gray-700'
								/>
							)}
						</div>
						<div className='ml-6 mt-4 prose-sm text-left sm:text-justify'></div>
					</div>
				</div>
				<div className={cn('w-full min-w-full', css.prose)}>
					<IsVideo
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
					/>
				</div>
				{children}
			</div>
			<hr className='w-full bg-gray-200 z-100 min-w-full my-4 h-1' />
		</>
	);
};

export default SubmissionTemplate;

/*
		// const [bg] = useState(useMemo(() => ColorsSvg(), []));

		// let newPathref = useRef() as React.MutableRefObject<SVGSVGElement>;

		// useEffect(() => {
		// 	if (newPathref != null && newPathref.current != null) {
		// 		newPathref.current.style.background = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`;
		// 	}
		// }, [bg]);

		// const vid = document.querySelector('video');

		// let newvideo = useRef() as React.MutableRefObject<HTMLHtmlElement>;
		// useEffect(() => {}, []);
		<option selected>fullHD</option>
		<option>720p</option>
		<option>360p</option>
		</select>

			const [state, setState] = useSetState<Partial<HTMLMediaState>>(
		{
		paused: true,
		volume: 3,
		muted: false
		}
		);
		const wrapEvent = (userEvent: any, proxyEvent?: any) => {
			return (
				event: any | React.ChangeEvent | React.SyntheticEvent
			) => {
				try {
					proxyEvent && proxyEvent(event);
				} finally {
					userEvent && userEvent(event);
				}
			};
		};
		const ref = useRef<HTMLAudioElement | null>(null);
		const onVolChange = () => {
			const el = ref.current;
			if (!el) {
				return;
			}
			setState({
				muted: el.muted,
				volume: el.volume
			});
		};
		const controls = {
			volume: (volume: number) => {
				const el = ref.current;
				if (!el) {
					return;
				}
				volume = Math.min(1, Math.max(0, volume));
				el.volume = volume;
				setState({ volume });
			},
			mute: () => {
				const el = ref.current;
				if (!el) {
					return;
				}
				el.muted = true;
			},
			unmute: () => {
				const el = ref.current;
				if (!el) {
					return;
				}
				el.muted = false;
			}
		};
*/
```
