const MenuIcon = ({ ...props }) => {
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
				d='M4 18H20M4 6H20H4ZM4 12H20H4Z'
				stroke='#CCD6E0'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default MenuIcon;
