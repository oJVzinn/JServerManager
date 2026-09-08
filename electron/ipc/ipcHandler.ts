import folder from "./folder/folderIPCHandler.js"
import server from "./server/severIPCHandler.js"

export default function init() {
    folder()
    server()
}
