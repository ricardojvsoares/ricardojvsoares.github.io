<script>
	import { onMount } from 'svelte';
	
	let sectionElement;
	let isVisible = false;
	
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.3 }
		);
		
		if (sectionElement) {
			observer.observe(sectionElement);
		}
		
		return () => observer.disconnect();
	});
	
	const skills = [
		{ name: 'JavaScript/TypeScript', level: 95 },
		{ name: 'React/Svelte', level: 90 },
		{ name: 'Node.js', level: 85 },
		{ name: 'Python', level: 80 },
		{ name: 'Design UI/UX', level: 75 }
	];
	
	const experience = [
		{
			year: '2024',
			title: 'Senior Full Stack Developer',
			company: 'Tech Innovation Ltd.',
			description: 'Liderança de equipa no desenvolvimento de aplicações web complexas'
		},
		{
			year: '2022',
			title: 'Full Stack Developer',
			company: 'Digital Solutions Inc.',
			description: 'Desenvolvimento de soluções web escaláveis e APIs robustas'
		},
		{
			year: '2020',
			title: 'Frontend Developer',
			company: 'Creative Agency',
			description: 'Criação de interfaces modernas e experiências de utilizador excepcionais'
		}
	];
</script>

<section id="sobre" class="about-section" bind:this={sectionElement}>
	<div class="container">
		<div class="about-content" class:animate={isVisible}>
			<div class="about-text">
				<h2 class="section-title">Sobre Mim</h2>
				<p class="about-description">
					Sou um desenvolvedor full stack apaixonado por criar experiências digitais 
					inovadoras e funcionais. Com mais de 4 anos de experiência, especializo-me 
					em tecnologias modernas como React, Svelte, Node.js e Python.
				</p>
				<p class="about-description">
					Acredito que o código deve ser não apenas funcional, mas também elegante 
					e sustentável. Estou sempre em busca de novos desafios que me permitam 
					crescer profissionalmente e contribuir para projetos impactantes.
				</p>
				
				<div class="skills-grid">
					<h3>Competências Principais</h3>
					{#each skills as skill, index}
						<div class="skill-item" style="animation-delay: {index * 0.1}s" class:animate={isVisible}>
							<div class="skill-info">
								<span class="skill-name">{skill.name}</span>
								<span class="skill-percentage">{skill.level}%</span>
							</div>
							<div class="skill-bar">
								<div class="skill-progress" style="width: {isVisible ? skill.level : 0}%"></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
			
			<div class="about-visual">
				<div class="profile-card">
					<div class="profile-image">
						<img src="/profile.png" alt="João Silva - Desenvolvedor Full Stack" class="profile-photo" />
					</div>
					<div class="profile-info">
						<h3>João Silva</h3>
						<p>Full Stack Developer</p>
						<div class="profile-stats">
							<div class="stat">
								<span class="stat-number">50+</span>
								<span class="stat-label">Projetos</span>
							</div>
							<div class="stat">
								<span class="stat-number">4+</span>
								<span class="stat-label">Anos</span>
							</div>
							<div class="stat">
								<span class="stat-number">15+</span>
								<span class="stat-label">Clientes</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="experience-timeline" class:animate={isVisible}>
			<h3>Experiência Profissional</h3>
			<div class="timeline">
				{#each experience as exp, index}
					<div class="timeline-item" style="animation-delay: {index * 0.2}s" class:animate={isVisible}>
						<div class="timeline-year">{exp.year}</div>
						<div class="timeline-content">
							<h4>{exp.title}</h4>
							<p class="company">{exp.company}</p>
							<p class="description">{exp.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.about-section {
		padding: 8rem 0;
		background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
		color: white;
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}
	
	.about-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.8s ease;
	}
	
	.about-content.animate {
		opacity: 1;
		transform: translateY(0);
	}
	
	.section-title {
		font-size: 3rem;
		font-weight: 900;
		margin-bottom: 2rem;
		background: linear-gradient(45deg, #00ff88, #4ecdc4);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.about-description {
		font-size: 1.1rem;
		line-height: 1.8;
		color: #a0a0a0;
		margin-bottom: 1.5rem;
	}
	
	.skills-grid {
		margin-top: 3rem;
	}
	
	.skills-grid h3 {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
		color: #00ff88;
	}
	
	.skill-item {
		margin-bottom: 1.5rem;
		opacity: 0;
		transform: translateX(-30px);
		transition: all 0.6s ease;
	}
	
	.skill-item.animate {
		opacity: 1;
		transform: translateX(0);
	}
	
	.skill-info {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}
	
	.skill-name {
		font-weight: 600;
	}
	
	.skill-percentage {
		color: #00ff88;
		font-weight: 600;
	}
	
	.skill-bar {
		height: 8px;
		background: #333;
		border-radius: 4px;
		overflow: hidden;
	}
	
	.skill-progress {
		height: 100%;
		background: linear-gradient(45deg, #00ff88, #4ecdc4);
		border-radius: 4px;
		transition: width 1.5s ease;
	}
	
	.profile-card {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 2rem;
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.profile-image {
		margin-bottom: 1.5rem;
	}
	
	.profile-photo {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid #00ff88;
		transition: transform 0.3s ease;
	}
	
	.profile-photo:hover {
		transform: scale(1.05);
	}
	
	.profile-info h3 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}
	
	.profile-info p {
		color: #a0a0a0;
		margin-bottom: 2rem;
	}
	
	.profile-stats {
		display: flex;
		justify-content: space-around;
	}
	
	.stat {
		text-align: center;
	}
	
	.stat-number {
		display: block;
		font-size: 2rem;
		font-weight: 900;
		color: #00ff88;
	}
	
	.stat-label {
		font-size: 0.9rem;
		color: #a0a0a0;
	}
	
	.experience-timeline {
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.8s ease 0.3s;
	}
	
	.experience-timeline.animate {
		opacity: 1;
		transform: translateY(0);
	}
	
	.experience-timeline h3 {
		font-size: 2rem;
		margin-bottom: 2rem;
		text-align: center;
		color: #00ff88;
	}
	
	.timeline {
		position: relative;
		padding-left: 2rem;
	}
	
	.timeline::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 2px;
		background: linear-gradient(to bottom, #00ff88, #4ecdc4);
	}
	
	.timeline-item {
		position: relative;
		margin-bottom: 3rem;
		opacity: 0;
		transform: translateX(-30px);
		transition: all 0.6s ease;
	}
	
	.timeline-item.animate {
		opacity: 1;
		transform: translateX(0);
	}
	
	.timeline-item::before {
		content: '';
		position: absolute;
		left: -2rem;
		top: 0.5rem;
		width: 12px;
		height: 12px;
		background: #00ff88;
		border-radius: 50%;
		transform: translateX(-50%);
	}
	
	.timeline-year {
		font-size: 1.2rem;
		font-weight: 700;
		color: #00ff88;
		margin-bottom: 0.5rem;
	}
	
	.timeline-content h4 {
		font-size: 1.3rem;
		margin-bottom: 0.5rem;
	}
	
	.company {
		color: #4ecdc4;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}
	
	.description {
		color: #a0a0a0;
		line-height: 1.6;
	}
	
	@media (max-width: 768px) {
		.about-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		
		.section-title {
			font-size: 2rem;
		}
		
		.profile-stats {
			flex-direction: column;
			gap: 1rem;
		}
		
		.timeline {
			padding-left: 1rem;
		}
		
		.timeline-item::before {
			left: -1rem;
		}
	}
</style>

