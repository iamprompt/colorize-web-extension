const grayScaleThemeClass = ["header_mourningTheme__9hShx"]

let isThemeElementInitialized = false
const grayScaleThemeElements = new Map()

function initializeThemeElements() {
  if (isThemeElementInitialized) return

  for (const className of grayScaleThemeClass) {
    const elements = document.querySelectorAll(`.${className}`)
    grayScaleThemeElements.set(className, elements)
  }
  isThemeElementInitialized = true
}

addColorizePreferenceListener((colorizeMode) => {
  initializeThemeElements()

  switch (colorizeMode) {
    case "ORIGINAL":
    case "GRAYSCALE": {
      for (const [className, elements] of grayScaleThemeElements) {
        elements.forEach((el) => el.classList.add(className))
      }
      break
    }
    case "COLORIZE":
    default: {
      for (const [className, elements] of grayScaleThemeElements) {
        elements.forEach((el) => el.classList.remove(className))
      }
      break
    }
  }
})
