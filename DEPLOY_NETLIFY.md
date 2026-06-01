# Despliegue del frontend en Netlify

## Requisitos previos

1. Cuenta en [Netlify](https://www.netlify.com/)
2. Repositorio en GitHub: `https://github.com/SamCocho127/LAabAgents.git`
3. Backend desplegado y funcionando: `http://investigation2prograiv.runasp.net/`

## Por qué esta configuración

| Problema | Solución en este repo |
|----------|------------------------|
| React Router (`/login`, `/books`) da 404 al recargar | Redirección SPA → `index.html` |
| CORS entre Netlify y MonsterASP | Proxy: el navegador solo habla con Netlify |
| Mixed content (HTTPS frontend → HTTP API) | Proxy en `netlify.toml` (misma origen) |

## Pasos en Netlify (UI)

### 1. Importar el proyecto

1. **Add new site** → **Import an existing project**
2. Conecta **GitHub** y elige el repo **LAabAgents**
3. Netlify detectará `netlify.toml` automáticamente

### 2. Verificar configuración de build

Debe quedar así (no la cambies si `netlify.toml` está en la raíz):

| Campo | Valor |
|-------|--------|
| Branch to deploy | `main` (o tu rama principal) |
| Build command | `pnpm run build` |
| Publish directory | `dist` |
| Node version | `20` (desde `.nvmrc` / `netlify.toml`) |

### 3. Variables de entorno (importante)

En **Site configuration** → **Environment variables** → **Production**:

| Variable | Valor | Notas |
|----------|--------|--------|
| `VITE_API_URL` | *(vacío, sin espacios)* | **O no la crees** — `netlify.toml` ya fuerza `""` |

No pongas `http://investigation2prograiv.runasp.net` en Netlify si usas el proxy (es el caso por defecto de este proyecto).

### 4. Deploy

1. **Deploy site**
2. Espera a que el build termine en verde
3. Abre la URL que te da Netlify (ej. `https://algo-random.netlify.app`)

### 5. Probar

1. Abre la URL de Netlify
2. **Iniciar sesión** → `admin` / `1234`
3. Entra a **Libros por biblioteca**
4. En DevTools → Network, las peticiones deben ir a:
   - `https://TU-SITIO.netlify.app/login`
   - `https://TU-SITIO.netlify.app/api/libraries`
   (no directamente a `runasp.net` en el navegador)

## Si cambias la URL del backend

Edita en **dos archivos**:

1. `netlify.toml` — URLs en `[[redirects]]`
2. `public/_redirects` — mismas URLs

Luego haz commit y push; Netlify redesplegará solo.

## Despliegue por CLI (opcional)

```bash
npm install -g netlify-cli
cd c:\ProgramacionIV\LAabAgents
pnpm install
pnpm run build
netlify login
netlify init
netlify deploy --prod
```

## Errores frecuentes

### Build falla: `pnpm: command not found`

- En Netlify: **Build settings** → asegúrate de tener `pnpm-lock.yaml` en el repo (Netlify usa pnpm automáticamente).
- O en **Environment variables**: `NPM_FLAGS` no es necesario; usa Node 20.

### Página en blanco después del deploy

- Revisa que **Publish directory** sea `dist`, no `build` ni la raíz del repo.

### Login / API fallan en producción

- Confirma que `VITE_API_URL` esté **vacía** en Netlify.
- Prueba el backend:  
  `POST http://investigation2prograiv.runasp.net/login` con `{"email":"admin","password":"1234"}`

### Al recargar `/books` sale 404

- Falta la regla SPA; verifica que existan `netlify.toml` y `public/_redirects` en el repo.

### Quieres llamar al API directo (sin proxy)

No recomendado con Netlify HTTPS + API HTTP. Si lo intentas:

1. `VITE_API_URL=http://investigation2prograiv.runasp.net`
2. Agrega tu URL de Netlify en el backend `appsettings.json` → `Cors:AllowedOrigins`
3. Redespliega el backend
4. El navegador puede seguir bloqueando mixed content

## Checklist antes de entregar

- [ ] Build en Netlify en verde
- [ ] Login con `admin` / `1234` funciona
- [ ] Se listan bibliotecas y libros
- [ ] URL del sitio Netlify documentada en el README o informe
