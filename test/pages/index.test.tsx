import React from 'react';
import { render, fireEvent, mockSnoowrap } from '../testUtils';
import { Index, getStaticProps } from '../../pages/index';
import { InferGetStaticPropsType } from 'next';
import { mocked } from 'ts-jest/utils';
import snoowrap from 'snoowrap';
import { r } from '../../lib/snoo-config';
import Snoowrap from 'snoowrap';
import secret from '../__mocks__/oauth_config.json';
describe('Home page', () => {
	mockSnoowrap;
	it('matches snapshot', () => {
		const IndexMocked = mocked(
			<Index childButtonPropsSerialized={typeof getStaticProps} />
		);
		// expect(IndexMocked).toContain(ComponentApp);
		expect(mocked(r)).toBeInstanceOf(mockSnoowrap);
		expect(IndexMocked).toMatchSnapshot();
	});
});

// let childButtonPropsSerialized: InferGetStaticPropsType<
// 	typeof getStaticProps
// >;

// describe('Home page', () => {
// 	it('matches snapshot', () => {
// 		const { asFragment } = render(
// 			<Index
// 				childButtonPropsSerialized={
// 					typeof childButtonPropsSerialized
// 				}
// 			/>,
// 			{}
// 		);
// 		expect(asFragment()).toMatchSnapshot();
// 	});

// 	it('clicking button triggers alert', () => {
// 		const { getByText } = render(
// 			<Index
// 				childButtonPropsSerialized={
// 					typeof childButtonPropsSerialized
// 				}
// 			/>,
// 			{}
// 		);
// 		window.alert = jest.fn();
// 		fireEvent.keyUp(getByText('Test Button'));
// 		expect(window.alert).toHaveBeenCalledWith(
// 			'With typescript and Jest'
// 		);
// 	});
// });

// const handler = async (ctx: GetStaticPropsContext) => {
// 	const snooSubreddit = await r.searchSubreddits({
// 		query: ctx.params ? (ctx.params.q as string) : 'snowboarding',
// 		limit: 10,
// 		count: 10,
// 		show: '10'
// 	});

// 	const snooSubreddtoJSON = snooSubreddit.toJSON();

// 	const snooSubredd: ChildButtonPropsNoUndefinedJSONified = snooSubreddtoJSON.map(
// 		snooSub => {
// 			const {
// 				display_name_prefixed,
// 				url,
// 				id,
// 				title,
// 				display_name
// 			} = snooSub;
// 			return {
// 				display_name_prefixed,
// 				url,
// 				id,
// 				title,
// 				display_name
// 			};
// 		}
// 	);
// 	const childButtonPropsSerialized = new Serializer().serialize(
// 		JSON.parse(JSON.stringify(snooSubredd))
// 	);

// 	return {
// 		props: {
// 			childButtonPropsSerialized
// 		},
// 		revalidate: 10
// 	};
// };
