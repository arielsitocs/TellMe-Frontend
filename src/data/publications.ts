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
        firstName: "Juan",
        lastName: "Díaz",
        text: "Estoy probando el sistema de publicaciones con una segunda entrada para validar el diseño de la tarjeta.",
        image: ImagePlaceholder,
        likes: 18,
        comments: []
    },
    {
        userImage: null,
        firstName: "Juan",
        lastName: "Díaz",
        text: "Hoy dejé más pulido el perfil y ajusté algunos detalles de espaciado para que todo respire mejor.",
        image: null,
        likes: 31,
        comments: []
    },
    {
        userImage: null,
        firstName: "Juan",
        lastName: "Díaz",
        text: "Agregué un par de mejoras al layout principal y ya se siente mucho más consistente en desktop.",
        image: ImagePlaceholder,
        likes: 27,
        comments: []
    },
    {
        userImage: null,
        firstName: "Juan",
        lastName: "Díaz",
        text: "Revisé colores, tipografía y jerarquía visual para que la interfaz se vea más clara y directa.",
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
