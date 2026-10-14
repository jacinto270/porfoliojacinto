# Portfolio de Jacinto Juarez Rodriguez

Portfolio personal estático creado con **HTML, CSS y JavaScript**, sin frameworks ni proceso de compilación. Presenta una ilustración interactiva, una sección de tarjetas con efecto de pintura, información personal y una página de proyectos que obtiene repositorios públicos desde GitHub.

## Contenido

- [Características](#características)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Páginas](#páginas)
- [Cómo funciona](#cómo-funciona)
- [Tecnologías y recursos externos](#tecnologías-y-recursos-externos)
- [Ejecución local](#ejecución-local)
- [Personalización](#personalización)
- [Publicación](#publicación)

## Características

- Diseño adaptable a diferentes tamaños de pantalla.
- Ilustración SVG compuesta por capas que sigue el movimiento del puntero.
- Alternancia entre tema claro y oscuro. La elección manual se guarda en `localStorage`; si no hay una elección guardada, se respeta la preferencia de color del sistema.
- Respeto por la preferencia del sistema de movimiento reducido para desactivar el parpadeo y reducir el seguimiento animado del retrato.
- Tarjetas de contenido cubiertas por una capa dibujada en un `canvas`. Se puede retirar con el puntero o con el botón «Descubrir con spray».
- Detalles de experiencia, perfil e ideas cargados desde un archivo de datos compartido.
- Lista de repositorios públicos consultada desde la API de GitHub, con orden y presentación personalizados.
- Etiquetas de HTML, CSS y JavaScript en las tarjetas de proyectos, además de enlaces a demos y al perfil de GitHub cuando están configurados.
- Estado de carga y mensaje de error accesibles para la lista de proyectos, con una lista de proyectos configurada localmente como alternativa cuando falla la consulta.
- Imágenes con texto alternativo y carga diferida en las tarjetas de repositorios.

## Estructura del proyecto

```text
.
├── Retrato_en_capas.html       # Página principal del portfolio
├── proyectos.html              # Listado de proyectos y repositorios
├── detalle.html                 # Página de detalle para una sección
├── README.md                    # Documentación del proyecto
├── css/
│   └── portfolio.css            # Estilos compartidos y diseño adaptable
├── js/
│   ├── portfolio.js             # Tema, retrato y efecto de pintura
│   ├── card-content.js          # Textos compartidos de las tarjetas
│   ├── card-detail.js           # Carga el detalle solicitado por URL
│   └── projects.js              # Consulta y renderizado de repositorios
└── images/
    ├── formulario-t3.jpg
    ├── mi-lista-de-canciones.jpeg
    ├── perfumes-preview.webp
    └── portfolio-jacinto-preview.png
```

## Páginas

### Página principal — `Retrato_en_capas.html`

Contiene la cabecera de navegación, el retrato ilustrado, el muro de tarjetas, la información de contacto y el pie de página. Las tarjetas del muro enlazan a la página de detalle o al listado de proyectos.

La ilustración está dibujada como varios elementos SVG independientes. Cada capa tiene parámetros de desplazamiento y profundidad en CSS; JavaScript calcula la posición objetivo según el puntero y suaviza el movimiento con `requestAnimationFrame`.

### Proyectos — `proyectos.html`

`js/projects.js` obtiene los repositorios públicos de `jacinto270` mediante la API pública de GitHub. Ordena los proyectos conocidos según la lista `projectOrder`, muestra una presentación personalizada cuando existe y utiliza los metadatos del repositorio como alternativa para el título y la descripción.

Las tarjetas incluyen una vista previa, título, descripción, etiquetas de tecnologías y, si está configurado, un enlace a la demo. La tarjeta del repositorio `jacinto270` presenta el avatar del perfil y un enlace a `https://github.com/jacinto270`.

Si GitHub no está disponible o devuelve una respuesta no válida, se informa del problema y se muestran los proyectos indicados en `projectOrder`. La tarjeta del perfil de GitHub depende de que la consulta incluya el repositorio `jacinto270`.

### Detalle — `detalle.html`

Lee el parámetro `seccion` de la URL y muestra el título y el texto asociado. Por ejemplo:

```text
detalle.html?seccion=experiencia
detalle.html?seccion=proyecto-destacado
detalle.html?seccion=perfil
```

Si el identificador no existe, muestra un mensaje de información no disponible.

## Cómo funciona

### Contenido de las tarjetas

`js/card-content.js` define los títulos, descripciones y textos largos de las secciones `experiencia`, `proyecto-destacado` y `perfil`. La página principal usa los títulos y descripciones para actualizar las tarjetas; la página de detalle reutiliza esos mismos datos.

### Efecto de pintura

Cada tarjeta del muro tiene un `canvas` que se dibuja como una pared de ladrillo. Al arrastrar sobre la tarjeta, el script borra parte de esa capa con un pincel difuminado para revelar el contenido inferior. El botón de descubrimiento retira la capa de la tarjeta. `ResizeObserver` vuelve a dibujar la pared cuando cambia el tamaño de una tarjeta que todavía no se ha revelado.

### Tema

El tema se controla desde el botón de la cabecera. La preferencia manual se guarda con la clave `portfolio-theme`. Los valores admitidos son `light` y `dark`; si no hay un valor guardado, se utiliza la preferencia del sistema operativo.

## Tecnologías y recursos externos

- **HTML5** para la estructura y semántica de las páginas.
- **CSS3** para el diseño, los temas, las animaciones y la adaptación a pantallas pequeñas.
- **JavaScript moderno** para las interacciones, el renderizado de contenido y las llamadas `fetch`.
- **SVG** para el retrato ilustrado por capas.
- **Canvas 2D** para el efecto de pintura.
- **GitHub REST API** para cargar la lista de repositorios públicos.
- **Google Fonts** para Bricolage Grotesque, Atkinson Hyperlegible y JetBrains Mono.
- **Imágenes remotas** alojadas en GitHub para algunas vistas previas y en el perfil de GitHub para el avatar.

No hay dependencias de npm, backend ni paso de compilación. La página de proyectos necesita conexión a Internet para consultar GitHub y cargar los recursos externos. Las imágenes guardadas en `images/` se sirven localmente.

## Ejecución local

Se recomienda servir la carpeta con un servidor estático local. Por ejemplo, en Visual Studio Code se puede abrir la carpeta y usar una extensión de servidor estático como Live Server. Después, abrir:

```text
Retrato_en_capas.html
```

También se puede abrir directamente el archivo HTML en un navegador, aunque algunas funciones que consultan servicios externos pueden depender de las restricciones de seguridad del navegador al utilizar direcciones `file://`.

## Personalización

### Datos personales y textos

- Edita `Retrato_en_capas.html` para cambiar la navegación, el contenido de contacto, las tarjetas y la ilustración SVG.
- Edita `js/card-content.js` para cambiar los textos de las tarjetas de experiencia, proyecto destacado y perfil. Los identificadores de las tarjetas deben coincidir con las claves del objeto de datos.

### Proyectos

En `js/projects.js`:

- `projectOrder` determina el orden de los repositorios conocidos.
- `projectPresentation` permite personalizar el título, la descripción, la imagen, la URL de la demo y el enlace de GitHub de cada repositorio.
- `portfolioTechnologies` define las etiquetas que se muestran en las tarjetas.
- `githubApi` determina la cuenta y los parámetros usados para solicitar los repositorios.

Para añadir una presentación personalizada, usa como clave el nombre exacto del repositorio de GitHub. Las rutas locales de imágenes deben ser relativas a la raíz del proyecto, por ejemplo `images/mi-imagen.jpg`.

### Estilos

`css/portfolio.css` contiene estilos compartidos por las tres páginas, variables de color para ambos temas, componentes del portfolio y reglas adaptables a pantallas pequeñas.

## Publicación

Al ser un sitio estático, se puede publicar en un servicio de alojamiento de sitios estáticos. Mantén la estructura de carpetas y publica la raíz del proyecto para que las rutas relativas de HTML, CSS, JavaScript e imágenes sigan funcionando. La página de proyectos requiere que el navegador de cada visitante pueda acceder a la API pública de GitHub.
