import {Api} from "./components/api.js"
import {Header} from "./components/header.js"
import {Aside} from "./components/aside.js"

class Setor {
    static async renderSectors() {
        const sectors = await Api.getAllSectors()

        const article = document.querySelector('article > main')

        for (let index = 0; index < sectors.length; index++) {
            const divCard = document.createElement('div')
            const divCardBody = document.createElement('div')

            const nomeSector = document.createElement('h5')
            const empresasCount = document.createElement('small')

            divCard.classList.add('card', 'mb-3', 'border-secondary')
            divCardBody.classList.add('card-body')

            nomeSector.classList.add('card-title')
            empresasCount.classList.add('text-muted')

            nomeSector.innerHTML = sectors[index].description

            const empresas = await Api.getCompanieBySector(sectors[index].description)
            empresasCount.innerHTML = `${empresas.length} empresas neste setor`

            divCardBody.append(nomeSector, empresasCount)
            divCard.append(divCardBody)
            
            article.append(divCard)
        }
    }
}

Header.logout()
Aside.renderizarAside()

Setor.renderSectors()