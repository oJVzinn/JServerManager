import folder from "./folder/folderIPCHandler.js"
import server from "./server/severIPCHandler.js"
import serverType from "./serverType/severTypeIPCHandler.js"

export default function init() {
    folder()
    server()
    serverType()
}
