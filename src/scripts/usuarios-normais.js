import {Api} from "./components/api.js"
import {Header} from "./components/header.js"
import {Aside} from "./components/aside.js"
import {Modal} from "./components/modal.js"
import {Render} from "./components/render.js"

class usuariosNormais {
    static async renderUsers() {

        const users = await Api.getNoDeparmentWorkers()

        const article = document.querySelector('article > main > section')

        for (let index = 0; index < users.length; index++) {

            const divCard = Render.renderUsers(users[index])

            article.append(divCard)

        }

        Modal.eventModalButton()
    }
}

Header.logout()
Aside.renderizarAside()

usuariosNormais.renderUsers()