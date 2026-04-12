function getInitials(firstname: string, lastname: string) {
    const initials = firstname?.[0] + lastname?.[0];
    return initials
}

const formatName = (firstname: string, lastname: string) => {
    const resultName = `@${firstname.toLowerCase()}${lastname.toLocaleLowerCase()}`
    return resultName;
}

export { getInitials, formatName };
