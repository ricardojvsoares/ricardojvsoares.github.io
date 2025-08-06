<script>
	import { onMount } from 'svelte';
	
	let sectionElement;
	let isVisible = false;
	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};
	let isSubmitting = false;
	let submitStatus = null;
	
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
	
	const contactInfo = [
		{
			icon: '📧',
			title: 'Email',
			value: 'joao.silva@email.com',
			link: 'mailto:myisha54@freezeion.com'
		},/* 
		{
			icon: '📱',
			title: 'Telefone',
			value: '+351 912 345 678',
			link: 'tel:+351912345678'
		}, */
		{
			icon: '📍',
			title: 'Localização',
			value: 'Lisboa, Portugal',
			link: null
		}/* ,
		{
			icon: '💼',
			title: 'LinkedIn',
			value: 'linkedin.com/in/joaosilva',
			link: 'https://linkedin.com/in/joaosilva'
		} */
	];
	
	const socialLinks = [
		{
			name: 'GitHub',
			icon: '🐙',
			url: 'https://github.com/joaosilva',
			color: '#333'
		},
		{
			name: 'LinkedIn',
			icon: '💼',
			url: 'https://linkedin.com/in/joaosilva',
			color: '#0077b5'
		},
		{
			name: 'Twitter',
			icon: '🐦',
			url: 'https://twitter.com/joaosilva',
			color: '#1da1f2'
		},
		{
			name: 'Instagram',
			icon: '📷',
			url: 'https://instagram.com/joaosilva',
			color: '#e4405f'
		}
	];
	
	async function handleSubmit(event) {
		event.preventDefault();
		isSubmitting = true;
		submitStatus = null;
		
		// Simular envio do formulário
		try {
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			// Aqui seria feita a integração com um serviço de email
			console.log('Form submitted:', formData);
			
			submitStatus = 'success';
			formData = { name: '', email: '', subject: '', message: '' };
		} catch (error) {
			submitStatus = 'error';
		} finally {
			isSubmitting = false;
			setTimeout(() => {
				submitStatus = null;
			}, 5000);
		}
	}
	
	function validateEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}
	
	$: isFormValid = formData.name.trim() && 
					 validateEmail(formData.email) && 
					 formData.subject.trim() && 
					 formData.message.trim();
</script>

<section id="contacto" class="contact-section" bind:this={sectionElement}>
	<div class="container">
		<div class="section-header" class:animate={isVisible}>
			<h2 class="section-title">Vamos Trabalhar Juntos</h2>
			<p class="section-subtitle">
				Tem um projeto em mente? Vamos conversar sobre como posso ajudar a torná-lo realidade.
			</p>
		</div>
		
		<div class="contact-content" class:animate={isVisible}>
			<div class="contact-info">
				<h3 class="info-title">Informações de Contacto</h3>
				<p class="info-description">
					Estou sempre disponível para discutir novos projetos, 
					oportunidades criativas ou simplesmente para uma conversa sobre tecnologia.
				</p>
				
				<div class="contact-details">
					{#each contactInfo as info, index}
						<div 
							class="contact-item"
							style="animation-delay: {index * 0.1}s"
							class:animate={isVisible}
						>
							<span class="contact-icon">{info.icon}</span>
							<div class="contact-text">
								<h4>{info.title}</h4>
								{#if info.link}
									<a href={info.link} target="_blank" rel="noopener">
										{info.value}
									</a>
								{:else}
									<span>{info.value}</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>
				
				<div class="social-links">
					<h4>Siga-me nas redes sociais</h4>
					<div class="social-grid">
						{#each socialLinks as social, index}
							<a 
								href={social.url} 
								target="_blank" 
								rel="noopener"
								class="social-link"
								style="animation-delay: {index * 0.1}s"
								class:animate={isVisible}
							>
								<span class="social-icon">{social.icon}</span>
								<span class="social-name">{social.name}</span>
							</a>
						{/each}
					</div>
				</div>
			</div>
			
			<div class="contact-form-container">
				<form class="contact-form" on:submit={handleSubmit}>
					<h3 class="form-title">Envie uma Mensagem</h3>
					
					{#if submitStatus === 'success'}
						<div class="status-message success">
							✅ Mensagem enviada com sucesso! Responderei em breve.
						</div>
					{:else if submitStatus === 'error'}
						<div class="status-message error">
							❌ Erro ao enviar mensagem. Tente novamente.
						</div>
					{/if}
					
					<div class="form-row">
						<div class="form-group">
							<label for="name">Nome *</label>
							<input 
								type="text" 
								id="name" 
								bind:value={formData.name}
								required
								placeholder="Seu nome completo"
							/>
						</div>
						
						<div class="form-group">
							<label for="email">Email *</label>
							<input 
								type="email" 
								id="email" 
								bind:value={formData.email}
								required
								placeholder="seu@email.com"
							/>
						</div>
					</div>
					
					<div class="form-group">
						<label for="subject">Assunto *</label>
						<input 
							type="text" 
							id="subject" 
							bind:value={formData.subject}
							required
							placeholder="Assunto da mensagem"
						/>
					</div>
					
					<div class="form-group">
						<label for="message">Mensagem *</label>
						<textarea 
							id="message" 
							bind:value={formData.message}
							required
							placeholder="Descreva seu projeto ou dúvida..."
							rows="2"
						></textarea>
					</div>
					
					<button 
						type="submit" 
						class="submit-btn"
						disabled={!isFormValid || isSubmitting}
					>
						{#if isSubmitting}
							<span class="loading-spinner"></span>
							Enviando...
						{:else}
							Enviar Mensagem
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-section {
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
	
	.contact-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.8s ease 0.2s;
	}
	
	.contact-content.animate {
		opacity: 1;
		transform: translateY(0);
	}
	
	.info-title {
		font-size: 1.8rem;
		margin-bottom: 1rem;
		color: #00ff88;
	}
	
	.info-description {
		color: #a0a0a0;
		line-height: 1.6;
		margin-bottom: 2rem;
	}
	
	.contact-details {
		margin-bottom: 3rem;
	}
	
	.contact-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
		opacity: 0;
		transform: translateX(-30px);
		transition: all 0.6s ease;
	}
	
	.contact-item.animate {
		opacity: 1;
		transform: translateX(0);
	}
	
	.contact-icon {
		font-size: 1.5rem;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 255, 136, 0.1);
		border-radius: 50%;
		border: 1px solid rgba(0, 255, 136, 0.3);
	}
	
	.contact-text h4 {
		color: #00ff88;
		margin-bottom: 0.3rem;
		font-weight: 600;
	}
	
	.contact-text a {
		color: #a0a0a0;
		text-decoration: none;
		transition: color 0.3s ease;
	}
	
	.contact-text a:hover {
		color: #00ff88;
	}
	
	.contact-text span {
		color: #a0a0a0;
	}
	
	.social-links h4 {
		color: #00ff88;
		margin-bottom: 1rem;
	}
	
	.social-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}
	
	.social-link {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
		text-decoration: none;
		color: #a0a0a0;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.1);
		opacity: 0;
		transform: translateY(20px);
		animation: fadeInUp 0.6s ease forwards;
	}
	
	.social-link:hover {
		color: #00ff88;
		border-color: rgba(0, 255, 136, 0.3);
		transform: translateY(-2px);
	}
	
	.social-icon {
		font-size: 1.2rem;
	}
	
	.contact-form-container {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 2rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.form-title {
		font-size: 1.8rem;
		margin-bottom: 1.5rem;
		color: #00ff88;
	}
	
	.status-message {
		padding: 1rem;
		border-radius: 10px;
		margin-bottom: 1.5rem;
		font-weight: 600;
	}
	
	.status-message.success {
		background: rgba(0, 255, 136, 0.1);
		color: #00ff88;
		border: 1px solid rgba(0, 255, 136, 0.3);
	}
	
	.status-message.error {
		background: rgba(255, 107, 107, 0.1);
		color: #ff6b6b;
		border: 1px solid rgba(255, 107, 107, 0.3);
	}
	
	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	
	.form-group {
		margin-bottom: 1.5rem;
	}
	
	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		color: #00ff88;
		font-weight: 600;
	}
	
	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: white;
		font-size: 1rem;
		transition: all 0.3s ease;
	}
	
	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #00ff88;
		box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2);
	}
	
	.form-group input::placeholder,
	.form-group textarea::placeholder {
		color: #666;
	}
	
	.submit-btn {
		width: 100%;
		padding: 1rem 2rem;
		background: linear-gradient(45deg, #00ff88, #4ecdc4);
		border: none;
		border-radius: 10px;
		color: #0a0a0a;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
	
	.submit-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(0, 255, 136, 0.3);
	}
	
	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	
	.loading-spinner {
		width: 20px;
		height: 20px;
		border: 2px solid #0a0a0a;
		border-top: 2px solid transparent;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
	
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	
	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	@media (max-width: 768px) {
		.contact-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		
		.form-row {
			grid-template-columns: 1fr;
		}
		
		.social-grid {
			grid-template-columns: 1fr;
		}
		
		.section-title {
			font-size: 2rem;
		}
	}
</style>

