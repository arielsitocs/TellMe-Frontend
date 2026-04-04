function getInitials(firstName: string, lastName: string) {
    const initials = firstName[0] + lastName[0];
    return initials
}

const formatName = (firstName: string, lastName: string) => {
    const resultName = `@${firstName.toLowerCase()}${lastName.toLocaleLowerCase()}`
    return resultName;
}

const SOFT_USER_COLORS = [
    "#1F7A68",
    "#A3572F",
    "#4A56A6",
    "#2E7D5B",
    "#7B3E8B",
    "#2B6C8F",
    "#8A5A2E",
    "#3F5E9A",
    "#1E6B74",
    "#6A4FA3",
    "#7C4A5F",
    "#3E7A44",
]

const getSoftUserColor = (firstName: string, lastName: string) => {
    const seed = `${firstName}${lastName}`.toLowerCase()
    const hash = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    return SOFT_USER_COLORS[hash % SOFT_USER_COLORS.length]
}

export { getInitials, formatName, getSoftUserColor };
