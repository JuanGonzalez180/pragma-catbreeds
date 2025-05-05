# Catbreeds App

## Descripción
Aplicación móvil desarrollada con Ionic/Angular que permite explorar y conocer diferentes razas de gatos, utilizando la API pública TheCatAPI.

## Características Principales
- Búsqueda de razas de gatos
- Vista detallada de cada raza
- Visualización de imágenes en modo expandido
- Características detalladas de cada raza incluyendo:
  - Adaptabilidad
  - Inteligencia
  - País de origen
  - Temperamento
  - Tiempo de vida

## Arquitectura

### Atomic Design
El proyecto sigue los principios de Atomic Design, organizando los componentes en:

#### Átomos
- `AtomLoadingComponent`: Componente de carga con spinner
- `AtomExpandButtonComponent`: Botón para expandir imágenes

#### Moléculas
- `MoleculeCardCatComponent`: Tarjeta de información de raza
- `MoleculeBreedCharacteristicsComponent`: Características de la raza
- `MoleculeHeaderSearchComponent`: Barra de búsqueda
- `MoleculeImageModalComponent`: Modal para visualización de imágenes

### Servicios
- `CatService`: Manejo de peticiones a TheCatAPI
- `CatStateService`: Gestión del estado de la aplicación usando signals

### Utilidades
- `ErrorUtil`: Manejo centralizado de errores
- `HeaderUtil`: Configuración de headers HTTP

## Tecnologías
- Angular 19
- Ionic 8
- RxJS
- TheCatAPI

## Características Técnicas
- Componentes Standalone
- Signals para manejo de estado
- Manejo de errores centralizado
- Interfaces tipadas
- Diseño responsive
- Lazy loading de módulos
- Gestión de estado con servicios
- Metodología BEM (Block Element Modifier)
  - Estructura clara y consistente en los estilos
  - Nomenclatura específica para bloques, elementos y modificadores
  - Mejor mantenibilidad y escalabilidad del código CSS
  - Implementado en:
    - Átomos: AtomExpandButton, AtomLoading
    - Moléculas: MoleculeCardCat, MoleculeHeaderSearch, MoleculeImageModal, MoleculeBreedCharacteristics
    - Páginas: Landing, Detail, Splash

## Funcionalidades Principales

### Landing Page
- Listado de razas de gatos
- Búsqueda en tiempo real
- Vista en grid con opción de expandir/contraer tarjetas
- Navegación a detalles

### Detail Page
- Información detallada de la raza
- Imagen expandible
- Características mostradas con indicadores visuales
- Sistema de puntuación con estrellas y bombillas

## Características de UX/UI
- Feedback visual durante cargas
- Manejo de errores con mensajes amigables
- Diseño responsive para diferentes tamaños de pantalla
- Animaciones en transiciones

## Instalación y Ejecución

### Prerrequisitos
- Node.js (v18 o superior)
- npm (v9 o superior)
- Ionic CLI

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/JuanGonzalez180/pragma-catbreeds.git
cd pragma-catbreeds
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar la aplicación:
```bash
ionic serve 
```

La aplicación estará disponible en `http://localhost:8100`.

Scripts Disponibles
- `npm start`: Ejecuta la aplicación en modo desarrollo.
- `npm run build`: Compila la aplicación para producción.

Notas Adicionales
- La aplicación utiliza la API pública TheCatAPI para obtener información de razas de gatos.
- Asegúrate de tener una conexión a internet para cargar las imágenes de las razas.
- La aplicación está optimizada para funcionar en dispositivos móviles, pero también puede ser visualizada en navegadores web.

Extructura del Proyecto
```
pragma-catbreeds/
src/
├── app/
│   ├── models/
│   │   ├── cats/
│   │   └── errors/
│   ├── pages/
│   │   ├── landing/
│   │   ├── detail/
│   │   └── splash/
│   ├── shared/
│   │   ├── atoms/
│   │   └── molecules/
│   └── utils/
├── assets/
├── environments/
└── theme/