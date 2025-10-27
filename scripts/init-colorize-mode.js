function addColorizeStylesheet(colorizeMode) {
  const colorizeStylesheet = document.getElementById("colorize-stylesheets")
  if (!colorizeStylesheet) {
    const styleElement = document.createElement("style")
    styleElement.id = "colorize-stylesheets"
    styleElement.setAttribute("type", "text/css")
    document.body.appendChild(styleElement)
  }

  switch (colorizeMode) {
    case "GRAYSCALE": {
      colorizeStylesheet.innerHTML =
        "html, html *, * { filter: grayscale(100%) !important; }"
      break
    }
    case "ORIGINAL": {
      colorizeStylesheet.innerHTML = ""
      break
    }
    case "COLORIZE":
    default: {
      colorizeStylesheet.innerHTML =
        "html, html *, * { filter: initial !important; }"
      break
    }
  }
}

function addColorizePreferenceListener(callback) {
  chrome.storage.local.get("colorizeMode", (payload) => {
    const colorizeMode = payload.colorizeMode
    addColorizeStylesheet(colorizeMode)
    callback(colorizeMode)
  })

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.colorizeMode) {
      const colorizeMode = changes.colorizeMode.newValue
      callback(colorizeMode)
    }
  })
}

addColorizePreferenceListener(addColorizeStylesheet)
