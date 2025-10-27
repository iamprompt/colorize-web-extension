let colorizeStylesheets = document.getElementById("colorize-stylesheets")

function addColorizeStylesheet() {
  if (!colorizeStylesheets) {
    colorizeStylesheets = document.createElement("style")
    colorizeStylesheets.id = "colorize-stylesheets"
    document.head.appendChild(colorizeStylesheets)
  }
  colorizeStylesheets.setAttribute("type", "text/css")
}

addColorizeStylesheet()
