
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				serif: ['Georgia', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				paper: {
					DEFAULT: '#f8f5f0',
					dark: '#f1ede5',
				},
				book: {
					spine: '#e0dad0',
					cover: '#d8d0c5',
					shadow: 'rgba(0, 0, 0, 0.1)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'page-turn-right': {
					'0%': {
						transform: 'rotateY(0deg)',
						transformOrigin: 'left',
						zIndex: '10',
					},
					'100%': {
						transform: 'rotateY(-180deg)',
						transformOrigin: 'left',
						zIndex: '10',
					}
				},
				'page-turn-left': {
					'0%': {
						transform: 'rotateY(-180deg)',
						transformOrigin: 'left',
						zIndex: '10',
					},
					'100%': {
						transform: 'rotateY(0deg)',
						transformOrigin: 'left',
						zIndex: '10',
					}
				},
				'page-flip-right': {
					'0%': {
						transform: 'rotateY(0deg)',
						transformOrigin: 'left',
						boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)',
					},
					'25%': {
						transform: 'rotateY(-40deg)',
						transformOrigin: 'left',
						boxShadow: '40px 20px 20px rgba(0, 0, 0, 0.1)',
					},
					'50%': {
						transform: 'rotateY(-100deg)',
						transformOrigin: 'left',
						boxShadow: '100px 30px 20px rgba(0, 0, 0, 0.08)',
					},
					'75%': {
						transform: 'rotateY(-140deg)',
						transformOrigin: 'left',
						boxShadow: '40px 20px 20px rgba(0, 0, 0, 0.05)',
					},
					'100%': {
						transform: 'rotateY(-180deg)',
						transformOrigin: 'left',
						boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)',
					}
				},
				'page-flip-left': {
					'0%': {
						transform: 'rotateY(-180deg)',
						transformOrigin: 'left',
						boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)',
					},
					'25%': {
						transform: 'rotateY(-140deg)',
						transformOrigin: 'left',
						boxShadow: '40px 20px 20px rgba(0, 0, 0, 0.05)',
					},
					'50%': {
						transform: 'rotateY(-100deg)',
						transformOrigin: 'left',
						boxShadow: '100px 30px 20px rgba(0, 0, 0, 0.08)',
					},
					'75%': {
						transform: 'rotateY(-40deg)',
						transformOrigin: 'left',
						boxShadow: '40px 20px 20px rgba(0, 0, 0, 0.1)',
					},
					'100%': {
						transform: 'rotateY(0deg)',
						transformOrigin: 'left',
						boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)',
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'page-turn-right': 'page-turn-right 0.6s ease-in-out forwards',
				'page-turn-left': 'page-turn-left 0.6s ease-in-out forwards',
				'page-flip-right': 'page-flip-right 0.6s ease-in-out forwards',
				'page-flip-left': 'page-flip-left 0.6s ease-in-out forwards',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-up': 'slide-up 0.3s ease-out'
			},
			boxShadow: {
				'page': '0 0 15px rgba(0, 0, 0, 0.05)',
				'book': '0 10px 30px rgba(0, 0, 0, 0.1)',
				'page-right': '-5px 0 15px rgba(0, 0, 0, 0.1)',
				'page-fold': 'inset -7px 0 15px -5px rgba(0, 0, 0, 0.1)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
