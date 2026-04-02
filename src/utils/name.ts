function getInitials(firstName: string, lastName: string) {
    const initials = firstName[0] + lastName[0];
    return initials
}

const formatName = (firstName: string, lastName: string) => {
    const resultName = `@${firstName.toLowerCase()}${lastName.toLocaleLowerCase()}`
    return resultName;
}

export { getInitials, formatName };
