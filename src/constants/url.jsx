
export const serverStatus = "Dev"

export const serverLink =
  serverStatus === "Dev"
    ? "http://localhost:3005/"
    //"http://192.168.137.1:3005/"
    : "";
