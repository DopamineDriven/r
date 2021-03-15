import { FC, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import css from './Searchbar.module.css';
import { useRouter } from 'next/router';
import { Input } from '../UI';
import { filterQuery } from '../../lib/helpers';

interface Props {
	className?: string;
	id?: string;
}

const Searchbar: FC<Props> = ({ className, id = 'r/' }) => {
	const router = useRouter();
	const [value, setValue] = useState('');
	useEffect(() => {
		// router.prefetch(url, as)
		router.prefetch('/r/[display_name]', `/r/${router.query}`, {
			priority: true
		});
	}, [value]);

	return useMemo(
		() => (
			<div
				className={cn(
					'relative bg-accents-1 text-base w-full transition-colors duration-150',
					className
				)}
			>
				<label className='sr-only' htmlFor={id}>
					/r/ - search by subreddit name
				</label>
				<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
					<span className='text-gray-100 font-semibold sm:text-base'>
						/r/
					</span>
				</div>
				<Input
					id={id}
					name={id}
					onChange={setValue}
					className={css.input}
					// placeholder='/r/'
					defaultValue={
						router && router.query ? (router.query.q as string) : ''
					}
					onKeyUp={e => {
						e.preventDefault();

						if (e.key === 'Enter') {
							const q = e.currentTarget.value;

							router.push(
								{
									pathname: `/r/${q}`,
									query: q ? filterQuery({ q }) : {}
								},
								undefined,
								{ shallow: true }
							);
						}
					}}
				/>
				<div className={css.iconContainer}>
					<svg
						className={css.icon}
						fill='rgb(229, 231, 235)'
						viewBox='0 0 20 20'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
						/>
					</svg>
				</div>
			</div>
		),
		[]
	);
};

export default Searchbar;

/**
 *@FUTURE -- incorporate sorting via Sort Type
 *export type Sort = 'confidence' | 'top' | 'new' | 'controversial' | 'old' | 'random' | 'qa';


 
const useInitialMount = () => {
	const isFirst = useRef(true);
	if (isFirst.current) {
		isFirst.current = false;
		return true;
	}
	return false;
};

	const isInitialMount = useInitialMount();


		useEffect(() => {
		// router.prefetch(url, as)
		router.prefetch('/r/[display_name]', `/r/${q}`, {
			priority: true
		});

		if (isInitialMount) {
			new TrackEvent(value);
		}
	}, [value]);
 */
