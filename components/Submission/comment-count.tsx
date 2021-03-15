import { FC } from 'react';
import cn from 'classnames';
import { fromUnixTime, format } from 'date-fns';

interface CommentProps {
	created: number;
	num_comments: number;
}

const commentsPlusTimeStamp: FC<CommentProps> = ({
	num_comments,
	created
}) => {
	const parseCreatedYear = format(
		fromUnixTime(created),
		`yyyy/MM/dd`
	);
	const parseCreatedTime = format(fromUnixTime(created), `HH:mm`);
	const commentCount = num_comments ? (
		<>
			<div className='text-lg text-gray-800 font-medium text-left'>
				<time>{fromUnixTime(created!)}</time>
			</div>
			<div
				className={cn(
					'text-lg text-gray-800 font-medium text-right col-span-1'
				)}
			>
				{`${
					num_comments > 1
						? `${num_comments} Comments`
						: num_comments === 1
						? `${num_comments} Comment`
						: '0 Comments'
				}`}
			</div>
		</>
	) : (
		''
	);
	const commentPlusCreatedFormat = (
		<div className='gird-cols-2 w-full pt-5'>
			<div className='flex w-full col-span-1'>{commentCount}</div>
			<div className=' w-full flex col-span-1 text-right text-lg text-gray-800 font-medium'>
				{`${parseCreatedYear}`}
				<br />
				{`${parseCreatedTime} UTC`}
			</div>
		</div>
	);
	return <>{commentPlusCreatedFormat}</>;
};

export default commentsPlusTimeStamp;
