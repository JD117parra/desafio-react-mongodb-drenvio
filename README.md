# Desafío React/MongoDB - Drenvío
Aplicación web para gestión de productos y precios especiales desarrollada con React, Node.js y MongoDB.
## Introducción
Este proyecto implementa un sistema completo de gestión de productos con funcionalidad de precios especiales por usuario. La aplicación permite visualizar productos de una tienda y asignar precios personalizados a usuarios específicos.
### Características principales
- **Frontend React** con TypeScript para type safety
- **Backend Node.js** con Express como API REST
- **Base de datos MongoDB** con conexión a Atlas
- **Interfaz responsiva** y profesional
- **Gestión de precios especiales** por usuario
- **Validaciones** y manejo de errores robusto
## Pasos para ejecutar localmente
### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Acceso a internet (para conexión a MongoDB Atlas)
### Instalación
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/JD117parra/desafio-react-mongodb-drenvio.git
   cd desafio-react-mongodb-drenvio
   ```
2. **Configurar el Backend**
   ```bash
   cd backend
   npm install
   ```
3. **Configurar el Frontend**
   ```bash
   cd ../frontend
   npm install
   ```
### Ejecución
**Necesitas 2 terminales abiertas:**
#### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```
El servidor backend se ejecutará en `http://localhost:5000`
#### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```
La aplicación se abrirá automáticamente en `http://localhost:3000`
### URLs importantes
- **Aplicación:** http://localhost:3000
- **API Backend:** http://localhost:5000
- **API Productos:** http://localhost:5000/api/productos
- **API Precios Especiales:** http://localhost:5000/api/precios-especiales
## Justificación de elecciones técnicas
### TypeScript
- **Elegido por:** Mayor seguridad de tipos y mejor experiencia de desarrollo
- **Beneficios:** Detección temprana de errores, mejor autocompletado, código más mantenible
- **Ideal para:** Proyectos que manejan estructuras de datos complejas como las de MongoDB
### React
- **Razón:** Framework moderno y eficiente para interfaces de usuario
- **Ventajas:** Componentes reutilizables, estado reactivo, gran ecosistema
- **Implementación:** Hooks para manejo de estado, React Router para navegación
### Node.js + Express
- **Justificación:** JavaScript unificado en frontend y backend
- **Beneficios:** Desarrollo más rápido, reutilización de conocimientos
- **Express:** Framework minimalista pero potente para APIs REST
### MongoDB
- **Selección:** Base de datos NoSQL flexible para manejar productos con esquemas variados
- **Ventajas:** Escalabilidad, flexibilidad de esquema, fácil integración con Node.js
- **MongoDB Atlas:** Solución en la nube robusta y confiable
## Descripción de la estructura del proyecto
```
desafio-react-mongodb/
├── backend/                 # Servidor Node.js
│   ├── config/
│   │   └── database.js     # Configuración de MongoDB
│   ├── routes/
│   │   ├── productos.js    # Rutas para productos
│   │   └── preciosEspeciales.js  # Rutas para precios especiales
│   ├── scripts/            # Scripts de utilidad
│   ├── .env               # Variables de entorno
│   ├── server.js          # Servidor principal
│   └── package.json       # Dependencias backend
│
├── frontend/               # Aplicación React
│   ├── public/            # Archivos públicos
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/
│   │   │   ├── Articulos.tsx    # Página de lista de productos
│   │   │   └── Subida.tsx       # Página de formulario
│   │   ├── services/
│   │   │   └── api.ts     # Configuración de Axios y APIs
│   │   ├── types/
│   │   │   └── index.ts   # Tipos TypeScript
│   │   ├── App.tsx        # Componente principal
│   │   ├── App.css        # Estilos principales
│   │   └── index.tsx      # Punto de entrada
│   └── package.json       # Dependencias frontend
│
└── README.md              # Este archivo
```
### Componentes principales
#### Backend
- **`server.js`**: Servidor Express con configuración de CORS y middlewares
- **`database.js`**: Conexión singleton a MongoDB Atlas
- **`productos.js`**: CRUD para productos existentes
- **`preciosEspeciales.js`**: CRUD para precios especiales por usuario
#### Frontend
- **`Articulos.tsx`**: Tabla de productos con precios diferenciados por usuario
- **`Subida.tsx`**: Formulario para crear nuevos precios especiales
- **`api.ts`**: Configuración centralizada de llamadas HTTP
- **`types/index.ts`**: Definiciones TypeScript para type safety
## Base de Datos
### Colecciones
1. **`productos`** (existente)
   - Productos de la tienda con precios regulares
   - Campos: name, price, category, brand, stock, etc.
2. **`preciosEspecialesParra11`** (creada)
   - Precios personalizados por usuario
   - Campos: userId, userName, productId, specialPrice, createdAt
### Lógica de precios
- Si un usuario tiene precio especial → se muestra el precio especial
- Si no tiene precio especial → se muestra el precio regular
- Los precios especiales se resaltan visualmente en la interfaz
## Funcionalidades implementadas
### Página de Artículos
- ✅ Lista todos los productos de la base de datos
- ✅ Muestra precios normales y especiales por usuario
- ✅ Resalta visualmente los productos con descuento
- ✅ Manejo de errores y estados de carga
### Página de Subida
- ✅ Formulario para crear precios especiales
- ✅ Dropdown con productos disponibles
- ✅ Validaciones de formulario
- ✅ Feedback visual de éxito/error
### API REST
- ✅ `GET /api/productos` - Obtener todos los productos
- ✅ `GET /api/precios-especiales` - Obtener precios especiales
- ✅ `POST /api/precios-especiales` - Crear nuevo precio especial
- ✅ `GET /api/precios-especiales/verificar/:userId` - Verificar usuario

## Tecnologías utilizadas
### Frontend
- React 18
- TypeScript
- React Router DOM
- Axios
- CSS3 (responsive design)
### Backend
- Node.js
- Express.js
- MongoDB Driver
- CORS
- dotenv
### Base de Datos
- MongoDB Atlas
- Colección: `preciosEspecialesParra11`
## Notas del desarrollador
- Todas las validaciones están implementadas tanto en frontend como backend
- La aplicación es completamente responsive
- Se implementó un sistema de logging para debugging
- El código sigue las mejores prácticas de React y Node.js
---
**Desarrollado por:** Juan David Parra  
**Para:** Drenvío - Desafío Técnico  
**Fecha:** Junio 2025