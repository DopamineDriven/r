const XIcon = ({ ...props }) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			aria-hidden={true}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M6 6L18 18M6 18L18 6L6 18Z'
				stroke='#CCD6E0'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default XIcon;
