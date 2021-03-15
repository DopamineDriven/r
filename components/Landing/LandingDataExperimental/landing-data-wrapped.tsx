import cn from 'classnames';
import { FC } from 'react';
import css from './landing-data-wrapper.module.css';

export interface LandingDataWrapperProps {
	root?: string;
}

const LandingDataWrapper: FC<LandingDataWrapperProps> = ({
	root,
	children
}) => {
	return (
		<div
			className={cn(
				root,
				'relative bg-primary-9 pt-8 sm:pt-4 lg:pt-0 pb-16 px-4 sm:px-6 lg:pb-24 lg:px-8 select-none'
			)}
		>
			<div className='absolute inset-0'>
				<div className='bg-primary-9 h-1/3 sm:h-1/4 ' />
			</div>
			<div className='relative max-w-6xl mx-auto'>
				<div className='text-center'>
					<h2 className='text-3xl tracking-tight font-extrabold text-primary-0 sm:text-4xl'>
						Subreddit Search Preview Photos
					</h2>
				</div>
				<div className={cn(css.gridDiv, ' group-hover:opacity-75')}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default LandingDataWrapper;
