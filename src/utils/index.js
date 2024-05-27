export const capitalizeText = (text) => {
    const parsedText = text.split("_").join(" ")
    const capitalizedFirstLetter = parsedText[0].toUpperCase()
    return `${capitalizedFirstLetter}${parsedText.slice(1)}`
  }