interface InputTypes {
    type: string
    title: string
    value: string
    setValue: (value: any) => void
    placeholder: string
    required?: boolean
}

export default InputTypes;