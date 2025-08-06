<script>
	import { onMount } from 'svelte';
	
	let sectionElement;
	let isVisible = false;
	let selectedFilter = 'all';
	
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.2 }
		);
		
		if (sectionElement) {
			observer.observe(sectionElement);
		}
		
		return () => observer.disconnect();
	});
	
	const projects = [
		{
			id: 1,
			title: 'E-commerce Platform',
			description: 'Plataforma completa de e-commerce com painel administrativo, sistema de pagamentos e gestão de inventário.',
			image: '🛒',
			technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
			category: 'fullstack',
			github: 'https://github.com',
			demo: 'https://demo.com',
			featured: true
		},
		{
			id: 2,
			title: 'Task Management App',
			description: 'Aplicação de gestão de tarefas com colaboração em tempo real, notificações e analytics.',
			image: '📋',
			technologies: ['Svelte', 'Firebase', 'TypeScript'],
			category: 'frontend',
			github: 'https://github.com',
			demo: 'https://demo.com',
			featured: true
		},
		{
			id: 3,
			title: 'API Gateway',
			description: 'Gateway de APIs com autenticação, rate limiting, caching e monitorização em tempo real.',
			image: '🔗',
			technologies: ['Python', 'FastAPI', 'Redis', 'Docker'],
			category: 'backend',
			github: 'https://github.com',
			demo: null,
			featured: false
		},
		{
			id: 4,
			title: 'Portfolio Website',
			description: 'Site de portfólio responsivo com animações avançadas e otimização para SEO.',
			image: '🎨',
			technologies: ['SvelteKit', 'CSS3', 'GSAP'],
			category: 'frontend',
			github: 'https://github.com',
			demo: 'https://demo.com',
			featured: false
		},
		{
			id: 5,
			title: 'Data Analytics Dashboard',
			description: 'Dashboard interativo para análise de dados com gráficos dinâmicos e relatórios personalizados.',
			image: '📊',
			technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
			category: 'fullstack',
			github: 'https://github.com',
			demo: 'https://demo.com',
			featured: true
		},
		{
			id: 6,
			title: 'Mobile App Backend',
			description: 'Backend robusto para aplicação móvel com autenticação, push notifications e sincronização offline.',
			image: '📱',
			technologies: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
			category: 'backend',
			github: 'https://github.com',
			demo: null,
			featured: false
		}
	];
	
	const filters = [
		{ id: 'all', label: 'Todos' },
		{ id: 'fullstack', label: 'Full Stack' },
		{ id: 'frontend', label: 'Frontend' },
		{ id: 'backend', label: 'Backend' }
	];
	
	$: filteredProjects = selectedFilter === 'all' 
		? projects 
		: projects.filter(project => project.category === selectedFilter);
	
	function setFilter(filter) {
		selectedFilter = filter;
	}
</script>

<section id="projetos" class="projects-section" bind:this={sectionElement}>
	<div class="container">
		<div class="section-header" class:animate={isVisible}>
			<h2 class="section-title">Projetos</h2>
			<p class="section-subtitle">
				Uma seleção dos meus trabalhos mais recentes e impactantes
			</p>
		</div>
		
		<div class="filter-tabs" class:animate={isVisible}>
			{#each filters as filter}
				<button 
					class="filter-btn" 
					class:active={selectedFilter === filter.id}
					on:click={() => setFilter(filter.id)}
				>
					{filter.label}
				</button>
			{/each}
		</div>
		
		<div class="projects-grid" class:animate={isVisible}>
			{#each filteredProjects as project, index}
				<div 
					class="project-card" 
					class:featured={project.featured}
					style="animation-delay: {index * 0.1}s"
				>
					<div class="project-image">
						<span class="project-icon">{project.image}</span>
						<div class="project-overlay">
							<div class="project-links">
								{#if project.github}
									<a href={project.github} target="_blank" rel="noopener" class="project-link">
										<span>GitHub</span>
									</a>
								{/if}
								{#if project.demo}
									<a href={project.demo} target="_blank" rel="noopener" class="project-link demo">
										<span>Demo</span>
									</a>
								{/if}
							</div>
						</div>
					</div>
					
					<div class="project-content">
						<h3 class="project-title">{project.title}</h3>
						<p class="project-description">{project.description}</p>
						
						<div class="project-technologies">
							{#each project.technologies as tech}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects-section {
		padding: 8rem 0;
		background: #0a0a0a;
		color: white;
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}
	
	.section-header {
		text-align: center;
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease;
	}
	
	.section-header.animate {
		opacity: 1;
		transform: translateY(0);
	}
	
	.section-title {
		font-size: 3rem;
		font-weight: 900;
		margin-bottom: 1rem;
		background: linear-gradient(45deg, #00ff88, #4ecdc4);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.section-subtitle {
		font-size: 1.2rem;
		color: #a0a0a0;
		max-width: 600px;
		margin: 0 auto;
	}
	
	.filter-tabs {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 3rem;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease 0.2s;
	}
	
	.filter-tabs.animate {
		opacity: 1;
		transform: translateY(0);
	}
	
	.filter-btn {
		padding: 0.8rem 1.5rem;
		background: transparent;
		border: 2px solid #333;
		color: #a0a0a0;
		border-radius: 25px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-weight: 600;
	}
	
	.filter-btn:hover {
		border-color: #00ff88;
		color: #00ff88;
	}
	
	.filter-btn.active {
		background: linear-gradient(45deg, #00ff88, #4ecdc4);
		border-color: transparent;
		color: #0a0a0a;
	}
	
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.8s ease 0.4s;
	}
	
	.projects-grid.animate {
		opacity: 1;
		transform: translateY(0);
	}
	
	.project-card {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		border-radius: 15px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
		opacity: 0;
		transform: translateY(30px);
		animation: fadeInUp 0.6s ease forwards;
	}
	
	.project-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 20px 40px rgba(0, 255, 136, 0.1);
		border-color: rgba(0, 255, 136, 0.3);
	}
	
	.project-card.featured {
		border-color: rgba(0, 255, 136, 0.5);
		box-shadow: 0 10px 30px rgba(0, 255, 136, 0.1);
	}
	
	.project-image {
		position: relative;
		height: 200px;
		background: linear-gradient(135deg, #1a1a1a, #333);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	
	.project-icon {
		font-size: 4rem;
		opacity: 0.8;
	}
	
	.project-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	
	.project-card:hover .project-overlay {
		opacity: 1;
	}
	
	.project-links {
		display: flex;
		gap: 1rem;
	}
	
	.project-link {
		padding: 0.8rem 1.5rem;
		background: transparent;
		border: 2px solid #00ff88;
		color: #00ff88;
		text-decoration: none;
		border-radius: 25px;
		font-weight: 600;
		transition: all 0.3s ease;
	}
	
	.project-link:hover {
		background: #00ff88;
		color: #0a0a0a;
	}
	
	.project-link.demo {
		background: #00ff88;
		color: #0a0a0a;
	}
	
	.project-link.demo:hover {
		background: #4ecdc4;
	}
	
	.project-content {
		padding: 1.5rem;
	}
	
	.project-title {
		font-size: 1.3rem;
		font-weight: 700;
		margin-bottom: 0.8rem;
		color: #00ff88;
	}
	
	.project-description {
		color: #a0a0a0;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}
	
	.project-technologies {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	
	.tech-tag {
		padding: 0.3rem 0.8rem;
		background: rgba(0, 255, 136, 0.1);
		color: #00ff88;
		border-radius: 15px;
		font-size: 0.8rem;
		font-weight: 500;
		border: 1px solid rgba(0, 255, 136, 0.3);
	}
	
	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
		
		.filter-tabs {
			flex-wrap: wrap;
		}
		
		.section-title {
			font-size: 2rem;
		}
		
		.project-links {
			flex-direction: column;
		}
	}
</style>

