# Gestión de Bibliotecas (Frontend)

Frontend React + Vite para la Investigación 2 (JWT).

## Repositorios y despliegue

| Recurso | URL |
|---------|-----|
| Repositorio frontend | https://github.com/SamCocho127/LAabAgents.git |
| Repositorio backend | https://github.com/SamCocho127/LibrariesApiTestInvestigacion.git |
| API desplegada | http://investigation2prograiv.runasp.net/ |

## Credenciales demo

- Usuario: `admin`
- Contraseña: `1234`

## Desarrollo local

```bash
pnpm install
pnpm dev
```

Asegúrate de tener el backend en `http://127.0.0.1:5219` (ver `.env.development`).

## Producción local

```bash
pnpm build
pnpm preview
```

## Despliegue en Netlify

Guía paso a paso: **[DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)**

Resumen: conecta el repo en Netlify; `netlify.toml` define build, proxy al API y rutas SPA.  
No configures `VITE_API_URL` en Netlify (déjala vacía).

## Stack de autenticación

- Axios (`src/api/axiosClient.ts`, `src/services/authService.ts`)
- React Query (`useLogin`, `QueryClientProvider` en `main.tsx`)
- jwt-decode (`src/utils/decodeToken.ts`)
- AuthContext (`src/context/AuthContext.tsx`)
