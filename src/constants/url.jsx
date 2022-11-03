
export const serverStatus = "Dev"

export const serverLink =
  serverStatus === "Dev"
    ? "http://localhost:3005/"
    : "https://zkt-server.herokuapp.com/"
