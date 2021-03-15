import { FC } from 'react';
// import cn from 'classnames';
// import css from './submission.module.css';
import UpvoteTitleThumbnailDescription from './upvote-title-description';
import Image from 'next/image';
import { MediaExtend } from '@/types/landing';
import { Container } from '@/components/UI';

const SubmissionGif: FC<MediaExtend> = ({
	title,
	selftext,
	thumbnail,
	selftext_html,
	url,
	is_gif,
	ups,
	children
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
				<div className='text-base text-right '>{children}</div>
				{is_gif === true && url != null ? (
					<>
						<Container
							clean
							className={'mx-auto max-w-5xl lg:max-w-6xl'}
						>
							<div
								className='flex flex-grow max-w-4xl mx-auto w-full align-middle '
								style={{ maxHeight: '60vh' }}
							>
								<video
									src={url}
									preload='auto'
									controls
									controlsList={'nodownload'}
									loop={false}
									muted
									autoPlay={false}
									webkit-playsinline='true'
									playsInline={true}
									height={'480'}
									width={'640'}
									className='w-full min-w-full mx-auto justify-center outline-none focus:outline-none col-span-1 max-w-4xl'
								></video>
							</div>
						</Container>
					</>
				) : url?.includes('gif') ? (
					<>
						<Container
							clean
							className={'mx-auto max-w-5xl lg:max-w-6xl'}
						>
							<div
								className='flex flex-grow max-w-4xl mx-auto w-full align-middle '
								style={{ maxHeight: '60vh' }}
							>
								<Image
									src={url}
									width={600}
									height={500}
									objectFit={'cover'}
								/>
							</div>
						</Container>
					</>
				) : (
					<></>
				)}
			</div>
			<hr className='w-full bg-gray-200 z-100 min-w-full my-4 h-1' />
		</>
	);
};

export default SubmissionGif;
