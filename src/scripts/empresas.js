import {Api} from "./components/api.js"
import {Header} from "./components/header.js"
import {Aside} from "./components/aside.js"
import {Modal} from "./components/modal.js"
import {Render} from "./components/render.js"

class Empresas {

    static async renderCompanies(setor = "Todas"){
        const companies = await Api.getAllCompanies()

        const article = document.querySelector('#sectionEmpresas')

        article.innerHTML = ""

        for (let index = 0; index < companies.length; index++) {
            const divCard = Render.renderCompany(companies[index])
            
            if(setor == 'Todas' || setor == companies[index].sectors.uuid){
                article.append(divCard)
            }
        }

        if(article.innerHTML == ""){
            const aviso = document.createElement('p')
            aviso.innerText = "Nenhuma empresa encontrada!"

            article.append(aviso)
        }

        Modal.eventModalButton()
    }

    static async filtrarSetor(event){
    
        let btnClicado  = event.target
        await Empresas.renderCompanies(btnClicado.value)

        document.querySelector("#inputSearch").value = "";
    
    }

    static filtrarNome(event){
    
        let inputClicado  = event.target
        let tituloDigitado = inputClicado.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let empresa = document.getElementsByClassName("empresa");
        let nomeEmpresa, nomeEmpresaTratado;

        for (let i = 0; i < empresa.length; i++) {
            nomeEmpresa =  empresa[i].getElementsByTagName("h5")[0];
            nomeEmpresaTratado = nomeEmpresa.textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    
            if (nomeEmpresaTratado.includes(tituloDigitado)) {
                empresa[i].style.display = "";
            } else {
                empresa[i].style.display = "none";
            }
        }
    
    }

    static async construirFiltro() {
        const filtros = document.querySelector('#sectionFiltros')
        const sectors = await Api.getAllSectors()
        filtros.append( Render.renderSelect(sectors, 'Todas') )

        let selectSector = document.querySelector("#selectSector")
        selectSector.addEventListener("change", this.filtrarSetor)

        let inputSearch = document.querySelector("#inputSearch")
        inputSearch.addEventListener("keyup", this.filtrarNome)
    }
}

Header.logout()
Aside.renderizarAside()
Empresas.construirFiltro()

Empresas.renderCompanies()