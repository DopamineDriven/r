const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	important: true,
	purge: {
		content: [
			'./components/**/*.{js,ts,jsx,tsx}',
			'./pages/**/*.{js,ts,jsx,tsx}'
		],
		options: {
			safelist: {
				standard: ['outline-none']
			}
		}
	},
	darkMode: 'class',
	theme: {
		lineClamp: {
			1: 1,
			2: 2,
			3: 3,
			4: 4
		},
		extend: {
			zIndex: {
				'-10': '-10',
				100: '100',
				150: '150'
			},
			maxWidth: {
				'9xl': '121rem', // 1936px
				'8xl': '96rem' // 1536px
			},
			screens: {
				xs: '375px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1440px',
				'3xl': '1920px'
			},
			transitionDuration: {
				0: '0ms',
				300: '300ms',
				500: '500ms',
				700: '700ms',
				1000: '1000ms'
			},
			rotate: {
				0: '0deg',
				45: '45deg',
				90: '90deg',
				125: '125deg',
				180: '180deg',
				360: '360deg'
			},
			fontFamily: {
				header: ['goudy-bookletter-1911', 'serif'],
				poppins: ['poppins', 'sans-serif'],
				somaRoman: ['neue-haas-grotesk-text', 'sans-serif'],
				somaDisplay: ['neue-haas-grotesk-display', 'sans-serif'],
				sans: ['Inter var', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				'reddit-0': 'var(--reddit-0)',
				'reddit-1': 'var(--reddit-1)',
				'reddit-2': 'var(--reddit-2)',
				'reddit-3': 'var(--reddit-3)',
				'reddit-4': 'var(--reddit-4)',
				'primary-0': 'var(--primary-0)',
				'primary-1': 'var(--primary-1)',
				'primary-2': 'var(--primary-2)',
				'primary-3': 'var(--primary-3)',
				'primary-4': 'var(--primary-4)',
				'primary-5': 'var(--primary-5)',
				'primary-6': 'var(--primary-6)',
				'primary-7': 'var(--primary-7)',
				'primary-8': 'var(--primary-8)',
				'primary-9': 'var(--primary-9)',
				'secondary-0': 'var(--secondary-0)',
				'secondary-1': 'var(--secondary-1)',
				'secondary-2': 'var(--secondary-2)',
				'accents-0': 'var(--accents-0)',
				'accents-1': 'var(--accents-1)',
				'accents-2': 'var(--accents-2)',
				'accents-3': 'var(--accents-3)',
				'accents-4': 'var(--accents-4)',
				'accents-5': 'var(--accents-5)',
				'accents-6': 'var(--accents-6)',
				'accents-7': 'var(--accents-7)',
				'accents-8': 'var(--accents-8)',
				'accents-9': 'var(--accents-9)',
				'theme-0': 'var(--theme-0)',
				'theme-1': 'var(--theme-1)',
				lightBlue: {
					0: '#E3F8FF',
					100: '#B3ECFF',
					200: '#81DEFD',
					300: '#5ED0FA',
					400: '#40C3F7',
					500: '#2BB0ED',
					600: '#1992D4',
					700: '#127FBF',
					800: '#0B69A3',
					900: '#035388'
				},
				cyan: {
					0: '#E0FCFF',
					100: '#BEF8FD',
					200: '#87EAF2',
					300: '#54D1DB',
					400: '#38BEC9',
					500: '#2CB1BC',
					600: '#14919B',
					700: '#0E7C86',
					800: '#0A6C74',
					900: '#044E54'
				},
				rojo: {
					0: '#610316',
					100: '#8A041A',
					200: '#AB091E',
					300: '#CF1124',
					400: '#E12D39',
					500: '#EF4E4E',
					600: '#F86A6A',
					700: '#FF9B9B',
					800: '#FFBDBD',
					900: '#FFE3E3'
				},
				rosado: {
					0: '#620042',
					100: '#870557',
					200: '#A30664',
					300: '#BC0A6F',
					400: '#DA127D',
					500: '#E8368F',
					600: '#F364A2',
					700: '#FF8CBA',
					800: '#FFB8D2',
					900: '#FFE3EC'
				},
				amarillo: {
					0: 'hsl(15, 86%, 30%)',
					100: 'hsl(22, 82%, 39%)',
					200: 'hsl(29, 80%, 44%)',
					300: 'hsl(36, 77%, 49%)',
					400: 'hsl(42, 87%, 55%)',
					500: 'hsl(44, 92%, 63%)',
					600: 'hsl(48, 94%, 68%)',
					700: 'hsl(48, 95%, 76%)',
					800: 'hsl(48, 100%, 88%)',
					900: 'hsl(49, 100%, 96%)'
				},
				verdeAzulado: {
					// blueish-green === teal (espanol)
					0: 'hsl(170, 97%, 15%)',
					100: 'hsl(168, 80%, 23%)',
					200: 'hsl(166, 72%, 28%)',
					300: 'hsl(164, 71%, 34%)',
					400: 'hsl(162, 63%, 41%)',
					500: 'hsl(160, 51%, 49%)',
					600: 'hsl(158, 58%, 62%)',
					700: 'hsl(156, 73%, 74%)',
					800: 'hsl(154, 75%, 87%)',
					900: 'hsl(152, 68%, 96%)'
				},
				redditRed: '#FF4500',
				redditNav: '#1A1A1B',
				redditSearch: '#272729',
				redditBG: '#141415'
			},
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				hero: {
					transform: 'translate3d(0px, 0px, 0px)'
				}
			},
			animation: {
				wiggle: 'wiggle 10s ease-in-out infinite',
				hero: 'hero 1s ease-in-out infinite',
				slowPing: 'pulse 10s cubic-bezier(0, 0, 0.2, 1) infinite'
			},
			width: {
				82: '20.5rem',
				100: '25rem',
				200: '50rem',
				'8xl': '96rem'
			},
			spacing: {
				7: '1.75rem',
				14: '3.5rem',
				18: '4.5rem',
				25: '6.25rem',
				26: '6.5rem',
				28: '7rem',
				44: '11rem',
				82: '20.5rem',
				100: '25rem',
				104: '26rem',
				156: '39rem'
			},
			boxShadow: {
				'outline-2': '0 0 0 2px var(--accents-0)',
				magical:
					'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
				cardHover:
					'0 4px 4.1px rgba(0, 0, 0, 0.012),0 4.9px 5.8px rgba(0, 0, 0, 0.018),0 6.3px 8.4px rgba(0, 0, 0, 0.029),0 8.8px 12.9px rgba(0, 0, 0, 0.05),0 15px 23px rgba(0, 0, 0, 0.11)'
			}
		},
		variants: {
			extend: {
				ringWidth: [
					'responsive',
					'hover',
					'active',
					'focus',
					'group-hover'
				],
				ringColor: [
					'responsive',
					'hover',
					'active',
					'focus',
					'group-hover'
				],
				fontSize: ['responsive', 'last', 'first', 'hover', 'focus'],
				stroke: ['responsive', 'hover', 'focus', 'group-hover'],
				fill: ['responsive', 'hover', 'focus', 'group-hover'],
				gridTemplateColumns: [
					'responsive',
					'last',
					'first',
					'hover',
					'focus'
				],
				animation: [
					'responsive',
					'hover',
					'focus',
					'motion-safe',
					'motion-reduce'
				],
				transitionProperty: [
					'responsive',
					'hover',
					'focus',
					'motion-safe',
					'motion-reduce'
				],
				transitionDuration: ['responsive', 'hover', 'focus'],
				transitionTimingFunction: ['responsive', 'hover', 'focus'],
				transitionDelay: ['responsive', 'hover', 'focus'],
				scale: [
					'responsive',
					'hover',
					'focus',
					'active',
					'group-hover'
				],
				rotate: [
					'responsive',
					'hover',
					'focus',
					'active',
					'group-hover'
				]
			}
		}
	},
	variants: {
		padding: [
			'responsive',
			'group-hover',
			'hover',
			'focus',
			'even',
			'odd',
			'first',
			'last'
		],
		textColor: [
			'responsive',
			'group-hover',
			'hover',
			'focus',
			'even',
			'first',
			'last',
			'odd'
		],
		backgroundColor: [
			'responsive',
			'group-hover',
			'hover',
			'focus',
			'even',
			'first',
			'last',
			'odd'
		],
		display: ['responsive', 'hover', 'group-hover'],
		visibility: ['responsive', 'hover', 'group-hover'],
		transitionDuration: ['responsive', 'hover', 'group-hover'],
		gridColumn: ['responsive', 'hover', 'first', 'odd', 'even']
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio')
	]
};
