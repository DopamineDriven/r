### RenderVideo.tsx

```tsx
import { FC, useState, IframeHTMLAttributes } from 'react';
import cn from 'classnames';

interface RenderVidProps
	extends IframeHTMLAttributes<HTMLIFrameElement> {
	className?: string;
	iClassName?: string;
	autoplay?: boolean;
	overlay: string;
	// mixin
	onChange?: (...args: any[]) => any;
}

const Vid: FC<RenderVidProps> = ({
	src,
	width,
	height,
	autoplay,
	onChange,
	overlay,
	className,
	iClassName,
	...i
}) => {
	const [showIsVideo, setShowIsVideo] = useState(false);

	const renderVid = (
		<audio>
			<iframe
				onChange={onChange}
				width={width}
				height={height}
				src={src + '?autoplay=1'}
				frameBorder='0'
				allowFullScreen={true}
				allow={`autplay; encrypted-media`}
				allowTransparency={true}
				onVolumeChangeCapture={onChange}
				className={cn('my-5', iClassName)}
			/>
		</audio>
	);

	const handleShowVideo = () => {
		setShowIsVideo(true);
	};

	if (showIsVideo === true) {
		return renderVid;
	}

	return (
		<>
			<div className='mx-auto px-4 md:px-6'>{renderVid}</div>
		</>
	);
};

export default Vid;
```

### SecureVideo.tsx

```tsx
import { FC } from 'react';
import cn from 'classnames';
import Submission from 'snoowrap/dist/objects/Submission';
import { JSONified } from '@/types/json';
import Image from 'next/image';
import { UndefinedAsNull } from '../../types/json';

const SecureVideo: FC<
	JSONified<UndefinedAsNull<Submission>>
> = ({ secure_media, media_embed }) => {
	return (
		<>
			{secure_media !== null &&
			secure_media.oembed != null &&
			media_embed != null &&
			media_embed.content != null &&
			secure_media.reddit_video != null ? (
				<video
					autoPlay
					controls
					loop
					muted
					playsInline
					className='card-video'
					src={
						secure_media.oembed.html ??
						secure_media.reddit_video.dash_url
							? secure_media.reddit_video.dash_url
							: secure_media.reddit_video.fallback_url
					} // Replace .gifv with .mp4.
					height='480'
					width='640'
				/>
			) : media_embed != null &&
			  media_embed.content != null &&
			  media_embed.height != null &&
			  media_embed.width != null ? (
				<Image
					src={media_embed.content}
					width={media_embed.width}
					height={media_embed.height}
					priority
				/>
			) : (
				<></>
			)}
		</>
	);
};
export default SecureVideo;
```
