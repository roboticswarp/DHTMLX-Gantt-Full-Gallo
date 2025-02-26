# Marketplace y Administración de Tarjetas

## Descripción del Proyecto

Esta solución implementa un sistema de Marketplace para **Bank Inc** y un módulo de administración de tarjetas. Proporciona funcionalidades para gestionar tarjetas de crédito y débito, realizar compras en un marketplace, y administrar transacciones.

El backend está desarrollado con **Spring Boot (Java 17)**, mientras que el frontend utiliza **Angular (17)**. La aplicación está desplegada en **AWS** con una arquitectura robusta que incluye servicios como **EC2**, **Nginx**, **S3**, **Route53**, **ACM**, **CloudFront**, y **RDS**.  

## Características Principales

### Backend
- **Módulo de Administración de Tarjetas**:
  - Creación de tarjetas con validaciones específicas.
  - Recarga de saldo.
- **Módulo de Transacciones**:
  - Registro de transacciones con diferentes estados.
  - Servicio de anulación de transacciones dentro de las 24 horas posteriores.
- **APIs REST** con https de los requerimientos de la prueba técnica.

### Frontend
- **Marketplace**:
  - Buscador y carrusel de productos.
  - Menú flotante para agregar al carrito.
  - Carrito persistente con opción de pago.
  -Listar y requerimientos de la prueba técnica.
- **Integración de APIs**:
  - Datos de productos obtenidos de y filtrado de **FakeAPI**.
- Diseño responsivo y maquetación personalizada.

## Despliegue en AWS

### Infraestructura Utilizada
- **Backend**:
  - EC2 con Nginx como proxy.
  - RDS para la base de datos MySQL.
  - Certificados de seguridad **Let's Encrypt**.
- **Frontend**:
  - Almacenamiento en S3 con distribución mediante **CloudFront**.
  - Certificados de seguridad proporcionados por **ACM**.
- **Gestión de dominio**: Route 53.

## Instalación y Configuración

### Requisitos Previos
- **Java 17** y **Maven** instalados.
- Node.js y Angular CLI.
- Cuenta en AWS para el despliegue con capa gratuita.

### Pasos para Ejecutar Localmente

#### Backend
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/roboticswarp/marketplace-project-mauricio.git
   cd banktest
   ```
2. Configurar las variables de entorno en el archivo `application.properties`.
3. Construir y ejecutar:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

#### Frontend
1. Navegar al directorio del frontend:
   ```bash
   cd bankfront
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar el servidor de desarrollo:
   ```bash
   ng serve
   ```

### Despliegue en AWS
1. Seguir las configuraciones de **EC2** y **RDS** para el backend.
2. Subir el frontend al bucket de **S3**.
3. Configurar **CloudFront** y asignar el certificado **ACM**.


## Buenas Prácticas Aplicadas
- Arquitectura basada en **Modelo Vista Controlador**.
- Validaciones para datos de entrada.
- Manejo centralizado de excepciones.
- Pruebas unitarias autogeneradas de angular.

## Consideraciones Finales
Este proyecto no utiliza frameworks externos para la maquetación en el frontend, destacando el uso de HTML y CSS puros. La comunicación entre componentes padre e hijo en Angular sigue un enfoque bidireccional.

