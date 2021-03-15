import { FC, MouseEventHandler, useState } from 'react';
import { CustomSubredditType } from '@/types/data-handling';
import { Button } from '../UI';
import Link from 'next/link';
import Head from 'next/head';
import { Meta } from '../Meta';
import SubmissionCoalesced, {
	SubmissionCoalescedProps
} from '../Submission/submission-coalesced';
import { Navbar } from '../Navbar';
import NotFound from '../NotFound';
import SubredditPost from './subreddit';
import { FetchMore } from '../FetchMore';

export interface SubredditCoalescedProps
	extends SubmissionCoalescedProps {
	subreddCoalesced: CustomSubredditType[];
}

const SubredditCoalesced: FC<SubredditCoalescedProps> = ({
	subreddCoalesced,
	subCoalesced
}) => {
	const [visible, setVisible] = useState<any>();
	const [currentSubscribers] = subCoalesced.map(s => {
		const active = s.subreddit_subscribers;
		return {
			active
		};
	});
	const Subs = (
		<SubmissionCoalesced
			subCoalesced={subCoalesced.slice(11, 20)}
		/>
	);

	const buttonView = <Button onClick={() => Subs}></Button>;

	return (
		<>
			<Head>
				<title>{`${
					subreddCoalesced
						? subreddCoalesced.map(
								prop => '/' + prop.display_name_prefixed
						  )
						: subCoalesced.map(
								sub => '/' + sub.subreddit_name_prefixed
						  )
				} - a dynamically generated route`}</title>
			</Head>
			<Meta />
			<Navbar />
			<>
				{subreddCoalesced ? (
					subreddCoalesced.map(p => {
						return (
							<>
								<SubredditPost
									key={p.id}
									icon_size={p.icon_size}
									banner_size={p.banner_size}
									banner_img={p.banner_img}
									icon_img={p.icon_img}
									public_description_html={p.public_description_html}
									title={p.title}
									description_html={p.description_html}
									display_name_prefixed={'/' + p.display_name_prefixed}
									active_user_count={currentSubscribers.active.toLocaleString()}
									id={p.id}
									description={p.description ?? ''}
									display_name={p.display_name}
								>
									<SubmissionCoalesced subCoalesced={subCoalesced} />
									<>
										<Link
											href={`/r/[display_name]`}
											as={`/r/${p.display_name}`}
											passHref={true}
											scroll={true}
										>
											<a
												id='back-to-top'
												type='button'
												className='flex items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-primary-1 bg-opacity-25 bg-white ring-2 ring-primary-1 ring-inset hover:bg-primary-8 hover:text-primary-0 sm:px-8 z-50 transition-colors duration-150'
											>
												{'Back To Top'}
											</a>
										</Link>
									</>
								</SubredditPost>
							</>
						);
					})
				) : (
					<NotFound />
				)}
			</>
		</>
	);
};

export default SubredditCoalesced;
