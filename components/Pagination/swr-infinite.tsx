import { useSWRInfinite } from 'swr';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import cn from 'classnames';
// import { Submission } from 'snoowrap/dist/objects';
import { CustomSubmissionType } from '@/types/data-handling';
import axios from 'axios';
import { Button, LoadingSpinner } from '../UI';
import { FC } from 'react';
import { Submission } from 'snoowrap/dist/objects';

async function swrFetcher(path: string) {
	const res = await fetch(path);
	return res.json();
}

interface LoadMoreProps {
	q?: string;
	submissions: CustomSubmissionType[] | null;
}

const LoadMore: FC<LoadMoreProps> = ({
	q,
	submissions,
	children
}) => {
	const PAGE_LIMIT = 5;
	const getCacheKey = (
		pageIndex: number,
		prevPageData: any | Record<string, unknown>
	) => {
		if (pageIndex === 0) {
			return `/api/snooSubmissions?q=${q}&limit=${PAGE_LIMIT}&sort=-1`;
		}

		if (prevPageData.length < PAGE_LIMIT) {
			console.log('end of list');
			return null;
		}

		const lastSubmission: CustomSubmissionType =
			prevPageData[prevPageData.length - 1];
		return `/api/snooSubmissions?q=${q}&limit=${PAGE_LIMIT}&offset=${lastSubmission.id}&sort=-1`;
	};

	const { data, mutate, size, setSize } = useSWRInfinite(
		getCacheKey,
		swrFetcher
	);

	if (data) {
		submissions = [];
		for (const pageData of data) {
			submissions = [...submissions, pageData];
		}
	}

	const renderLoadMore = () => {
		if (!submissions) {
			return null;
		}

		// waiting for data to populate
		if (data && size > data.length) {
			return (
				<span className='w-40 h-40 mx-auto'>
					<LoadingSpinner />
				</span>
			);
		}

		// detect end of data array
		if (PAGE_LIMIT * size > submissions!.length) {
			return null;
		}
		return (
			<a
				href='#'
				className='flex items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-primary-1 bg-opacity-25 bg-white ring-2 ring-primary-1 ring-inset hover:bg-primary-8 hover:text-primary-0 sm:px-8 z-50 transition-colors duration-150'
				onClick={e => {
					e.preventDefault();
					setSize(size + 1);
				}}
			>
				Load more
			</a>
		);
	};

	const handleLoadMoreData = async (content: any) => {
		try {
			await axios.post(`/api/snooSubmissions?q=${q}`, {
				content
			});
			await mutate();
		} catch (err) {
			const alertMessage = err.response
				? err.response.data
				: err.message;
			alert(alertMessage);
		}
	};

	if (!submissions) {
		return (
			<div className='w-40 h-40 mx-auto'>
				<LoadingSpinner />
				{'loading...'}
				<LoadingSpinner />
			</div>
		);
	}
	const submissionsdestructured = submissions!.map(sub => (
		<div
			key={sub.id}
			className={cn({
				submission: true
			})}
		>
			<div className='mx-auto'>{children}</div>
		</div>
	));
	return (
		<div>
			<Button
				className='flex items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-primary-1 bg-opacity-25 bg-white ring-2 ring-primary-1 ring-inset hover:bg-primary-8 hover:text-primary-0 sm:px-8 z-50 transition-colors duration-150'
				onSubmit={handleLoadMoreData}
			>
				{'Load More'}
			</Button>
			{submissions && submissions.length > 0 ? (
				<div>
					{submissionsdestructured}
					{renderLoadMore()}
				</div>
			) : (
				<div>
					<div className='text-2xl'>
						No {submissions.length > 0 ? 'additional' : ''} submissions
						found.
					</div>
				</div>
			)}
		</div>
	);
};

export default LoadMore;

// https://github.com/arunoda/bulletproof-next-app/blob/add-pagination-for-comments-final/pages/api/comments.js
