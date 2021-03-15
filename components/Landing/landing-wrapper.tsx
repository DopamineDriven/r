import css from './landing.module.css';
import cn from 'classnames';
import React, { FC } from 'react';

interface LandingWrapperProps {
	root?: string;
}

const LandingWrapper: FC<LandingWrapperProps> = ({
	root,
	children
}) => {
	return (
		<section className={cn(css.alpha, root)}>
			<div className={css.beta}>
				<div className={css.gamma}>{children}</div>
			</div>
		</section>
	);
};

export default LandingWrapper;
