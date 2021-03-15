import React, { Component } from 'react';
import NextApp from '../../pages/_app';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { mocked } from 'ts-jest/utils';
let router: Router;
let pageProps: AppProps;

describe('App root', () => {
	it('matches snapshot', () => {
		const AppMocked = mocked(
			<NextApp
				Component={Component}
				pageProps={pageProps}
				router={router}
			/>
		);
		expect(AppMocked).toMatchSnapshot();
	});
});
