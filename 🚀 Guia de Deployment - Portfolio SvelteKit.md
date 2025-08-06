# 🚀 Guia de Deployment - Portfolio SvelteKit

Este documento fornece instruções detalhadas para fazer o deployment do seu portfólio SvelteKit em diferentes plataformas.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no GitHub
- Projeto testado localmente

## 🌐 Opções de Deployment

### 1. Vercel (Recomendado)

A Vercel oferece integração nativa com SvelteKit e deployment automático.

#### Passos:

1. **Conectar ao GitHub:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "New Project"

2. **Importar Repositório:**
   - Selecione o repositório do portfólio
   - A Vercel detectará automaticamente que é um projeto SvelteKit

3. **Configurar Build:**
   ```bash
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

4. **Deploy:**
   - Clique em "Deploy"
   - O site estará disponível em poucos minutos

#### Vantagens:
- ✅ Deployment automático a cada push
- ✅ HTTPS gratuito
- ✅ CDN global
- ✅ Preview deployments para PRs

### 2. Netlify

Outra excelente opção para sites estáticos.

#### Passos:

1. **Conectar Repositório:**
   - Acesse [netlify.com](https://netlify.com)
   - Clique em "New site from Git"
   - Conecte sua conta GitHub

2. **Configurar Build:**
   ```bash
   Build command: npm run build
   Publish directory: build
   ```

3. **Deploy:**
   - Clique em "Deploy site"

#### Vantagens:
- ✅ Formulários gratuitos
- ✅ Functions serverless
- ✅ Split testing

### 3. GitHub Pages

Para deployment gratuito diretamente do GitHub.

#### Configuração:

1. **Instalar gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Adicionar scripts ao package.json:**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d build"
     }
   }
   ```

3. **Configurar adapter:**
   ```bash
   npm install --save-dev @sveltejs/adapter-static
   ```

4. **Atualizar svelte.config.js:**
   ```javascript
   import adapter from '@sveltejs/adapter-static';
   
   export default {
     kit: {
       adapter: adapter({
         pages: 'build',
         assets: 'build',
         fallback: null
       }),
       paths: {
         base: '/nome-do-repositorio'
       }
     }
   };
   ```

5. **Deploy:**
   ```bash
   npm run deploy
   ```

### 4. Railway

Para deployment com backend se necessário.

#### Passos:

1. **Conectar ao GitHub:**
   - Acesse [railway.app](https://railway.app)
   - Conecte sua conta GitHub

2. **Criar Projeto:**
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"

3. **Configurar:**
   - Railway detectará automaticamente o SvelteKit
   - Build será executado automaticamente

## 🔧 Configurações Específicas

### Variáveis de Ambiente

Se o projeto usar variáveis de ambiente:

```bash
# .env.example
VITE_API_URL=https://api.exemplo.com
VITE_CONTACT_EMAIL=contato@exemplo.com
```

### Otimizações para Produção

1. **Preload de Fontes:**
   ```html
   <link rel="preload" href="/fonts/font.woff2" as="font" type="font/woff2" crossorigin>
   ```

2. **Meta Tags SEO:**
   ```html
   <meta name="description" content="Portfólio de João Silva - Desenvolvedor Full Stack">
   <meta property="og:title" content="João Silva - Desenvolvedor Full Stack">
   <meta property="og:description" content="Portfólio profissional com projetos e competências">
   ```

3. **Sitemap:**
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://seudominio.com/</loc>
       <lastmod>2025-01-01</lastmod>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

## 📊 Monitorização

### Analytics

Adicionar Google Analytics:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance

Ferramentas para monitorizar performance:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 🔒 Segurança

### Headers de Segurança

Adicionar ao `app.html`:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline';">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
```

## 🚀 Deployment Automático

### GitHub Actions

Criar `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: vercel/action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📝 Checklist Final

Antes do deployment, verificar:

- [ ] ✅ Todas as imagens estão otimizadas
- [ ] ✅ Links externos abrem em nova aba
- [ ] ✅ Formulário de contacto funciona
- [ ] ✅ Site é responsivo em todos os dispositivos
- [ ] ✅ Performance score > 90 no Lighthouse
- [ ] ✅ SEO score > 90 no Lighthouse
- [ ] ✅ Accessibility score > 90 no Lighthouse
- [ ] ✅ Favicon está configurado
- [ ] ✅ Meta tags estão completas
- [ ] ✅ README.md está atualizado

## 🆘 Troubleshooting

### Problemas Comuns:

1. **Build falha:**
   - Verificar se todas as dependências estão instaladas
   - Verificar se não há erros de TypeScript

2. **Imagens não carregam:**
   - Verificar se estão na pasta `static/`
   - Verificar caminhos relativos

3. **Formulário não funciona:**
   - Configurar serviço de backend (Netlify Forms, Formspree, etc.)

## 📞 Suporte

Para dúvidas sobre deployment:
- [Documentação SvelteKit](https://kit.svelte.dev/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)

---

🎉 **Parabéns!** Seu portfólio está pronto para o mundo!

