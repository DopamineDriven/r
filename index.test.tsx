import React from 'react';
import { getPage } from 'next-page-tester';
import { mount } from 'enzyme';
/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
	const element = document.createElement('div');
	expect(element).not.toBeNull();
});

// describe('use enzyme', () => {
// 	test('combining enzyme with next-page-tester', async () => {
// 		const { page } = await getPage({
// 			nextRoot: '/pages/r',
// 			route: '/pages/r/[display_name].tsx'
// 		});
// 		const wrapper = mount(page);
// 		return wrapper;
// 	});
// });

it('should pass', () => {
	expect(true).toEqual(true);
});
