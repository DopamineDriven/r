import { FC } from 'react';
import cn from 'classnames';
import css from './submission.module.css';
import UpvoteTitleThumbnailDescription from './upvote-title-description';
// import Image from 'next/image';
import { MediaExtend } from '@/types/landing';
import { Container } from '@/components/UI';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import Iframe from 'react-iframe';
import {
	Prism as SyntaxHighlighter,
	SyntaxHighlighterProps
} from 'react-syntax-highlighter';

export const CodeBlock: FC<SyntaxHighlighterProps> = ({
	language,
	value
}) => {
	return (
		<SyntaxHighlighter
			className='max-w-3xl overflow-x-hidden'
			language={language}
			useInlineStyles={true}
			lineNumberStyle={true}
		>
			{value}
		</SyntaxHighlighter>
	);
};

export const PreWrapBlock: FC = ({ children }) => {
	return <pre>{JSON.stringify(children)}</pre>;
};

const SubmissionComment: FC<MediaExtend> = ({
	title,
	// post_hint,
	selftext,
	thumbnail,
	selftext_html,
	is_self,
	url,
	ups,
	children
}) => {
	return (
		<>
			<div>
				<UpvoteTitleThumbnailDescription
					selftext={selftext}
					selftext_html={selftext_html}
					ups={ups}
					title={title}
					thumbnail={thumbnail}
				/>
				<div className='text-base text-right '>{children}</div>
				{url && url.includes('comment') && is_self !== true ? (
					<div className={cn('w-full min-w-full', css.prose)}>
						<Container clean className={'mx-auto max-w-5xl '}>
							<div
								className='flex flex-grow max-w-4xl overflow-x-hidden mx-auto w-full align-middle '
								style={{ maxHeight: '60vh' }}
							>
								<ReactMarkdown
									children={selftext_html ? selftext_html : selftext}
									plugins={[gfm]}
									allowDangerousHtml={selftext_html ? true : false}
									className={cn(
										'mt-1 prose md:prose-lg overflow-x-hidden',
										css.p
									)}
									renderers={{
										code: CodeBlock,
										iframe: Iframe
									}}
								/>
							</div>
						</Container>
					</div>
				) : (
					<></>
				)}
			</div>
			<hr className='w-full bg-gray-200 z-100 min-w-full my-4 h-1' />
		</>
	);
};

export default SubmissionComment;
