import type PublishmentTypes from "@/src/types/publishment-types"

import ImagePlaceholder from "@/public/image-icon.svg"

const publications: PublishmentTypes[] = [
    {
        publicationid: 1,
        userid: 2,
        firstname: "Juan",
        lastname: "Díaz",
        content: "Acabo de terminar una nueva sección del proyecto. Quedó más limpia y responsive de lo que esperaba.",
        imageurl: null,
        likes: 24,
        comments: []
    },
    {
        publicationid: 2,
        userid: 3,
        firstname: "Camila",
        lastname: "Rojas",
        content: "Probé la vista mobile del feed y quedó bastante fluida, incluso en pantallas pequeñas.",
        imageurl: ImagePlaceholder,
        likes: 18,
        comments: []
    },
    {
        publicationid: 3,
        userid: 4,
        firstname: "Andrés",
        lastname: "Vega",
        content: "Hoy ajusté el perfil y mejoré los espacios entre secciones para que la lectura sea más clara.",
        imageurl: null,
        likes: 31,
        comments: []
    },
    {
        publicationid: 4,
        userid: 5,
        firstname: "Laura",
        lastname: "Mendoza",
        content: "Implementé mejoras en el layout principal y ahora la interfaz se siente más consistente en desktop.",
        imageurl: ImagePlaceholder,
        likes: 27,
        comments: []
    },
    {
        publicationid: 5,
        userid: 6,
        firstname: "Diego",
        lastname: "Paredes",
        content: "Revisé colores y tipografía para reforzar la jerarquía visual y mejorar la claridad del contenido.",
        imageurl: null,
        likes: 35,
        comments: []
    },
    {
        publicationid: 6,
        userid: 1,
        firstname: "María",
        lastname: "López",
        content: "Hice una prueba rápida del layout general para asegurar que la experiencia siga siendo consistente.",
        imageurl: ImagePlaceholder,
        likes: 11,
        comments: []
    },
]

export default publications
