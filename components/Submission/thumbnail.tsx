import { FC } from 'react';
import { Media } from '@/lib/artsy-fresnel';
import Image from 'next/image';

const ThumbnailConditional: FC<{ thumbnail?: string }> = ({
	thumbnail
}) => {
	return (
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
};

export default ThumbnailConditional;
