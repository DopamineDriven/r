import React from 'react';
import NotFound from '../../components/NotFound';
import { render } from '@testing-library/react';

it('renders a not found 404 page', () => {
	const { container } = render(<NotFound />);
	expect(
		container.getElementsByTagName('a').namedItem('Return Home')
	);
	expect(container).toMatchSnapshot();
});
