import { FC, useEffect, useState } from 'react';
import { useSWRInfinite } from 'swr';
import { swrFetcher } from '@/lib/helpers';
import { Button, Fallback, LoadingSpinner } from '../UI';
import { useRouter } from 'next/router';
import SubmissionCoalesced, {
	SubmissionCoalescedProps
} from '../Submission/submission-coalesced';
import { useInView } from 'react-intersection-observer';
import { CustomSubmissionType } from '../../types/data-handling';
import useSWR from 'swr';
import NotFound from '@/components/NotFound';

const FetchMore: FC<SubmissionCoalescedProps> = ({
	subCoalesced
}) => {
	const [ref, inView] = useInView({
		rootMargin: '200px 0px'
	});
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [submissions, setSubmissions] = useState<
		CustomSubmissionType[] | never[]
	>([]);
	const [clicked, setClicked] = useState(false);
	const [
		lastSubmission,
		setLastSubmission
	] = useState<CustomSubmissionType | null>(null);

	const popSubmission = subCoalesced.pop();
	const popId = popSubmission?.author_fullname;
	const { query } = useRouter();
	const q = (query.q as string) ?? 'snowboarding';

	function clearState() {
		setSubmissions([]);
		setLastSubmission(null);
		setClicked(false);
	}

	async function loadMoreSubmissions() {
		setLoadingMore(true);
		const { data } = useSWR(
			`/api/snooSubmissions?q=${q}&limit=10&after=${popId}`,
			swrFetcher
		);
		clearState();
		setSubmissions(data.json());
		setLastSubmission(data.pop().author_fullname);
		setLoading(false);
		setClicked(true);
	}

	useEffect(() => {
		loadMoreSubmissions();
	}, [subCoalesced]);

	useEffect(() => {
		if (clicked) {
			loadMoreSubmissions();
		}
	}, [inView]);

	if (loading) {
		return <Fallback />;
	}

	return (
		<>
			{subCoalesced && subCoalesced.length > 0 ? (
				<>
					<SubmissionCoalesced subCoalesced={subCoalesced} />
					<Button
						{...ref}
						onClick={loadMoreSubmissions}
						className='flex items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-primary-1 bg-opacity-25 bg-white ring-2 ring-primary-1 ring-inset hover:bg-primary-8 hover:text-primary-0 sm:px-8 z-50 transition-colors duration-150'
					>
						{loadingMore ? <LoadingSpinner /> : 'Load More'}
					</Button>
				</>
			) : (
				<>
					<NotFound />
				</>
			)}
		</>
	);
};

export default FetchMore;
/*
	const pop = submissionDeserialized.pop();
	console.log(pop!.author_fullname);
	const { query } = useRouter();
	const q = (query.q as string) ?? 'snowboarding';
	const data = useSWR(
		`/api/snooSubmissions?q=${display_name ?? q}&limit=10&after=${
			pop?.author_fullname
		}`,
		swrFetcher
	);
	console.log(data);

	const fetchMore = (
		<Button
			onClick={() => data}
			className='flex items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-primary-1 bg-opacity-25 bg-white ring-2 ring-primary-1 ring-inset hover:bg-primary-8 hover:text-primary-0 sm:px-8 z-50 transition-colors duration-150'
		>
			{'Fetch More'}
		</Button>
	);
*/
