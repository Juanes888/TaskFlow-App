TaskFlow-App
Una aplicación móvil para gestionar tareas diarias, mejorar la concentración y seguir tu progreso, construida con React Native y Expo.

Tabla de Contenidos
Manual de Usuario
Características Principales
Capturas de Pantalla
Manual Técnico
Tecnologías Utilizadas
Estructura del Proyecto
Guía de Instalación
Generación de Documentación


Manual de Usuario
Esta sección está dedicada a cualquier persona que quiera usar la aplicación.

Características Principales
Gestión de Tareas: Crea, visualiza, marca como completadas y elimina tareas fácilmente.
Autenticación de Usuarios: Sistema seguro de registro e inicio de sesión con Firebase.
Perfil Personalizable: Cada usuario puede editar su nombre y añadir una foto de perfil, que se almacena en Cloudinary.
Modo Concentración: Un temporizador para ayudarte a enfocarte en una tarea específica sin distracciones.
Estadísticas y Logros: Visualiza tu progreso con gráficos y desbloquea logros a medida que completas tareas.
Interfaz Intuitiva: Diseño limpio y fácil de usar para una experiencia de usuario fluida.

Capturas de Pantalla



<img width="394" height="834" alt="image" src="https://github.com/user-attachments/assets/bcb1fa37-1cbc-4597-aa7b-c700afb2f096" />
<img width="448" height="820" alt="image" src="https://github.com/user-attachments/assets/eb6b0a1e-5b31-4a36-804a-870e8cf1bd10" />



<img width="375" height="774" alt="image" src="https://github.com/user-attachments/assets/b867fdc4-a4f4-49b2-be99-0421a88730cf" />
<img width="524" height="833" alt="image" src="https://github.com/user-attachments/assets/af36fb88-611b-4ceb-9319-c65c1aae1c12" />


<img width="377" height="818" alt="image" src="https://github.com/user-attachments/assets/4fb32ec4-3f44-4439-adb7-35bae86a3667" />
<img width="431" height="840" alt="image" src="https://github.com/user-attachments/assets/5b621007-2b1c-4954-8337-fc91ca34bac6" />
<img width="386" height="828" alt="image" src="https://github.com/user-attachments/assets/43680477-0fa3-4ad2-8297-e137601f78db" />



Manual Técnico
Esta sección está dirigida a desarrolladores que deseen entender, instalar o contribuir al proyecto.

Tecnologías Utilizadas
Framework: React Native (con Expo)
Lenguaje: JavaScript (ES6+)
Navegación: React Navigation (Stack y Tab)
Base de Datos Local: SQLite (expo-sqlite)
Autenticación: Firebase Authentication
Base de Datos en la Nube: Firestore
Almacenamiento de Imágenes: Cloudinary
Documentación: JSDoc


TaskFlow-App/
├── src/
│   ├── components/      # Componentes reutilizables (botones, modales)
│   ├── constants/       # Constantes de la app (colores, etc.)
│   ├── navigation/      # Configuraciones de React Navigation
│   ├── screens/         # Pantallas principales de la aplicación
│   ├── services/        # Lógica de negocio y conexión a APIs/DB
│   └── styles/          # Hojas de estilo para las pantallas
├── App.js               # Componente raíz y configuración de navegación
└── package.json         # Dependencias y scripts del proyecto



🚀 Guía de Instalación y Puesta en Marcha
Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno de desarrollo.

✅ Prerrequisitos
Node.js (versión 18 o superior).
npm o yarn.
La aplicación Expo Go instalada en tu teléfono (iOS o Android).
🔧 Configuración de Servicios Externos
Para que la aplicación funcione completamente, necesitas tus propias claves de API para Firebase y Cloudinary.

Firebase:

Ve a la consola de Firebase y crea un nuevo proyecto.
Habilita Authentication (con el proveedor de Email/Contraseña) y Firestore.
En la configuración de tu proyecto, crea una nueva aplicación web.
Copia las credenciales de configuración (apiKey, authDomain, etc.).
Pega estas credenciales en el archivo src/services/firebaseConfig.js.
Cloudinary:

Crea una cuenta en Cloudinary.
En tu dashboard, encontrarás tu Cloud Name, API Key y API Secret.
Necesitarás el Cloud Name y un "upload preset" sin firmar.
Ve a Settings > Upload y crea un nuevo "upload preset" con el modo de firma "Unsigned".
Copia tu Cloud Name y el nombre de tu "upload preset" en el archivo src/services/cloudinaryService.js

💻 Instalación Local
Clona el repositorio:

git clone https://github.com/tu-usuario/TaskFlow-App.git

Navega a la carpeta del proyecto:
cd TaskFlow-App

Instala las dependencias:
npm install

Inicia el servidor de desarrollo:
npx expo start

Ejecuta la aplicación:

Se abrirá una pestaña en tu navegador con un código QR.
Abre la aplicación Expo Go en tu teléfono y escanea el código QR. La aplicación se cargará automáticamente.

📄 Generación de Documentación
El código fuente está documentado siguiendo el estándar JSDoc. Para generar un sitio web con la documentación completa, ejecuta:
npm run docs





