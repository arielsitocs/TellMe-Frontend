interface InputTypes {
    type: string
    title: string
    value: string
    setValue?: (value: string) => void
    placeholder: string
    required?: boolean
}

export default InputTypes;