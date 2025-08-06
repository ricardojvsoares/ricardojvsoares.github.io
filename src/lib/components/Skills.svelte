<script>
	import { onMount } from 'svelte';
	
	let sectionElement;
	let isVisible = false;
	let activeCategory = 'frontend';
	
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
	
	const skillCategories = {
		frontend: {
			title: 'Frontend Development',
			icon: '🎨',
			skills: [
				{ name: 'React', level: 95, icon: '⚛️' },
				{ name: 'Svelte/SvelteKit', level: 90, icon: '🔥' },
				{ name: 'Vue.js', level: 85, icon: '💚' },
				{ name: 'TypeScript', level: 92, icon: '📘' },
				{ name: 'CSS3/SASS', level: 88, icon: '🎨' },
				{ name: 'Tailwind CSS', level: 90, icon: '💨' }
			]
		},
		backend: {
			title: 'Backend Development',
			icon: '⚙️',
			skills: [
				{ name: 'Node.js', level: 88, icon: '🟢' },
				{ name: 'Python', level: 85, icon: '🐍' },
				{ name: 'Express.js', level: 90, icon: '🚀' },
				{ name: 'FastAPI', level: 82, icon: '⚡' },
				{ name: 'PostgreSQL', level: 80, icon: '🐘' },
				{ name: 'MongoDB', level: 85, icon: '🍃' }
			]
		},
		tools: {
			title: 'Tools & DevOps',
			icon: '🛠️',
			skills: [
				{ name: 'Git/GitHub', level: 95, icon: '📚' },
				{ name: 'Docker', level: 80, icon: '🐳' },
				{ name: 'AWS', level: 75, icon: '☁️' },
				{ name: 'Vercel', level: 90, icon: '▲' },
				{ name: 'Figma', level: 85, icon: '🎯' },
				{ name: 'VS Code', level: 95, icon: '💻' }
			]
		}
	};
	
	const achievements = [
		{
			title: 'Certificação AWS',
			description: 'AWS Certified Developer Associate',
			year: '2024',
			icon: '🏆'
		},
		{
			title: 'Contribuidor Open Source',
			description: '50+ contribuições em projetos públicos',
			year: '2023',
			icon: '🌟'
		},
		{
			title: 'Tech Speaker',
			description: 'Palestrante em conferências de tecnologia',
			year: '2023',
			icon: '🎤'
		},
		{
			title: 'Mentor',
			description: 'Mentor de 20+ desenvolvedores júnior',
			year: '2022',
			icon: '👨‍🏫'
		}
	];
	
	function setActiveCategory(category) {
		activeCategory = category;
	}
</script>

<section id="skills" class="skills-section" bind:this={sectionElement}>
	<div class="container">
		<div class="section-header" class:animate={isVisible}>
			<h2 class="section-title">Skills & Competências</h2>
			<p class="section-subtitle">
				Tecnologias e ferramentas que domino para criar soluções completas
			</p>
		</div>
		
		<div class="skills-content" class:animate={isVisible}>
			<div class="category-tabs">
				{#each Object.entries(skillCategories) as [key, category]}
					<button 
						class="category-tab" 
						class:active={activeCategory === key}
						on:click={() => setActiveCategory(key)}
					>
						<span class="tab-icon">{category.icon}</span>
						<span class="tab-title">{category.title}</span>
					</button>
				{/each}
			</div>
			
			<div class="skills-grid">
				{#each skillCategories[activeCategory].skills as skill, index}
					<div 
						class="skill-card" 
						style="animation-delay: {index * 0.1}s"
						class:animate={isVisible}
					>
						<div class="skill-header">
							<span class="skill-icon">{skill.icon}</span>
							<h3 class="skill-name">{skill.name}</h3>
						</div>
						<div class="skill-level">
							<div class="level-bar">
								<div 
									class="level-fill" 
									style="width: {isVisible ? skill.level : 0}%"
								></div>
							</div>
							<span class="level-text">{skill.level}%</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
		
		<div class="achievements-section" class:animate={isVisible}>
			<h3 class="achievements-title">Conquistas & Certificações</h3>
			<div class="achievements-grid">
				{#each achievements as achievement, index}
					<div 
						class="achievement-card"
						style="animation-delay: {index * 0.15}s"
						class:animate={isVisible}
					>
						<div class="achievement-icon">{achievement.icon}</div>
						<div class="achievement-content">
							<h4 class="achievement-title">{achievement.title}</h4>
							<p class="achievement-description">{achievement.description}</p>
							<span class="achievement-year">{achievement.year}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.skills-section {
		padding: 8rem 0;
		background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
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
	
	.skills-content {
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.8s ease 0.2s;
	}
	
	.skills-content.animate {
		opacity: 1;
		transform: translateY(0);
	}
	
	.category-tabs {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}
	
	.category-tab {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.05);
		border: 2px solid rgba(255, 255, 255, 0.1);
		border-radius: 15px;
		color: #a0a0a0;
		cursor: pointer;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
	}
	
	.category-tab:hover {
		border-color: #00ff88;
		color: #00ff88;
		transform: translateY(-2px);
	}
	
	.category-tab.active {
		background: linear-gradient(45deg, #00ff88, #4ecdc4);
		border-color: transparent;
		color: #0a0a0a;
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(0, 255, 136, 0.3);
	}
	
	.tab-icon {
		font-size: 1.2rem;
	}
	
	.tab-title {
		font-weight: 600;
	}
	
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-bottom: 4rem;
	}
	
	.skill-card {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		border-radius: 15px;
		padding: 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
		opacity: 0;
		transform: translateY(30px);
		animation: fadeInUp 0.6s ease forwards;
	}
	
	.skill-card:hover {
		transform: translateY(-5px);
		border-color: rgba(0, 255, 136, 0.3);
		box-shadow: 0 10px 25px rgba(0, 255, 136, 0.1);
	}
	
	.skill-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	
	.skill-icon {
		font-size: 2rem;
	}
	
	.skill-name {
		font-size: 1.2rem;
		font-weight: 600;
		color: #00ff88;
	}
	
	.skill-level {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	
	.level-bar {
		flex: 1;
		height: 8px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
		overflow: hidden;
	}
	
	.level-fill {
		height: 100%;
		background: linear-gradient(45deg, #00ff88, #4ecdc4);
		border-radius: 4px;
		transition: width 1.5s ease;
	}
	
	.level-text {
		font-weight: 600;
		color: #00ff88;
		min-width: 40px;
	}
	
	.achievements-section {
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.8s ease 0.4s;
	}
	
	.achievements-section.animate {
		opacity: 1;
		transform: translateY(0);
	}
	
	.achievements-title {
		font-size: 2rem;
		text-align: center;
		margin-bottom: 2rem;
		color: #00ff88;
	}
	
	.achievements-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}
	
	.achievement-card {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		border-radius: 15px;
		padding: 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		text-align: center;
		transition: all 0.3s ease;
		opacity: 0;
		transform: translateY(30px);
		animation: fadeInUp 0.6s ease forwards;
	}
	
	.achievement-card:hover {
		transform: translateY(-5px);
		border-color: rgba(0, 255, 136, 0.3);
		box-shadow: 0 10px 25px rgba(0, 255, 136, 0.1);
	}
	
	.achievement-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}
	
	.achievement-title {
		font-size: 1.2rem;
		font-weight: 600;
		color: #00ff88;
		margin-bottom: 0.5rem;
	}
	
	.achievement-description {
		color: #a0a0a0;
		margin-bottom: 1rem;
		line-height: 1.5;
	}
	
	.achievement-year {
		display: inline-block;
		padding: 0.3rem 0.8rem;
		background: rgba(0, 255, 136, 0.1);
		color: #00ff88;
		border-radius: 15px;
		font-size: 0.9rem;
		font-weight: 600;
		border: 1px solid rgba(0, 255, 136, 0.3);
	}
	
	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	@media (max-width: 768px) {
		.section-title {
			font-size: 2rem;
		}
		
		.category-tabs {
			flex-direction: column;
			align-items: center;
		}
		
		.skills-grid {
			grid-template-columns: 1fr;
		}
		
		.achievements-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

