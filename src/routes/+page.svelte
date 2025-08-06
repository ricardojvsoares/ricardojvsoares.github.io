<script>
	import { onMount } from 'svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Contact from '$lib/components/Contact.svelte';
	
	let mounted = false;
	
	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Ricardo Soares</title>
	<meta name="description" content="Portfólio profissional de desenvolvedor full stack especializado em tecnologias modernas" />
</svelte:head>

<Navigation />

<div class="hero">
	<div class="hero-content">
		<h1 class="hero-title" class:animate={mounted}>
			Desenvolvedor
			<span class="gradient-text">Full Stack</span>
		</h1>
		<p class="hero-subtitle" class:animate={mounted}>
			Criando experiências digitais modernas e inovadoras
		</p>
		<div class="hero-actions" class:animate={mounted}>
			<a href="#projetos" class="btn-primary">Ver Projetos</a>
			<a href="#contacto" class="btn-secondary">Contactar</a>
		</div>
	</div>
	<div class="hero-visual">
		<div class="floating-elements">
			<div class="element element-1"></div>
			<div class="element element-2"></div>
			<div class="element element-3"></div>
		</div>
	</div>
</div>

<About />
<Projects />
<Skills />
<Contact />

<style>
	.hero {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 100vh;
		padding: 2rem;
		background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
		color: white;
		overflow: hidden;
	}
	
	.hero-content {
		flex: 1;
		max-width: 600px;
	}
	
	.hero-title {
		font-size: clamp(2.5rem, 8vw, 4rem);
		font-weight: 900;
		line-height: 1.1;
		margin-bottom: 1rem;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease;
	}
	
	.hero-title.animate {
		opacity: 1;
		transform: translateY(0);
	}
	
	.gradient-text {
		background: linear-gradient(45deg, #00ff88, #4ecdc4);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.hero-subtitle {
		font-size: 1.25rem;
		color: #a0a0a0;
		margin-bottom: 2rem;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease 0.2s;
	}
	
	.hero-subtitle.animate {
		opacity: 1;
		transform: translateY(0);
	}
	
	.hero-actions {
		display: flex;
		gap: 1rem;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease 0.4s;
	}
	
	.hero-actions.animate {
		opacity: 1;
		transform: translateY(0);
	}
	
	.btn-primary, .btn-secondary {
		display: inline-block;
		padding: 1rem 2rem;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1rem;
		text-decoration: none;
	}
	
	.btn-primary {
		background: linear-gradient(45deg, #00ff88, #4ecdc4);
		color: #0a0a0a;
	}
	
	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(0, 255, 136, 0.3);
	}
	
	.btn-secondary {
		background: transparent;
		color: white;
		border: 2px solid #333;
	}
	
	.btn-secondary:hover {
		border-color: #00ff88;
		color: #00ff88;
		transform: translateY(-2px);
	}
	
	.hero-visual {
		flex: 1;
		position: relative;
		height: 500px;
	}
	
	.floating-elements {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.element {
		position: absolute;
		border-radius: 50%;
		background: linear-gradient(45deg, #00ff88, #4ecdc4);
		opacity: 0.1;
		animation: float 6s ease-in-out infinite;
	}
	
	.element-1 {
		width: 100px;
		height: 100px;
		top: 20%;
		left: 20%;
		animation-delay: 0s;
	}
	
	.element-2 {
		width: 150px;
		height: 150px;
		top: 60%;
		right: 30%;
		animation-delay: 2s;
	}
	
	.element-3 {
		width: 80px;
		height: 80px;
		bottom: 20%;
		left: 60%;
		animation-delay: 4s;
	}
	
	@keyframes float {
		0%, 100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-20px) rotate(180deg);
		}
	}
	
	@media (max-width: 768px) {
		.hero {
			flex-direction: column;
			text-align: center;
			padding: 1rem;
		}
		
		.hero-visual {
			height: 200px;
			margin-top: 2rem;
		}
		
		.hero-actions {
			flex-direction: column;
			align-items: center;
		}
	}
</style>

