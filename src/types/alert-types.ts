interface AlertTypes {
    title: string
    action: () => void
    alertdescription: string
    toastmessage: string
    state: boolean
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

export default AlertTypes;