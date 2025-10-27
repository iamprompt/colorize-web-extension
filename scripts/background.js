chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ colorizeMode: "COLORIZE" })
})

function updateActionIconAndBadge(colorizeMode) {
  let title = "ปิดโหมดสีสัน"
  let iconPath = "../images/colorize_on-128px.png"
  let badgeText = ""

  switch (colorizeMode) {
    case "GRAYSCALE": {
      title = "ตั้งค่าโหมดสีสันเป็นอัตโนมัติ"
      iconPath = "../images/colorize_off-128px.png"
      break
    }
    case "ORIGINAL": {
      title = "เปิดโหมดสีสัน"
      iconPath = "../images/colorize_on-128px.png"
      badgeText = "A"
      break
    }
    case "COLORIZE":
    default: {
      title = "ปิดโหมดสีสัน"
      iconPath = "../images/colorize_on-128px.png"
      break
    }
  }

  chrome.action.setTitle({ title: title })
  chrome.action.setIcon({ path: iconPath })
  chrome.action.setBadgeText({ text: badgeText || null })
}

chrome.storage.local.get("isColorizeModeEnabled", (payload) => {
  const colorizeMode = payload.colorizeMode ?? "COLORIZE"
  updateActionIconAndBadge(colorizeMode)
})

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.colorizeMode) {
    const colorizeMode = changes.colorizeMode.newValue
    updateActionIconAndBadge(colorizeMode)
  }
})

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get("colorizeMode", (payload) => {
    const colorizeMode = payload.colorizeMode
    let newState

    switch (colorizeMode) {
      case "GRAYSCALE": {
        newState = "ORIGINAL"
        break
      }
      case "ORIGINAL": {
        newState = "COLORIZE"
        break
      }
      case "COLORIZE":
      default: {
        newState = "GRAYSCALE"
        break
      }
    }

    console.log("Current colorize mode is", colorizeMode)
    console.log("Toggling colorize mode to", newState)
    chrome.storage.local.set({ colorizeMode: newState })
  })
})
