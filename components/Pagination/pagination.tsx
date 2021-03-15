import useSWR from 'swr';
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { filterQuery } from '../../lib/helpers';
import { Button } from '../UI';
import fetch from 'isomorphic-unfetch';
import NotFound from '@/components/NotFound';

// experimental

const fetcher = (url: string) => fetch(url).then(r => r.json());

const LoadMore: FC = () => {
	const [sleeping, setSleeping] = useState(true);

	const { query } = useRouter();

	const q = query.display_name as string;
	const { data, error } = useSWR(
		sleeping ? null : `/api/snooSubmissions?q=${q}`,
		fetcher
	);

	useEffect(() => {
		setTimeout(() => {
			setSleeping(false);
		}, 3000);
	}, []);

	if (error)
		return (
			<div>
				<NotFound />
			</div>
		);
	if (!data) return <div>{'loading for 3 seconds...'}</div>;
	return (
		<Button
			variant='slim'
			type='button'
			onChange={data}
			className='flex items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-primary-1 bg-opacity-25 bg-white ring-2 ring-primary-1 ring-inset hover:bg-primary-8 hover:text-primary-0 sm:px-8 z-50 transition-colors duration-150'
		>
			{'Fetch More Posts'}
		</Button>
	);
};

export default LoadMore;
