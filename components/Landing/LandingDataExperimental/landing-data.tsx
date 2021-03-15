import cn from 'classnames';
import css from './landing-data.module.css';
import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LandingProps } from '@/types/landing';
import { Fallback } from '../../UI';

export interface PicPreviewProps extends LandingProps {
	root?: string;
}

const Pics: FC<PicPreviewProps> = ({
	root,
	id,
	url,
	display_name,
	title,
	display_name_prefixed
}) => {
	const [loading, setLoading] = useState(false);

	const urlConditional = url ? url : '/cover-aesthetic.jpg';
	return (
		<div
			className={cn(
				root,
				'flex flex-col text-center rounded-lg shadow-lg overflow-hidden group-hover:bg-opacity-50 hover:shadow-cardHover'
			)}
		>
			<Link
				href={'/r/[display_name]'} // = /r/subreddit/query
				as={`/r/${display_name}`}
				key={title}
				passHref={true}
			>
				<a
					aria-label={`${title}`}
					id={`${display_name}`}
					key={display_name_prefixed}
				>
					{loading && typeof window !== undefined ? (
						<Fallback />
					) : !loading ? (
						<Image
							key={id}
							src={urlConditional}
							priority
							quality={80}
							width={300}
							height={300}
							className={css.img}
						/>
					) : (
						<></>
					)}
				</a>
			</Link>
			<Link
				href={'/r/[display_name]'} // = /r/subreddit/query
				as={`/r/${display_name}`}
				key={id}
				passHref={true}
			>
				<a
					className={cn(
						'flex-1 flex flex-col justify-between transition-transform transform -translate-y-52 z-50 -mb-8',
						css.title,
						css['md']
					)}
					key={title}
				>
					<p
						key={title}
						className={cn(
							css['md'],
							'text-2xl font-sans font-semibold text-primary-9 hover:text-primary-8 z-50'
						)}
					>
						{`/${display_name_prefixed}`}
					</p>
				</a>
			</Link>
		</div>
	);
};

export default Pics;
