import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';
import css from './navbar-links.module.css';

interface NavbarRef {
	id: number;
	href: string;
	as: string;
	label: string;
}

const links: NavbarRef[] = [
	{
		id: 0,
		href: '/',
		as: '/',
		label: 'Home'
	}
	// {
	// 	id: 1,
	// 	href: '/about',
	// 	as: '/about',
	// 	label: 'About'
	// }
];

interface NavbarLinksProps {
	root?: string;
}

const NavbarLinks: FC<NavbarLinksProps> = ({ root }) => {
	const { pathname } = useRouter();

	const navbarList = links.map((link, index) => (
		<>
			<Link key={index} href={link.href} as={link.as} passHref>
				<a
					className={
						pathname === link.href
							? cn(css.linkActive, root)
							: cn(css.link, root)
					}
					key={link.id}
					aria-label={`to ${link.label}`}
				>
					{link.label}
				</a>
			</Link>
		</>
	));
	return <>{navbarList}</>;
};

export default NavbarLinks;
