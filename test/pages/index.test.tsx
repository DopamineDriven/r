import React from 'react';
import { mockSnoowrap } from '../testUtils';
import { Index, getStaticProps } from '../../pages/index';
import { mocked } from 'ts-jest/utils';
import { r } from '../../lib/snoo-config';

// import secret from '../__mocks__/oauth_config.json';
describe('Home page', () => {
	const r = new mockSnoowrap();
	it('matches snapshot', () => {
		const IndexMocked = mocked(
			<Index childButtonPropsSerialized={typeof getStaticProps} />
		);
		// expect(IndexMocked).toContain(ComponentApp);
		expect(mocked(r)).toBe(
			'missing credentials passed to snoowrap constructor.'
		);
		expect(IndexMocked).toMatchSnapshot();
	});
});
