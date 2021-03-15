import Head from '../../components/Head/head';
import { mocked } from 'ts-jest/utils';
import { render } from '@testing-library/react';

describe('Head MetaData', () => {
	it('matches snapshot', () => {
		const { container } = render(<Head />);
		expect(
			container.getElementsByTagName('meta').namedItem('viewport')
		);
		expect(container).toMatchSnapshot();
	});
});
