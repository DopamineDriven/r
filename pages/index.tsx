import { Container } from '../components/UI';
import { Navbar } from '../components/Navbar';
import Head from 'next/head';
import Link from 'next/link';
import cn from 'classnames';
import {
	InferGetStaticPropsType,
	GetStaticPropsContext,
	GetStaticPropsResult
} from 'next';
import { r } from '../lib/snoo-config';
import {
	LandingPage,
	LandingPageWrapper
} from '../components/Landing';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Serializer } from '../types/json';
import { Meta } from '../components/Meta';
import {
	ChildButtonProps,
	ChildButtonPropsNoUndefinedJSONified
} from '../types/landing';

export function Index({
	childButtonPropsSerialized
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [search, setSearch] = useState('');
	const { asPath } = useRouter();

	useEffect(() => {
		const pathSubString = asPath.split('/');
		if (!asPath.includes('/r/[display_name]/')) {
			setSearch('');
			return;
		}
		if (
			asPath.includes('/r/[display_name]/') &&
			asPath.length === 3
		) {
			setSearch(pathSubString[3]);
			return;
		}
		// eslint-disable-next-line no-console
		console.log(search);
	}, [asPath]);

	const childButtonPropsDeserialized: ChildButtonProps[] = new Serializer().deserialize(
		childButtonPropsSerialized
	);
	const childButtons = (
		<>
			{childButtonPropsDeserialized
				? childButtonPropsDeserialized.map(prop => {
						return (
							<>
								<Link
									href={'/r/[display_name]'} // = /r/subreddit/query
									as={`/r/${prop.display_name}`}
									key={prop.title}
									passHref={true}
								>
									<a
										type='button'
										key={prop.id}
										className={cn(
											'flex normal-case w-full min-w-full mx-auto sm:w-auto items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-gray-100 bg-opacity-25 bg-redditSearch ring-2 ring-rojo-100 ring-inset hover:bg-black hover:text-gray-50  sm:px-8 z-50 transition-colors duration-150'
										)}
									>
										/{`${prop.display_name_prefixed}`}
									</a>
								</Link>
							</>
						);
				  })
				: ''}
		</>
	);
	return (
		<>
			<Meta />
			<Navbar />
			<Head>
				<title>{'Subreddit Search Home'}</title>
			</Head>
			<Container clean className='fit'>
				<LandingPageWrapper>
					<LandingPage>{childButtons}</LandingPage>
				</LandingPageWrapper>
			</Container>
		</>
	);
}

export async function getStaticProps(
	ctx: GetStaticPropsContext
): Promise<
	GetStaticPropsResult<{
		childButtonPropsSerialized: string;
	}>
> {
	const snooSubreddit = await r.searchSubreddits({
		query: ctx.params ? (ctx.params.q as string) : 'snowboarding',
		limit: 10,
		count: 10,
		show: '10'
	});

	const snooSubreddtoJSON = snooSubreddit.toJSON();

	const snooSubredd: ChildButtonPropsNoUndefinedJSONified = snooSubreddtoJSON.map(
		snooSub => {
			const {
				display_name_prefixed,
				url,
				id,
				title,
				display_name
			} = snooSub;
			return {
				display_name_prefixed,
				url,
				id,
				title,
				display_name
			};
		}
	);
	const childButtonPropsSerialized = new Serializer().serialize(
		JSON.parse(JSON.stringify(snooSubredd))
	);

	return {
		props: {
			childButtonPropsSerialized
		},
		revalidate: 10
	};
}
export default Index;
