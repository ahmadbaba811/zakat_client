
export const serverStatus = "Live"

export const serverLink =
  serverStatus === "Dev"
    ? "http://localhost:3005/"
    : "https://zakat-server.onrender.com/"
