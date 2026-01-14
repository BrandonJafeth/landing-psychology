# AGENTS.MD - Guía de Buenas Prácticas
## Landing Page para Psicóloga

> **⚠️ INSTRUCCIÓN IMPORTANTE PARA EL AGENTE:**
> Antes de generar cualquier código o realizar cambios, **DEBES** realizar preguntas al usuario para comprender completamente el contexto, las preferencias específicas y cualquier requisito no detallado en este documento. No asumas; pregunta.

---

## 📋 Índice
1. [Paleta de Colores](#paleta-de-colores)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Principios de Desarrollo](#principios-de-desarrollo)
4. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
5. [Mejores Prácticas de Astro](#mejores-prácticas-de-astro)
6. [Principios SOLID Aplicados](#principios-solid-aplicados)
7. [Leyes de UX/UI](#leyes-de-uxui)
8. [Heurísticas de Usabilidad (Nielsen)](#heurísticas-de-usabilidad-nielsen)
9. [Performance y SEO](#performance-y-seo)
10. [Gestión de Datos](#gestión-de-datos)
11. [Formulario de Contacto](#formulario-de-contacto)
12. [Checklist Pre-desarrollo](#checklist-pre-desarrollo)
13. [Preguntas Antes de Comenzar](#preguntas-antes-de-comenzar)

---

## 🎨 Paleta de Colores y Tipografía

```css
:root {
  --primary: #559A95;      /* Teal - Principal */
  --background: #FFFFFF;   /* Fondo blanco limpio */
  --text-main: #333333;    /* Texto general (legibilidad) */
  --font-main: 'Playfair Display', serif; /* Tipografía Estándar */
}
```

**Aplicación:**
- **Primary (#559A95)**: Botones, encabezados, elementos clave.
- **Background (#FFFFFF)**: Fondo general.
- **Tipografía**: Se utilizará **Playfair Display** como tipografía estándar para todo el sitio (títulos y textos).

---

## 🛠 Stack Tecnológico

### Core
- **Astro 4.x** - Framework principal (SSG - Static Site Generation)
- **TypeScript** - Tipado estático
- **Vanilla CSS/Tailwind** - Estilos (verificar preferencia)

### Verificaciones Pre-instalación
```bash
# Verificar Node.js (requerido >= 18.14.1)
node --version

# Verificar si Astro está instalado
npx astro --version

# Verificar dependencias existentes
cat package.json

# Verificar estructura del proyecto
ls -la
```

### Dependencias Mínimas
```json
{
  "dependencies": {
    "astro": "^4.x.x"
  },
  "devDependencies": {
    "@astrojs/check": "^0.x.x",
    "typescript": "^5.x.x"
  }
}
```

---

## 🎯 Principios de Desarrollo

### 1. Minimalismo Digital
- **Una acción principal por sección**
- **Espacios en blanco generosos** (ratio 60/40)
- **Tipografía**: **Playfair Display** (Google Fonts) como estándar principal.
- **Tipografía clara y legible** (16px mínimo para body)
- **Máximo 3 niveles de jerarquía visual**
- **NO usar emojis ni iconos decorativos** a menos que se solicite explícitamente. Priorizar el uso de tipografía y espacio.

### 2. Performance First
```javascript
// Objetivos medibles
const performanceTargets = {
  FCP: '<1.5s',      // First Contentful Paint
  LCP: '<2.5s',      // Largest Contentful Paint
  TBT: '<200ms',     // Total Blocking Time
  CLS: '<0.1',       // Cumulative Layout Shift
  lighthouse: '>95'  // Score mínimo
}
```

### 3. SEO Estratégico
- Meta tags completos y descriptivos
- Schema.org para profesionales de salud
- Open Graph para redes sociales
- Sitemap.xml generado automáticamente
- robots.txt configurado

---

## 📁 Arquitectura del Proyecto

```
src/
├── components/
│   ├── common/
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   └── Section.astro
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── Methods.astro          // Seccion: Mis métodos
│   │   ├── IndividualTherapy.astro // Seccion: Terapia individual
│   │   ├── Training.astro         // Seccion: Capacitación y conferencias
│   │   ├── WellnessTools.astro    // Seccion: Herramientas de bienestar (Blog)
│   │   └── Connect.astro          // Seccion: ¿Tiene preguntas? (CTA/Contacto)
│   └── forms/
│       └── ContactForm.astro
├── data/
│   ├── site.json           // Datos generales y consultorios
│   ├── methods.json        // Métodos (EMDR, TCC, etc)
│   ├── posts.json          // Entradas del blog/herramientas
│   └── services.json       // Información general de servicios
├── layouts/
│   └── Layout.astro       // Layout principal
├── pages/
│   ├── index.astro        // Página principal
│   └── gracias.astro      // Página de agradecimiento
├── styles/
│   ├── global.css         // Estilos globales
│   └── variables.css      // Variables CSS
└── utils/
    ├── seo.ts            // Utilidades SEO
    └── validators.ts     // Validaciones de formulario
```

---

## 🚀 Mejores Prácticas de Astro

### 1. Componentes Island Architecture
```astro
---
// ✅ CORRECTO: Componente estático por defecto
import Card from '../components/Card.astro';
---

<Card title="Servicio" />
```

```astro
---
// ✅ CORRECTO: Hidratación solo cuando es necesaria
import ContactForm from '../components/ContactForm.astro';
---

<ContactForm client:visible />
```

### 2. Optimización de Imágenes
```astro
---
import { Image } from 'astro:assets';
import profileImg from '../assets/profile.jpg';
---

<Image 
  src={profileImg}
  alt="Descripción accesible"
  width={800}
  height={600}
  loading="lazy"
  decoding="async"
/>
```

### 3. Fetching de Datos
```astro
---
// ✅ CORRECTO: Importación estática de JSON
import services from '../data/services.json';

// ❌ EVITAR: Fetch en tiempo de build innecesario
// const services = await fetch('/api/services').then(r => r.json());
---
```

### 4. CSS Scoped
```astro
<style>
  /* Estilos encapsulados por defecto */
  .card {
    /* Solo afecta a este componente */
  }
</style>

<style is:global>
  /* Estilos globales cuando sea necesario */
  body {
    font-family: system-ui;
  }
</style>
```

---

## 🏗 Principios SOLID Aplicados

### S - Single Responsibility Principle
```astro
<!-- ✅ CORRECTO: Componente con una sola responsabilidad -->
<!-- Button.astro -->
---
interface Props {
  text: string;
  variant?: 'primary' | 'secondary';
  href?: string;
}
---

<!-- ❌ EVITAR: Componente que hace demasiadas cosas -->
<!-- ButtonWithIconAndTooltipAndAnalytics.astro -->
```

### O - Open/Closed Principle
```astro
<!-- ✅ CORRECTO: Componente extensible mediante props -->
---
interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const { variant = 'primary', size = 'md' } = Astro.props;
---

<button class={`btn btn-${variant} btn-${size}`}>
  <slot />
</button>
```

### L - Liskov Substitution Principle
```typescript
// ✅ CORRECTO: Interfaces consistentes
interface BaseSection {
  title: string;
  description: string;
}

interface ServiceSection extends BaseSection {
  icon: string;
  features: string[];
}
```

### I - Interface Segregation Principle
```typescript
// ✅ CORRECTO: Interfaces específicas
interface Clickable {
  onClick: () => void;
}

interface Linkable {
  href: string;
  target?: string;
}

// ❌ EVITAR: Interface monolítica
interface ButtonProps extends Clickable, Linkable, Hoverable, Focusable {}
```

### D - Dependency Inversion Principle
```typescript
// ✅ CORRECTO: Dependencia de abstracciones
interface DataSource {
  getData(): Promise<Data>;
}

class JSONDataSource implements DataSource {
  async getData() { /* ... */ }
}
```

---

## 🎨 Leyes de UX/UI

### 1. Ley de Fitts
```css
/* Objetivos táctiles mínimos: 44x44px */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}
```

### 2. Ley de Hick
```astro
<!-- Máximo 5-7 opciones por sección -->
<nav>
  <a href="#inicio">Inicio</a>
  <a href="#sobre-mi">Sobre Mí</a>
  <a href="#servicios">Servicios</a>
  <a href="#contacto">Contacto</a>
</nav>
```

### 3. Ley de Miller
```json
// Grupos de máximo 7±2 elementos
{
  "services": [
    "Terapia Individual",
    "Terapia de Pareja",
    "Terapia Familiar",
    "Ansiedad y Estrés",
    "Duelo y Pérdida"
  ]
}
```

### 4. Ley de Jakob
- Navegación en la parte superior
- Logo enlazado a inicio (esquina superior izquierda)
- Botón de acción principal destacado
- Footer con información de contacto

### 5. Ley de Proximidad (Gestalt)
```css
/* Elementos relacionados agrupados espacialmente */
.service-card {
  display: flex;
  flex-direction: column;
  gap: 8px; /* Espacio interno pequeño */
}

.services-grid {
  display: grid;
  gap: 32px; /* Espacio entre tarjetas mayor */
}
```

### 6. Ley de Prägnanz
- Diseño limpio y simétrico
- Formas geométricas simples
- Patrones reconocibles

---

## ✅ Heurísticas de Usabilidad (Nielsen)

### 1. Visibilidad del Estado del Sistema
```astro
<!-- Loading states en formulario -->
<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
</button>

<!-- Feedback visual -->
{success && <p class="success">¡Mensaje enviado con éxito!</p>}
{error && <p class="error">Error al enviar. Intenta nuevamente.</p>}
```

### 2. Coincidencia entre el Sistema y el Mundo Real
```json
{
  "ctaButton": "Agendar Cita",
  "services": {
    "anxiety": "Ansiedad y Estrés"
  }
}
```

### 3. Control y Libertad del Usuario
```astro
<!-- Navegación clara con breadcrumbs si es necesario -->
<nav aria-label="breadcrumb">
  <ol>
    <li><a href="/">Inicio</a></li>
    <li>Servicios</li>
  </ol>
</nav>

<!-- Formulario con opción de limpiar -->
<button type="reset">Limpiar Formulario</button>
```

### 4. Consistencia y Estándares
```css
/* Sistema de diseño consistente */
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
}
```

### 5. Prevención de Errores
```astro
<input 
  type="email" 
  required 
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  aria-describedby="email-hint"
/>
<span id="email-hint">Ejemplo: nombre@email.com</span>
```

### 6. Reconocimiento vs Recuerdo
```astro
<!-- Etiquetas descriptivas siempre visibles -->
<label for="name">Nombre Completo</label>
<input id="name" type="text" placeholder="Ej: María García" />
```

### 7. Flexibilidad y Eficiencia de Uso
```astro
<!-- Shortcuts de teclado y navegación accesible -->
<a href="#contacto" accesskey="c">
  <span class="shortcut">C</span>ontacto
</a>
```

### 8. Diseño Estético y Minimalista
```css
/* Regla 60-30-10 */
.page {
  background: var(--background); /* 60% */
}
.section {
  color: var(--primary); /* 30% */
}
.cta {
  background: var(--secondary); /* 10% */
}
```

### 9. Ayuda a Reconocer y Recuperarse de Errores
```javascript
// Mensajes de error descriptivos
const errorMessages = {
  email: 'Por favor ingresa un email válido (ej: nombre@email.com)',
  phone: 'El teléfono debe tener 10 dígitos',
  required: 'Este campo es obligatorio'
};
```

### 10. Ayuda y Documentación
```astro
<!-- FAQ section visible -->
<section id="preguntas-frecuentes">
  <h2>Preguntas Frecuentes</h2>
  <!-- FAQ content -->
</section>
```

---

## ⚡ Performance y SEO

### Performance Checklist

#### 1. Optimización de Recursos
```javascript
// astro.config.mjs
export default defineConfig({
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
```

#### 2. Lazy Loading Estratégico
```astro
---
// Solo imágenes above-the-fold sin lazy loading
---
<Image src={hero} loading="eager" />

<!-- Below-the-fold con lazy loading -->
<Image src={service} loading="lazy" />
```

#### 3. Preload de Recursos Críticos
```astro
<head>
  <link rel="preload" as="font" href="/fonts/main.woff2" crossorigin />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
</head>
```

#### 4. CSS Critical Inline
```astro
<head>
  #### 5. Animaciones Fluidas (GSAP Optimizado)
    - Uso estricto de `GSAP` para animaciones complejas.
    - Preferir `CSS transitions` para hovers simples.
    - Configuración de `gsap.context()` para limpieza en componentes Astro.
    - Uso de `Will-Change` solo cuando sea estrictamente necesario.

    ```javascript
    // src/utils/animations.ts
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";

    gsap.registerPlugin(ScrollTrigger);

    export const fadeUp = (element: Element) => {
      return gsap.fromTo(
       element,
       { opacity: 0, y: 30 },
       {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
       }
      );
    };
    
    // Uso en componente Astro
    // <script>
    //   import { fadeUp } from '../utils/animations';
    //   fadeUp(document.querySelector('.hero-title'));
    // </script>
    ```

  <style is:inline>
    /* Critical CSS inline para first paint */
    body { font-family: system-ui; margin: 0; }
    .hero { min-height: 100vh; }
  </style>
</head>
```

### SEO Checklist

#### 1. Meta Tags Completos
```astro
---
const seo = {
  title: 'Dra. [Nombre] - Psicóloga Clínica | Terapia Online y Presencial',
  description: 'Psicóloga especializada en terapia individual, de pareja y familiar. Más de X años de experiencia. Primera consulta gratuita.',
  canonical: 'https://www.ejemplo.com',
  image: '/og-image.jpg'
};
---

<head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
  <link rel="canonical" href={seo.canonical} />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={seo.title} />
  <meta property="og:description" content={seo.description} />
  <meta property="og:image" content={seo.image} />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seo.title} />
  <meta name="twitter:description" content={seo.description} />
</head>
```

#### 2. Schema.org Structured Data
```astro
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Psychologist",
  "name": "Dra. [Nombre Completo]",
  "image": "URL de la foto profesional",
  "description": "Descripción profesional",
  "telephone": "+52-xxx-xxx-xxxx",
  "email": "contacto@ejemplo.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle X",
    "addressLocality": "Ciudad",
    "addressCountry": "MX"
  },
  "priceRange": "$$",
  "openingHours": "Mo,Tu,We,Th,Fr 09:00-18:00"
}
</script>
```

#### 3. Sitemap y Robots
```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.ejemplo.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

```
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://www.ejemplo.com/sitemap.xml
```

---

## 📊 Gestión de Datos

### Estructura de Datos JSON

#### site.json
```json
{
  "meta": {
    "siteName": "Daniela Rodriguez",
    "tagline": "Psicología Clínica y Bienestar",
    "description": "Atención en Inglés y Español en presencial o virtual.",
    "author": "Daniela Rodriguez",
    "language": "es-CR"
  },
  "contact": {
    "email": "contacto@danielarodriguez.com",
    "phone": "+506 xxxx xxxx",
    "locations": [
      "Paseo Del Mar, Huacas, Santa Cruz, Guanacaste",
      "San Pedro, Roosevelt, San José"
    ]
  },
  "social": {
    "facebook": "",
    "instagram": "",
    "linkedin": ""
  }
}
```

#### methods.json
```json
{
  "methods": [
    {
      "id": "emdr",
      "title": "Terapia de EMDR para el trauma",
      "description": "Reprocesar experiencias traumáticas para disminuir su carga emocional.",
      "highlight": "Mayor respaldo científico para tratar el trauma."
    },
    {
      "id": "cbt",
      "title": "Terapia cognitivo conductual",
      "description": "Enfoque en lo que las personas piensan, más que en lo que hacen.",
      "highlight": "Terapia con más respaldo científico."
    }
  ]
}
```

#### posts.json
```json
{
  "posts": [
    {
      "id": "ansiedad",
      "title": "Cómo liberarse de la ansiedad paralizante",
      "date": "2024-12-31",
      "url": "..."
    }
  ]
}
```

#### services.json
```json
{
  "individual": {
    "title": "Terapia individual",
    "price": "30.000 por sesión",
    "description": "Trabajo sobre patrones de conducta.",
    "modalities": ["Inglés", "Español", "Presencial", "Virtual"]
  },
  "training": {
    "title": "Capacitación y conferencias",
    "description": "Talleres orientados al desarrollo emocional y bienestar laboral."
  }
}
```

---

## 📝 Formulario de Contacto

### Especificaciones

#### HTML Semántico y Accesible
```astro
<form 
  id="contact-form"
  method="POST"
  action="/api/contact"
  aria-labelledby="form-title"
>
  <h2 id="form-title">Solicita una Cita</h2>
  
  <div class="form-group">
    <label for="name">
      Nombre Completo <span aria-label="requerido">*</span>
    </label>
    <input 
      type="text"
      id="name"
      name="name"
      required
      aria-required="true"
      autocomplete="name"
      placeholder="Tu nombre completo"
    />
  </div>

  <div class="form-group">
    <label for="email">
      Email <span aria-label="requerido">*</span>
    </label>
    <input 
      type="email"
      id="email"
      name="email"
      required
      aria-required="true"
      autocomplete="email"
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      aria-describedby="email-hint"
    />
    <span id="email-hint" class="hint">ejemplo@correo.com</span>
  </div>

  <div class="form-group">
    <label for="phone">Teléfono</label>
    <input 
      type="tel"
      id="phone"
      name="phone"
      autocomplete="tel"
      pattern="[0-9]{10}"
      placeholder="10 dígitos"
    />
  </div>

  <div class="form-group">
    <label for="message">
      Mensaje <span aria-label="requerido">*</span>
    </label>
    <textarea 
      id="message"
      name="message"
      required
      aria-required="true"
      rows="5"
      placeholder="Cuéntame brevemente en qué puedo ayudarte"
    ></textarea>
  </div>

  <div class="form-group">
    <label>
      <input type="checkbox" name="privacy" required />
      Acepto la <a href="/privacidad">política de privacidad</a>
    </label>
  </div>

  <button type="submit" class="btn-primary">
    Enviar Mensaje
  </button>

  <div id="form-status" role="status" aria-live="polite"></div>
</form>
```

#### Validación Client-Side
```typescript
// src/utils/validators.ts
export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateForm(formData: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  
  const name = formData.get('name') as string;
  if (!name || name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  }
  
  const email = formData.get('email') as string;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Por favor ingresa un email válido';
  }
  
  const phone = formData.get('phone') as string;
  if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
    errors.phone = 'El teléfono debe tener 10 dígitos';
  }
  
  const message = formData.get('message') as string;
  if (!message || message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
```

#### Manejo de Envío (Inline Script)
```astro
<script>
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const status = document.getElementById('form-status');
  
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    
    // UI feedback
    button.disabled = true;
    button.textContent = 'Enviando...';
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        if (status) {
          status.className = 'success';
          status.textContent = '✓ ¡Mensaje enviado! Te contactaré pronto.';
        }
        form.reset();
        
        // Redirect opcional
        setTimeout(() => {
          window.location.href = '/gracias';
        }, 2000);
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      if (status) {
        status.className = 'error';
        status.textContent = '✗ Error al enviar. Por favor intenta nuevamente.';
      }
    } finally {
      button.disabled = false;
      button.textContent = 'Enviar Mensaje';
    }
  });
</script>
```

#### Estilos del Formulario
```css
/* src/styles/form.css */
.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: var(--font-size-base);
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.form-group .hint {
  display: block;
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.btn-primary {
  width: 100%;
  padding: 14px 24px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-primary:hover {
  background: var(--accent);
}

.btn-primary:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

#form-status {
  margin-top: var(--spacing-md);
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

#form-status.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

#form-status.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
```

---

## ✅ Checklist Pre-desarrollo

### Antes de Instalar Dependencias

- [ ] Verificar versión de Node.js (`node --version`)
- [ ] Verificar si existe `package.json`
- [ ] Revisar dependencias ya instaladas
- [ ] Verificar estructura de carpetas existente
- [ ] Comprobar si hay archivos de configuración (`.eslintrc`, `tsconfig.json`, etc.)
- [ ] Verificar existencia de carpeta `.git`
- [ ] Revisar si hay variables de entorno (`.env`)

### Antes de Escribir Código

- [ ] Confirmar paleta de colores y marca
- [ ] Definir contenido de cada sección
- [ ] Acordar jerarquía de información
- [ ] Establecer CTAs principales y secundarios
- [ ] Definir estrategia de imágenes
- [ ] Acordar integraciones necesarias (formularios, analytics, etc.)

---

## ❓ Preguntas Antes de Comenzar

El agente debe realizar preguntas como las siguientes para clarificar el contexto:

1. **Sobre el Cliente:**
   - ¿Cuál es el objetivo principal de la landing page? (Agendar citas, informar, vender un curso, etc.)
   - ¿Quién es el público objetivo ideal?
   - ¿Existe ya una identidad visual o logotipo definido?

2. **Sobre el Contenido:**
   - ¿Se dispone de los textos finales o se deben usar textos de relleno (Lorem Ipsum)?
   - ¿Se tienen las imágenes profesionales o se usarán de stock?

3. **Sobre Funcionalidades:**
   - ¿Cómo debe funcionar el formulario de contacto? (Email, WhatsApp, integración con CRM)
   - ¿Se requiere integración con calendario para citas (Calendly, Google Calendar)?

4. **Preferencias Técnicas:**
   - ¿Hay alguna preferencia específica sobre librerías de animación o estilos adicionales?
   - ¿Existen requisitos de hosting específicos?

