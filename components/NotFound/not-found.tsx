import Image from 'next/image';
import Link from 'next/link';
import css from './not-found.module.css';

export default function WowNotFound() {
	return (
		<div className='text-center text-3xl text-gray-300 m-auto space-y-4 pb-12 '>
			<p>
				Not Amaze. Many&nbsp;
				<Link href='/' passHref>
					<a className={css.wow}>Return Home</a>
				</Link>
				.
			</p>
			<div>
				<Image
					priority
					src={'/doge-404.jpg'}
					width={500}
					height={720}
					alt='wow. not found.'
					aria-orientation='vertical'
				/>
			</div>
		</div>
	);
}
