interface PublicationMenuTypes {
    state: boolean
    setState: (state: boolean) => void
    deletePublication: () => void
    editPublicationState: boolean
    setEditPublicationState: (state: boolean) => void
}