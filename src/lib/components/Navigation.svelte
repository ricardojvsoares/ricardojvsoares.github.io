<script>
	import { onMount } from 'svelte';
	
	let isMenuOpen = false;
	let scrolled = false;
	
	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};
		
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
	
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
	
	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<nav class="nav" class:scrolled>
	<div class="nav-container">
		<a href="/" class="logo" on:click={closeMenu}>
			<span class="logo-text">Portfolio</span>
		</a>
		
		<div class="nav-links" class:open={isMenuOpen}>
			<a href="#sobre" on:click={closeMenu}>Sobre</a>
			<a href="#projetos" on:click={closeMenu}>Projetos</a>
			<a href="#skills" on:click={closeMenu}>Skills</a>
			<a href="#contacto" on:click={closeMenu}>Contacto</a>
		</div>
		
		<button class="menu-toggle" class:open={isMenuOpen} on:click={toggleMenu} aria-label="Toggle menu">
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		padding: 1rem 0;
		transition: all 0.3s ease;
		background: rgba(10, 10, 10, 0.8);
		backdrop-filter: blur(10px);
	}
	
	.nav.scrolled {
		background: rgba(10, 10, 10, 0.95);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
	}
	
	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.logo {
		text-decoration: none;
		color: white;
		font-weight: 900;
		font-size: 1.5rem;
		transition: color 0.3s ease;
	}
	
	.logo:hover {
		color: #00ff88;
	}
	
	.logo-text {
		background: linear-gradient(45deg, #00ff88, #4ecdc4);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.nav-links {
		display: flex;
		gap: 2rem;
		align-items: center;
	}
	
	.nav-links a {
		text-decoration: none;
		color: #a0a0a0;
		font-weight: 500;
		transition: all 0.3s ease;
		position: relative;
	}
	
	.nav-links a:hover {
		color: #00ff88;
	}
	
	.nav-links a::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 0;
		height: 2px;
		background: linear-gradient(45deg, #00ff88, #4ecdc4);
		transition: width 0.3s ease;
	}
	
	.nav-links a:hover::after {
		width: 100%;
	}
	
	.menu-toggle {
		display: none;
		flex-direction: column;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		gap: 4px;
	}
	
	.menu-toggle span {
		width: 25px;
		height: 3px;
		background: #00ff88;
		transition: all 0.3s ease;
		transform-origin: center;
	}
	
	.menu-toggle.open span:nth-child(1) {
		transform: rotate(45deg) translate(6px, 6px);
	}
	
	.menu-toggle.open span:nth-child(2) {
		opacity: 0;
	}
	
	.menu-toggle.open span:nth-child(3) {
		transform: rotate(-45deg) translate(6px, -6px);
	}
	
	@media (max-width: 768px) {
		.nav-links {
			position: fixed;
			top: 80px;
			left: 0;
			right: 0;
			background: rgba(10, 10, 10, 0.98);
			backdrop-filter: blur(20px);
			flex-direction: column;
			padding: 2rem;
			gap: 1.5rem;
			transform: translateY(-100%);
			opacity: 0;
			visibility: hidden;
			transition: all 0.3s ease;
		}
		
		.nav-links.open {
			transform: translateY(0);
			opacity: 1;
			visibility: visible;
		}
		
		.nav-links a {
			font-size: 1.2rem;
		}
		
		.menu-toggle {
			display: flex;
		}
	}
</style>

