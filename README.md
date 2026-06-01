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

## Producción

```bash
pnpm build
pnpm preview
```

La URL del API en producción está en `.env.production`.

## Stack de autenticación

- Axios (`src/api/axiosClient.ts`, `src/services/authService.ts`)
- React Query (`useLogin`, `QueryClientProvider` en `main.tsx`)
- jwt-decode (`src/utils/decodeToken.ts`)
- AuthContext (`src/context/AuthContext.tsx`)
