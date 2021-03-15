import React from 'react';
import Searchbar from '../../components/Searchbar/Searchbar';

import { render } from '@testing-library/react';
import { mockNextUseRouter } from '../testUtils';

const useRouter = jest.spyOn(
	require('next/router'),
	'useRouter'
);
describe('searchbar', () => {
	mockNextUseRouter({
		async prefetch(
			url: '/r/[display_name]',
			asPath: any,
			options: undefined
		) {
			() => url;
			() => asPath;
			() => options;
		},
		route: '/r/[display_name]',
		pathname: '/snowboarding',
		query: '',
		asPath: `/snowboarding?error=${encodeURIComponent(
			'Uh oh - something went wrong'
		)}`
	});
	it('matches snapshot', () => {
		useRouter.mockImplementationOnce(() => ({
			prefetch: { q: 'snowboarding' || undefined }
		}));
		const { container } = render(<Searchbar />);
		expect(
			container.getElementsByTagName('input').namedItem('r/')
		);
		expect(container).toMatchSnapshot();
	});
});
