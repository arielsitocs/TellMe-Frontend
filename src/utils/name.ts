function getInitials(firstname: string, lastname: string) {
    const initials = firstname?.[0] + lastname?.[0];
    return initials
}

const formatName = (firstname: string = "", lastname: string = "") => {
  return `@${firstname.toLowerCase()}${lastname.toLowerCase()}`;
}

export { getInitials, formatName };
