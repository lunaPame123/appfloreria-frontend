# *APLICACIÓN PARA VENTA DE ARREGLOS FLORALES*

El proyecto consiste en desarrollar una **aplicación web para la venta de arreglos florales**, que permitirá a los usuarios explorar un catálogo de ramos prediseñados según el tipo de evento, como cumpleaños, bodas o aniversarios, así como crear ramos personalizados seleccionando flores, colores y accesorios. La plataforma ofrecerá una interfaz intuitiva y responsiva, permitirá gestionar pedidos de manera segura y proporcionará información detallada sobre cada arreglo. Además, contará con funcionalidades que faciliten la administración de productos y pedidos, garantizando eficiencia y escalabilidad para futuras mejoras del sistema.

## *1. Arquitectura del Proyecto*

La aplicación se desarrollará bajo una **arquitectura multicapa**, separando claramente la presentación, la lógica de negocio y la gestión de datos. El **frontend**, construido en **React**, será responsable de la interacción con los usuarios y consumirá información a través de una **API RESTful**.

## *2. Librerías Utilizadas*

En el **frontend**, se utilizarán **React** como biblioteca principal, **Fetch** para las peticiones HTTP hacia la API.

## *3. Tecnologías Utilizadas*

El desarrollo del proyecto se basa en  **TypeScript** para el frontend. La interfaz de usuario se implementará con **React**, complementada con **HTML5** y **CSS** para la estructura y el diseño de las páginas.

## *4. Requerimientos del Proyecto*
### *4.1. Requerimientos Funcionales*

La aplicación deberá permitir que los usuarios se registren y gestionen sus cuentas de manera segura, incluyendo el inicio de sesión y la recuperación de contraseña en caso de ser necesario. Una vez autenticados, los clientes podrán consultar el catálogo de arreglos florales, visualizando información detallada de cada producto, como su descripción, precio, categoría y una imagen representativa. Además, la plataforma permitirá la creación de ramos personalizados, donde los usuarios podrán seleccionar flores, colores y accesorios, y la aplicación calculará automáticamente el precio del ramo según los elementos elegidos.
La aplicación contará con funcionalidades adicionales que mejorarán la experiencia del usuario, tales como la posibilidad de marcar arreglos favoritos, generar tarjetas digitales personalizadas para acompañar los pedidos y activar el modo regalo sorpresa, que permite programar envíos con mensajes ocultos para los destinatarios. Adicionalmente, la plataforma proporcionará información sobre el significado de cada flor, con el fin de orientar a los usuarios en la selección de los arreglos y garantizar una experiencia de compra más personalizada y significativa.
Desde el punto de vista administrativo, la aplicación permitirá gestionar el catálogo de productos, incluyendo la adición, edición y eliminación de arreglos y flores, así como la supervisión de pedidos y el seguimiento de su estado, garantizando que la gestión interna sea eficiente y organizada. Todos los pedidos, preferencias y personalizaciones estarán respaldados por una base de datos estructurada que asegura la integridad y consistencia de la información.

### *4.2. Requerimientos No Funcionales*
En cuanto a los aspectos no funcionales, la aplicación debe contar con una interfaz de usuario intuitiva, amigable y responsiva, que se adapte a diferentes dispositivos, incluyendo computadoras, tablets y teléfonos móviles. La seguridad es un aspecto fundamental, por lo que la plataforma garantizará el manejo seguro de contraseñas, la protección de los datos personales de los usuarios y el control de acceso según el rol asignado (usuario o administrador).
Asimismo, la aplicación debe ofrecer un rendimiento ágil, con tiempos de carga reducidos para imágenes y contenidos, y disponibilidad continua para los usuarios. La escalabilidad del sistema permitirá la incorporación de nuevas categorías de arreglos, flores o funcionalidades futuras sin necesidad de realizar cambios significativos en la base de datos o en la estructura de la aplicación.

## *5. Base de Datos*
### *5.1. Diagrama Entidad Relación*
<img width="1920" height="1080" alt="Usuarios (1)" src="https://github.com/user-attachments/assets/69fc1f12-bc56-417a-b7fa-cfe64347c608" />

### *5.2. Digrama Relacional*
<img width="843" height="611" alt="ModeloRelacional" src="https://github.com/user-attachments/assets/6bada5de-ad29-4ed4-928f-e1bdbdb35128" />
