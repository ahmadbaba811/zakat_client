
export const serverStatus = "Dev"

export const serverLink =
  serverStatus === "Dev"
    ? "http://localhost:3005/"
    : "https://zakat-app-api.herokuapp.com/"
