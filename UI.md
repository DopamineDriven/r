## UI-Components of high potential for future use

### Audio

```tsx
import {
	AudioHTMLAttributes,
	FC,
	forwardRef,
	JSXElementConstructor,
	useRef
} from 'react';
import cn from 'classnames';
import css from './audio.module.css';
import mergeRefs from 'react-merge-refs';
import LoadingSpinner from '../LoadingSpinner';

export interface AudioProps
	extends AudioHTMLAttributes<HTMLAudioElement> {
	// mixin ftw
	onChange: (...args: any[]) => any;
	className?: string;
	variant: 'flat' | 'slim';
	type?: 'submit' | 'reset' | 'button';
	Component?: string | JSXElementConstructor<any>;
	loading?: boolean;
	disabled?: boolean;
	active?: boolean;
	width?: string | number;
	playing?: boolean;
}

const Audio: FC<AudioProps> = forwardRef((props, audioRef) => {
	const {
		className,
		onChange,
		variant,
		id,
		children,
		src,
		onPlay,
		loading,
		loop,
		disabled,
		onPlayCapture,
		onCanPlay,
		onPlayingCapture,
		controls,
		preload,
		Component = 'button',
		active,
		playsInline,
		autoPlay,
		type,
		onPlaying,
		playing,
		width,
		style = {},
		...a
	} = props;

	const ref = useRef<typeof Component>(null);

	const rootClassName = cn(
		css.root,
		{
			[css.slim]: variant === 'slim',
			[css.loading]: loading,
			[css.disabled]: disabled,
			[css.playing]: playing
		},
		className
	);

	return (
		<Component
			autoPlay={autoPlay}
			preload={preload}
			loop={loop}
			controls={controls}
			muted={false}
			webkit-playsinline='true'
			playsInline={playsInline}
			src={src}
			aria-pressed={active}
			onPlay={onPlay}
			onPlaying={onPlaying}
			onCanPlay={onCanPlay}
			onChange={onChange}
			onPlayCapture={onPlayCapture}
			onPlayingCapture={onPlayingCapture}
			data-variant={variant}
			ref={mergeRefs([ref, audioRef])}
			className={rootClassName}
			disabled={disabled}
			playing={playing}
			style={{
				width,
				...style
			}}
			{...a}
		>
			{children}
			{loading && (
				<i className='pl-2 m-0 flex'>
					<LoadingSpinner className='transform-gpu transition-all duration-150 animate-spin' />
				</i>
			)}
		</Component>
	);
});

export default Audio;
```

### Media Hook

```tsx
import React from 'react';
import useSetState from '../useSetState/use-set-state';
import { parseTimeRanges } from '@/lib/helpers';

export interface HTMLMediaProps
	extends React.AudioHTMLAttributes<any>,
		React.VideoHTMLAttributes<any> {
	src: string;
}

export interface HTMLMediaState {
	buffered: any[];
	duration: number;
	paused: boolean;
	muted: boolean;
	time: number;
	volume: number;
}

export interface HTMLMediaControls {
	play: () => Promise<void> | void;
	pause: () => void;
	mute: () => void;
	unmute: () => void;
	volume: (volume: number) => void;
	seek: (time: number) => void;
}

type createHTMLMediaHookReturn = [
	React.ReactElement<HTMLMediaProps>,
	HTMLMediaState,
	HTMLMediaControls,
	{ current: HTMLAudioElement | null }
];

export default function AudioVideoHook(tag: 'audio' | 'video') {
	return (
		elOrProps: HTMLMediaProps | React.ReactElement<HTMLMediaProps>
	): createHTMLMediaHookReturn => {
		let element: React.ReactElement<any> | undefined;
		let props: HTMLMediaProps;

		if (React.isValidElement(elOrProps)) {
			element = elOrProps;
			props = element.props;
		} else {
			props = elOrProps as HTMLMediaProps;
		}

		const [state, setState] = useSetState<HTMLMediaState>({
			buffered: [],
			time: 0,
			duration: 0,
			paused: true,
			muted: false,
			volume: 1
		});
		const ref = React.useRef<HTMLAudioElement | null>(null);

		// to-do: resolve any types
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

		const onPlay = () => setState({ paused: false });
		const onPause = () => setState({ paused: true });
		const onVolumeChange = () => {
			const el = ref.current;
			if (!el) {
				return;
			}
			setState({
				muted: el.muted,
				volume: el.volume
			});
		};
		const onDurationChange = () => {
			const el = ref.current;
			if (!el) {
				return;
			}
			const { duration, buffered } = el;
			setState({
				duration,
				buffered: parseTimeRanges(buffered)
			});
		};
		const onTimeUpdate = () => {
			const el = ref.current;
			if (!el) {
				return;
			}
			setState({ time: el.currentTime });
		};
		const onProgress = () => {
			const el = ref.current;
			if (!el) {
				return;
			}
			setState({ buffered: parseTimeRanges(el.buffered) });
		};

		if (element) {
			element = React.cloneElement(element, {
				controls: false,
				...props,
				ref,
				onPlay: wrapEvent(props.onPlay, onPlay),
				onPause: wrapEvent(props.onPause, onPause),
				onVolumeChange: wrapEvent(
					props.onVolumeChange,
					onVolumeChange
				),
				onDurationChange: wrapEvent(
					props.onDurationChange,
					onDurationChange
				),
				onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
				onProgress: wrapEvent(props.onProgress, onProgress)
			});
		} else {
			element = React.createElement(tag, {
				controls: false,
				...props,
				ref,
				onPlay: wrapEvent(props.onPlay, onPlay),
				onPause: wrapEvent(props.onPause, onPause),
				onVolumeChange: wrapEvent(
					props.onVolumeChange,
					onVolumeChange
				),
				onDurationChange: wrapEvent(
					props.onDurationChange,
					onDurationChange
				),
				onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
				onProgress: wrapEvent(props.onProgress, onProgress)
			} as any); // TODO: fix this typing.
		}

		// Some browsers return `Promise` on `.play()` and may throw errors
		// if one tries to execute another `.play()` or `.pause()` while that
		// promise is resolving. So we prevent that with this lock.
		// See: https://bugs.chromium.org/p/chromium/issues/detail?id=593273
		let lockPlay: boolean = false;

		const controls = {
			play: () => {
				const el = ref.current;
				if (!el) {
					return undefined;
				}

				if (!lockPlay) {
					const promise = el.play();
					const isPromise = typeof promise === 'object';

					if (isPromise) {
						lockPlay = true;
						const resetLock = () => {
							lockPlay = false;
						};
						promise.then(resetLock, resetLock);
					}

					return promise;
				}
				return undefined;
			},
			pause: () => {
				const el = ref.current;
				if (el && !lockPlay) {
					return el.pause();
				}
			},
			seek: (time: number) => {
				const el = ref.current;
				if (!el || state.duration === undefined) {
					return;
				}
				time = Math.min(state.duration, Math.max(0, time));
				el.currentTime = time;
			},
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

		React.useEffect(() => {
			const el = ref.current!;

			if (!el) {
				if (process.env.NODE_ENV !== 'production') {
					if (tag === 'audio') {
						console.error(
							'useAudio() ref to <audio> element is empty at mount. ' +
								'It seem you have not rendered the audio element, which it ' +
								'returns as the first argument const [audio] = useAudio(...).'
						);
					} else if (tag === 'video') {
						console.error(
							'useVideo() ref to <video> element is empty at mount. ' +
								'It seem you have not rendered the video element, which it ' +
								'returns as the first argument const [video] = useVideo(...).'
						);
					}
				}
				return;
			}

			setState({
				volume: el.volume,
				muted: el.muted,
				paused: el.paused
			});

			// Start media, if autoPlay requested.
			if (props.autoPlay && el.paused) {
				controls.play();
			}
		}, [props.src]);

		return [element, state, controls, ref];
	};
}
```

### UseVideo

```tsx
import AudioVideoHook from '../MediaHook/media-hook';

const useVideoHook = AudioVideoHook('video');

export default useVideoHook;
```

### Video

```tsx
import cn from 'classnames';
import React, { VideoHTMLAttributes } from 'react';
import useVideoHook from '../useVideo';
import Button from '../Button';

export interface VideoProps
	extends VideoHTMLAttributes<HTMLVideoElement> {
	className?: string;
	onChange?: (...args: any[]) => any;
	epiClassName?: string;
}
const Video: React.FC<VideoProps> = ({
	className,
	onChange,
	children,
	epiClassName,
	src,
	...rest
}) => {
	const handleOnChange = (
		e: React.ChangeEvent<HTMLVideoElement>
	) => {
		if (onChange) {
			onChange(e.target.nodeValue);
		}
		return null;
	};
	const [video, state, controls, ref] = useVideoHook(
		<video
			src={src}
			autoPlay
			loop
			playsInline
			controls
			preload='auto'
			controlsList='nodownload; encrypted'
			className={cn(className, '')}
			onChange={handleOnChange}
			{...rest}
		>
			<source type={'video/mp4'} src={src} />
			<source type='video/webm' src={src} />
			<source type='application/dash+xml' src={src} />
		</video>
	);
	return (
		<h4 className={cn(epiClassName, '')}>
			{children}
			<div>
				{video && ref.current}
				<pre>{JSON.stringify(state, null, 2)}</pre>
				<Button onClick={controls.pause}>Pause</Button>
				<Button onClick={controls.play}>Play</Button>
				<br />
				<Button onClick={controls.mute}>Mute</Button>
				<Button onClick={controls.unmute}>Un-mute</Button>
				<br />
				<Button onClick={() => controls.volume(0.1)}>
					Volume: 10%
				</Button>
				<Button onClick={() => controls.volume(0.5)}>
					Volume: 50%
				</Button>
				<Button onClick={() => controls.volume(1)}>
					Volume: 100%
				</Button>
				<br />
				<Button onClick={() => controls.seek(state.time - 5)}>
					-5 sec
				</Button>
				<Button onClick={() => controls.seek(state.time + 5)}>
					+5 sec
				</Button>
			</div>
		</h4>
	);
};

export default Video;
```
