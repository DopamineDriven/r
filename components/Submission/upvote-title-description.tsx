import { FC } from 'react';
import { SubmissionProps } from '@/types/data-handling';
import css from './submission.module.css';
import cn from 'classnames';
import ReactMarkdown from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import { VotingArrow } from '../UI/Icons';
import { Container } from '@/components/UI';

const UpvoteTitleThumbnailDescription: FC<
	Partial<SubmissionProps>
> = ({ selftext, selftext_html, ups, title }) => {
	return (
		<div className={cn('flex font-sans prose-sm', css.prose)}>
			<Container clean className='absolute'>
				<div className='grid grid-rows-3'>
					<div className='absolute ml-1 -top-2 text-gray-700 align-bottom justify-items-center prose sm:prose-xl font-semibold my-auto row-span-1 mx-auto transition-transform'>
						<VotingArrow className='inline-block h-6 sm:h-10 my-auto align-bottom mx-auto' />
					</div>
					<div
						className={cn(
							'absolute w-10 top-4 lg:top-5 text-gray-700 align-bottom justify-items-center font-semibold my-auto row-span-1 justify-center transition-transform mx-auto text-center',
							{
								prose: ups! >= 1000,
								'prose-lg': ups! < 1000
							}
						)}
					>
						<div className='text-center'>
							{ups && ups >= 1000 ? ups.toLocaleString() : ups}
						</div>
					</div>
					<div className='absolute ml-1 top-11 lg:top-10 text-gray-700 align-bottom justify-items-center prose sm:prose-xl font-semibold my-auto row-span-1 transition-transform mx-auto'>
						<VotingArrow className='sm:h-10 h-6 my-auto align-top rotate-180 transform ' />
					</div>
				</div>
			</Container>
			<br />
			<div className='flex py-auto align-center pt-4 relative'>
				<div className='align-top'>
					<h4 className='text-xl relative pl-10 font-bold text-gray-700 align-top my-0 font-sans ml-5 mt-1'>
						{title}
					</h4>
					<ReactMarkdown
						children={selftext ? selftext : selftext_html ?? ''}
						plugins={[gfm]}
						allowDangerousHtml={selftext ? false : true}
						className={cn(
							'mt-1 pt-1 text-gray-700 sm:text-lg text-sm ',
							css.prose
						)}
					/>
				</div>
				<div className='ml-6 mt-4 prose-sm text-left sm:text-justify'></div>
			</div>
		</div>
	);
};

export default UpvoteTitleThumbnailDescription;

/*
	const ThumbnailConditional: FC<{ thumbnail?: string }> = ({
		thumbnail
	}) => (
		<Media greaterThanOrEqual='sm'>
			<div className='relative aspect-w-10 aspect-h-4 sm:h-10 my-auto align-bottom mx-auto'>
				{thumbnail ? (
					<>
						<Image
							src={'/reddit-next.png'}
							width={28}
							height={28}
							priority
							className='inline-block h-16 w-16 overflow-x-hidden overflow-y-hidden align-middle my-auto'
						/>
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
		</Media>
	);
*/
