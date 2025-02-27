# Despliegue del Proyecto

## 1. Despliegue de Strapi en Railway

1. Regístrate en [Railway](https://railway.app)
2. Conecta tu cuenta de GitHub
3. Importa tu repositorio de Strapi
4. Configura variables de entorno:
   - `DATABASE_URL`: URL de PostgreSQL
   - `JWT_SECRET`: Clave secreta para JWT
   - `ADMIN_JWT_SECRET`: Clave para panel admin
   - `NODE_ENV`: production

## 2. Despliegue de Frontend en Vercel

1. Regístrate en [Vercel](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Importa tu repositorio de React
4. Configura variables de entorno:
   - `VITE_API_URL`: URL del backend desplegado en Railway

## 3. Configuración de dominio personalizado (opcional)

1. En Vercel, ve a Configuración del proyecto > Dominios
2. Agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones

## 4. Conexión CI/CD con GitHub Actions

Los archivos de configuración ya están listos para:
- Pruebas automáticas en cada push
- Despliegue automático en merge a main
- Verificación de linting y errores
