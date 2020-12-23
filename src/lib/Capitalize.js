export const capitalize = (str) => {
    let strString = str.split("")
    strString[0] = strString[0].toUpperCase()
    return strString.join("")
}
