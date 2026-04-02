import type PublishmentTypes from "@/src/types/publishment-types"

import ImagePlaceholder from "@/public/image-icon.svg"

const publications: PublishmentTypes[] = [
    {
        userImage: null,
        firstName: "Juan",
        lastName: "Díaz",
        text: "Acabo de terminar una nueva sección del proyecto. Quedó más limpia y responsive de lo que esperaba.",
        image: null,
        likes: 24,
        comments: []
    },
    {
        userImage: null,
        firstName: "Camila",
        lastName: "Rojas",
        text: "Probé la vista mobile del feed y quedó bastante fluida, incluso en pantallas pequeñas.",
        image: ImagePlaceholder,
        likes: 18,
        comments: []
    },
    {
        userImage: null,
        firstName: "Andrés",
        lastName: "Vega",
        text: "Hoy ajusté el perfil y mejoré los espacios entre secciones para que la lectura sea más clara.",
        image: null,
        likes: 31,
        comments: []
    },
    {
        userImage: null,
        firstName: "Laura",
        lastName: "Mendoza",
        text: "Implementé mejoras en el layout principal y ahora la interfaz se siente más consistente en desktop.",
        image: ImagePlaceholder,
        likes: 27,
        comments: []
    },
    {
        userImage: null,
        firstName: "Diego",
        lastName: "Paredes",
        text: "Revisé colores y tipografía para reforzar la jerarquía visual y mejorar la claridad del contenido.",
        image: null,
        likes: 35,
        comments: []
    },
    {
        userImage: null,
        firstName: "María",
        lastName: "López",
        text: "Hice una prueba rápida del layout general para asegurar que la experiencia siga siendo consistente.",
        image: ImagePlaceholder,
        likes: 11,
        comments: []
    },
]

export default publications
