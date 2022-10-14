import {Api} from "./components/api.js"
import {Header} from "./components/header.js"
import {Aside} from "./components/aside.js"
import {Render} from "./components/render.js"
import {Modal} from "./components/modal.js"

class editarEmpresa {

    static getParams(params){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        return urlParams.get(params)
    }

    static getCompanie() {
        const companie = editarEmpresa.getParams('companie')
        const nome = editarEmpresa.getParams('nome')
        const descricao = editarEmpresa.getParams('descricao')

        if(!companie){
            window.location.assign('dashboard.html')
        } else{
            editarEmpresa.renderTop(companie, nome, descricao)
            editarEmpresa.renderDepartments(companie)
        }
    }

    static async renderDepartments(companieID) {
        const departments = await Api.getAllCompanieDepartments(companieID)

        const ulDepartamentos = document.querySelector('#ulDepartamentos')
        ulDepartamentos.innerHTML = ""

        const button = Render.renderOpenModalButton('Criar Departamento', 'create', 'dep', companieID)
        button.classList.add('btn-primary', 'mb-4', 'mt-3')
        ulDepartamentos.append(button)

        if(departments.length > 0) {
            for (let index = departments.length -1 ; index >= 0; index--) {
                ulDepartamentos.append(await Render.renderDepartment(departments[index]))                
            }
        } else {
            const p = document.createElement('p')
            p.innerHTML = 'Nenhum departamento adicionado ainda'

            p.classList.add('text-center', 'pt-4')
            ulDepartamentos.append(p)
        }

        Modal.eventModalButton()
    }

    static renderTop(companieID, nome, descricao) {
        const sectionEmpresa = document.getElementById('sectionEmpresa')
        sectionEmpresa.innerHTML = ""

        const h2 = document.createElement('h2')
        const p = document.createElement('p')

        h2.innerText = nome.replace('%20', ' ')
        p.innerText = descricao.replace('%20', ' ')

        sectionEmpresa.append(h2, p)

        Modal.eventModalButton()
    }

    static filtrarNome(event){
    
        let inputClicado  = event.target
        let tituloDigitado = inputClicado.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let ulDepartamentos = document.querySelector('#ulDepartamentos')
        let empresa = ulDepartamentos.getElementsByTagName("li");
        let nomeEmpresa, nomeEmpresaTratado;

        for (let i = 0; i < empresa.length; i++) {
            nomeEmpresa =  empresa[i].getElementsByTagName("h3")[0];
            nomeEmpresaTratado = nomeEmpresa.textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    
            if (nomeEmpresaTratado.includes(tituloDigitado)) {
                empresa[i].style.display = "";
            } else {
                empresa[i].style.display = "none";
            }
        }
    
    }

    static async construirFiltro() {
        let inputSearch = document.querySelector("#inputSearch")
        inputSearch.addEventListener("keyup", this.filtrarNome)
    }
}

Header.logout()
Aside.renderizarAside()

editarEmpresa.getCompanie()
editarEmpresa.construirFiltro()
