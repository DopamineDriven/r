import { FC } from 'react';
import cn from 'classnames';
import css from './submission.module.css';
import UpvoteTitleThumbnailDescription from './upvote-title-description';
import Image from 'next/image';
import { MediaExtend } from '@/types/landing';
import { Container } from '@/components/UI';
// import { useGlobal } from '../Context/index';

const SubmissionImage: FC<MediaExtend> = ({
	title,
	post_hint,
	selftext,
	thumbnail,
	id,
	selftext_html,
	url,
	ups,
	children
}) => {
	// const { openModal, setModalView } = useGlobal();
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
				{post_hint === 'image' && url != null ? (
					<div className={cn('w-full min-w-full', css.prose)}>
						<Container
							clean
							className={'mx-auto max-w-5xl lg:max-w-6xl'}
						>
							<div
								className='flex flex-grow max-w-4xl mx-auto w-full align-middle '
								style={{ maxHeight: '60vh' }}
								// onClick={e => {
								// 	e.preventDefault();
								// 	openModal('OPEN_MODAL');
								// 	setModalView('IMAGE_VIEW');
								// }}
							>
								<Image
									id={id}
									layout='intrinsic'
									src={url}
									objectFit='cover'
									height={'680'}
									width={'680'}
									quality={100}
									className={cn(
										'w-full min-w-full h-full min-h-full mx-auto justify-center outline-none focus:outline-none col-span-1 max-w-4xl py-10',
										css.prose
									)}
								/>
							</div>
						</Container>
					</div>
				) : (
					<></>
				)}
			</div>
			<hr className='w-full bg-gray-200 z-100 min-w-full my-4 h-1' />
		</>
	);
};

export default SubmissionImage;
