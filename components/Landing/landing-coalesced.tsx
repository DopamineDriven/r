import { FC, useRef, useEffect } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { Media } from '@/lib/artsy-fresnel';
import Particles from 'react-tsparticles';
import { Container } from '@/components/UI';
import { Searchbar } from '@/components/Searchbar';
import css from './landing.module.css';

// interface LandingMapped {
// 	selftext: string;
// }
interface LandingPageProps {
	className?: string;
	pics?: React.ReactNode;
	// display_name_prefixed: string;
}
const LandingPage: FC<LandingPageProps> = ({
	className,
	children,
	pics
}) => {
	const particlesConatinerRef = useRef<HTMLDivElement>(null);
	// Stop history navigation gesture on touch devices with tsparticle interactivity
	useEffect(() => {
		const preventNavigation = (event: TouchEvent) => {
			// center of touch area
			const touchXPosition = event.touches[0].pageX;
			// touch area radius
			const touchXRadius = event.touches[0].radiusX || 0;
			// set a threshold (10px) on screen edges because touch area
			// overlapping with screen edges can trigger navigation. Prevent it
			if (
				touchXPosition - touchXRadius < 10 ||
				touchXPosition + touchXRadius > window.innerWidth - 10
			)
				event.preventDefault();
		};
		particlesConatinerRef.current!.addEventListener(
			'touchstart',
			preventNavigation
		);
		return () => {
			// prevent erroneous removal of null event listener
			if (particlesConatinerRef.current !== null)
				particlesConatinerRef.current.removeEventListener(
					'touchstart',
					preventNavigation
				);
		};
	}, []);
	const desktop = (
		<Media greaterThanOrEqual='sm'>
			<></>
		</Media>
	);

	const mobile = (
		<Media lessThan='sm'>
			<div
				className='absolute inset-0 bg-gradient-to-r from-transparent to-transparent'
				style={{ mixBlendMode: 'multiply' }}
			></div>
		</Media>
	);
	// const mapping = snooPopular.map(post => post);

	return (
		<main className={cn(className, css.root)}>
			<div className='relative'>
				<div className='absolute inset-x-0 bottom-0 h-full bg-gray-200'>
					<div className='mx-auto'>
						<div className='relative sm:pb-24'>
							<div
								className='absolute inset-0'
								ref={particlesConatinerRef}
							>
								<Particles
									className='cursor-default h-screen sm:h-screen w-full object-cover'
									id='tsparticles'
									options={{
										background: {
											color: {
												value: '#141415'
											}
										},
										fpsLimit: 60,
										interactivity: {
											detectsOn: 'canvas',
											events: {
												onClick: {
													enable: true,
													mode: 'push'
												},
												onHover: {
													enable: true,
													mode: 'repulse'
												},
												resize: true
											},
											modes: {
												bubble: {
													distance: 400,
													duration: 2,
													opacity: 0.9,
													size: 40
												},
												push: {
													quantity: 4
												},
												repulse: {
													distance: 200,
													duration: 0.4
												}
											}
										},
										particles: {
											color: {
												value: '#610316'
											},
											links: {
												color: '#610316',
												distance: 150,
												enable: true,
												opacity: 0.5,
												width: 1
											},
											collisions: {
												enable: true
											},
											move: {
												direction: 'none',
												enable: true,
												outMode: 'bounce',
												random: false,
												speed: 6,
												straight: false
											},
											number: {
												density: {
													enable: true,
													value_area: 800
												},
												value: 80
											},
											opacity: {
												value: 0.5
											},
											shape: {
												type: 'circle'
											},
											size: {
												random: true,
												value: 5
											}
										},
										detectRetina: true
									}}
								/>
								{mobile}
								{desktop}
							</div>
							<Container className='relative px-4 py-16 sm:px-6 sm:pt-16 lg:px-8 lg:max-w-6xl 3xl:max-w-7xl'>
								<h1 className='text-center text-6xl tracking-tight sm:text-5xl lg:text-6xl w-auto'>
									<span className='block tracking-wide text-gray-200 font-bold py-2 font-sans w-auto text-3xl sm:text-4xl md:text-8xl'>
										Subreddit Search
									</span>
								</h1>
								<h4 className='text-center text-6xl tracking-tight sm:text-5xl lg:text-6xl w-auto'>
									<span className='block tracking-wide text-gray-200 font-bold py-2 font-sans w-auto text-2xl sm:text-3xl md:text-4xl'>
										{'Input a subreddit and press enter'}
									</span>
								</h4>
								<Container className='px-1/12 sm:px-1/6 lg:px-1/4 my-10'>
									<Searchbar />
								</Container>
								{/* <div className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center z-50'>
									<div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-3 sm:gap-5'>
										<Link href={'/atomic'} as='/atomic' passHref>
											<a className='flex items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-gray-100 bg-opacity-25 bg-redditSearch ring-2 ring-rojo-100 ring-inset hover:bg-redditNav hover:text-gray-50 sm:px-8 z-50 transition-colors duration-150'>
												r/tailwindcss
											</a>
										</Link>

										<a className='flex items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-gray-100 bg-opacity-25 bg-redditSearch ring-2 ring-rojo-100 ring-inset hover:bg-redditNav hover:text-gray-50 sm:px-8 z-50 transition-colors duration-150'>
											r/typescript
										</a>
										<a className='flex items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-gray-100 bg-opacity-25 bg-redditSearch ring-2 ring-rojo-100 ring-inset hover:bg-redditNav hover:text-gray-50 sm:px-8 z-50 transition-colors duration-150'>
											r/nextjs
										</a>
									</div>
								</div> */}

								<div className='mt-4 sm:mt-6 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center z-50'>
									<div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 w-full px-12 min-w-full '>
										{children}
									</div>
								</div>
								<div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 w-full px-12 min-w-full '>
									{pics}
								</div>
							</Container>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default LandingPage;

/*
										{mapping.map((post: Subreddit) => {
											const display_name_prefixed = post.display_name_prefixed as string;
											return { children };
											<>
												<Link
													href={'/[r]/[display_name]'}
													as={`/${display_name_prefixed}`}
													key={display_name_prefixed}
													passHref={true}
												>
													<a
														type='button'
														key={display_name_prefixed + 'button'}
														className={cn(
															'flex normal-case w-full mx-auto sm:w-auto items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-gray-100 bg-opacity-25 bg-redditSearch ring-2 ring-rojo-100 ring-inset hover:bg-gray-800 hover:text-gray-50  sm:px-8 z-50 transition-colors duration-150'
														)}
													>
														{display_name_prefixed}
													</a>
												</Link>
											</>
										})}
*/
/*
										<Button
											type='submit'
											className={cn(
												'flex normal-case w-full mx-auto sm:w-auto items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-gray-100 bg-opacity-25 bg-redditSearch ring-2 ring-rojo-100 ring-inset hover:bg-gray-800 hover:text-gray-50  sm:px-8 z-50 transition-colors duration-150'
											)}
											onClick={() => {
												openModal('OPEN_MODAL');
												setModalView('ABOUT_VIEW');
											}}
										>
											About
										</Button>
										<Button
											type='submit'
											className={cn(
												'flex normal-case w-full mx-auto sm:w-auto items-center justify-center px-4 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-gray-100 bg-opacity-25 bg-redditSearch ring-2 ring-rojo-100 ring-inset hover:bg-gray-800 hover:text-gray-50  sm:px-8 z-50 transition-colors duration-150'
											)}
											onClick={() => {
												openModal('OPEN_MODAL');
												setModalView('CONTACT_VIEW');
											}}
										>
											Contact
										</Button>
*/
