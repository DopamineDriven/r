import cn from 'classnames';
// import hydrate from 'next-mdx-remote/hydrate';
import Image from 'next/image';
import css from './subreddit.module.css';
import csss from '../Submission/submission.module.css';
import { FC, useState } from 'react';
import { Media } from '@/lib/artsy-fresnel';
// import { fromUnixTime, format, formatDistance } from 'date-fns';
import gfm from 'remark-gfm';
// import { SubredditType } from 'snoowrap/dist/objects/VoteableContent';
import { SubredditPostProps } from '@/types/data-handling';
import { SubpageBackdrop } from '../UI/Icons';
import ReactMarkdown from 'react-markdown/with-html';
import { Transition } from '@headlessui/react';
import { Button } from '../UI';
import Link from 'next/link';

const SubredditPost: FC<SubredditPostProps> = ({
	root,
	banner_img,
	icon_img,
	public_description_html,
	title,
	icon_size,
	children,
	description_html,
	display_name_prefixed,
	active_user_count
}) => {
	const [isOpen, setIsOpen] = useState(true);

	const subreddLarge = (
		<Media greaterThanOrEqual='lg'>
			<ReactMarkdown
				plugins={[gfm]}
				allowDangerousHtml={true}
				children={description_html}
				className={cn(
					'text-gray-800 font-sans prose-lg text-justify p-4 transition-transform transform ease-in-out duration-300',
					css['tableMd']
				)}
			/>
		</Media>
	);

	const expandCollapseMobile = (
		<>
			<Media lessThan='lg'>
				<div
					className='relative pb-12'
					style={{ scrollBehavior: 'smooth' }}
				>
					<div
						className='absolute inset-0 flex items-center'
						aria-hidden={true}
					>
						<div className='w-full border-t border-gray-300'></div>
					</div>
					<div className='relative flex justify-center'>
						<Button
							id='overview'
							onClick={() => setIsOpen(!isOpen)}
							className='inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
						>
							<svg
								className={cn(
									'-ml-1.5 mr-1 h-5 w-5 text-gray-600 transition-transform transform ease-in-out duration-300',
									{
										'rotate-45': !isOpen,
										'': isOpen
									}
								)}
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								aria-hidden='true'
							>
								<path
									fillRule='evenodd'
									d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
									clipRule='evenodd'
								/>
							</svg>
							<span>Overview</span>
						</Button>
					</div>
					<Transition
						show={!isOpen}
						enter='transition-opacity duration-75'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition-opacity duration-150'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<ReactMarkdown
							plugins={[gfm]}
							allowDangerousHtml={true}
							children={description_html}
							className={cn(
								'text-gray-800 font-sans prose-lg text-justify p-4 transition-transform transform ease-in-out duration-300',
								css['tableMd']
							)}
						/>
						<div className='relative flex justify-center transition-transform transform ease-in-out duration-300'>
							<Link
								href='/r/[display_name]#overview'
								as={`${display_name_prefixed}`}
								scroll={true}
								passHref={true}
							>
								<a
									id='overview'
									type='button'
									onClick={() => setIsOpen(!isOpen)}
									className='inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
								>
									<svg
										className={cn(
											'-ml-1.5 mr-1 h-5 w-5 text-gray-600 transition-transform transform ease-in-out duration-300',
											{
												'rotate-45': !isOpen,
												'': isOpen
											}
										)}
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										aria-hidden='true'
									>
										<path
											fillRule='evenodd'
											d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
											clipRule='evenodd'
										/>
									</svg>
									<span>Collapse</span>
								</a>
							</Link>
						</div>
					</Transition>
				</div>
			</Media>
		</>
	);

	return (
		<>
			<div
				className={cn(
					root,
					' bg-gray-200 overflow-hidden select-none font-sans'
				)}
			>
				<div className='relative mx-auto md:py-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-7xl'>
					<div className='hidden lg:block  absolute top-0 bottom-0 left-3/4 w-screen'></div>
					<div className='mt-8 lg:grid lg:grid-cols-7 lg:gap-8'>
						<div className='relative lg:row-start-1 lg:col-start-5 lg:col-span-3 mx-auto '>
							<SubpageBackdrop />
							<div className='relative text-base mx-auto max-w-prose lg:max-w-none p-4'>
								<Media lessThan='lg'>
									<ReactMarkdown
										plugins={[gfm]}
										allowDangerousHtml={true}
										children={display_name_prefixed}
										className={cn(
											'text-4xl pb-2 md:text-5xl font-semibold text-gray-800',
											css['tableMd']
										)}
									/>
								</Media>
								<figure>
									<div className='aspect-w-12 aspect-h-1'>
										{banner_img ? (
											<Image
												className='rounded-lg shadow-lg object-cover object-center'
												src={icon_img ? icon_img : banner_img}
												width={icon_size?.[0] ? icon_size?.[0] : 500}
												height={icon_size?.[1] ? icon_size?.[1] : 500}
												priority
												objectFit='cover'
												quality={100}
											/>
										) : (
											<Image
												className='rounded-lg shadow-lg object-cover object-center'
												src={'/req.query.q.png'}
												width={500}
												height={300}
												priority
												objectFit={'cover'}
												quality={100}
											/>
										)}
									</div>
									<figcaption className=' flex text-sm text-gray-600'>
										<svg
											className='flex-none w-5 h-5 text-gray-600'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 20 20'
											fill='currentColor'
											aria-hidden='true'
										>
											<path
												fillRule='evenodd'
												d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
												clipRule='evenodd'
											/>
										</svg>
										<span className='ml-2 font-sans text-gray-700 font-semibold'>
											Photograph via{' '}
											{banner_img !== ''
												? '/' + display_name_prefixed
												: 'snooOG'}
										</span>
									</figcaption>
								</figure>
							</div>
							<ReactMarkdown
								plugins={[gfm]}
								allowDangerousHtml={true}
								children={public_description_html}
								className={cn(
									'text-gray-800 font-sans prose-base max-w-2xl mx-auto pt-2 lg:pt-0 p-4 leading-tight',
									css['tableMd']
								)}
							/>
							{subreddLarge}
							{expandCollapseMobile}
						</div>
						<div className='lg:mt-0 bg-gray-100 p-4 lg:col-span-4'>
							<div className='text-base max-w-prose mx-auto lg:max-w-none'></div>
							<Media greaterThanOrEqual='lg'>
								{' '}
								<ReactMarkdown
									plugins={[gfm]}
									allowDangerousHtml={true}
									children={display_name_prefixed}
									className={cn(
										'text-4xl md:text-5xl font-semibold text-gray-600',
										css['tableMd']
									)}
								/>
								<p className='text-gray-800 font-sans py-2'></p>
							</Media>

							<div className=' prose text-gray-700 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1'>
								<Media greaterThanOrEqual='lg'>
									<h4 className='text-gray-600 prose-lg lg:pb-4'>
										{`${active_user_count}` ?? '0'} Subscribers
									</h4>
								</Media>
								<div
									className={cn(
										' overflow-x-scroll',
										csss.p,
										css.md,
										css.prose
									)}
								>
									{children}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SubredditPost;
