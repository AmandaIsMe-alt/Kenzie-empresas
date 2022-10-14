import { Api } from "./api.js"

export class Header {
    static renderizarHeader (pagina = 'login') {
        const user          = localStorage.getItem('@kenzie:User_id')
        const admin = localStorage.getItem("@kenzie:admin")

        const body = document.querySelector('body')

        const header = document.createElement('header')
        const img = document.createElement('img')

        const form_check = Header.renderSwitchTema()

        const btnToggleMobile = document.createElement('button')
        const spanToggleIcon = document.createElement('span')

        const divNavbar = document.createElement('div')
        const divBtns = document.createElement('div')
        const aLogin = document.createElement('a')
        const aCadastro = document.createElement('a')
        const aSair = document.createElement('a')

        header.classList.add('navbar', 'navbar-light', 'sticky-top', 'flex-md-nowrap', 'p-3', 'shadow', 'background-white')
        header.id = "headerMenu"
        img.classList.add('navbar-brand', 'col-md-3', 'col-lg-2', 'me-0', 'p-0', 'fs-6')

        btnToggleMobile.classList.add('navbar-toggler', 'position-absolute', 'd-md-none', 'collapsed')
        btnToggleMobile.setAttribute('data-bs-toggle', 'collapse')
        btnToggleMobile.setAttribute('data-bs-target', '#sidebarMenu')
        btnToggleMobile.setAttribute('aria-controls', 'sidebarMenu')
        btnToggleMobile.setAttribute('aria-expanded', 'false')
        spanToggleIcon.classList.add('navbar-toggler-icon')

        divNavbar.classList.add('navbar-nav')
        divBtns.classList.add('divBtnAcoes', 'd-flex', 'nav-item', 'text-nowrap', 'gap-2')
        aSair.classList.add('btn', 'btn-primary')
        aSair.id = "btnLogout"
        img.src = "../../src/assets/img/logo.webp"

        aLogin.innerText = "Login"
        aCadastro.innerText = "Cadastro"
        aSair.innerText = "Sair"
        spanToggleIcon.innerText = "Abrir menu"

        if (pagina == 'login') {
            aLogin.classList.add('btn', 'btn-primary')
            aCadastro.classList.add('btn', 'btn-light')
            aLogin.href = "#"
            aCadastro.href = "./src/pages/cadastro.html"
        } else{
            aLogin.classList.add('btn', 'btn-light')
            aCadastro.classList.add('btn', 'btn-primary')
            aLogin.href = "../../index.html"
            aCadastro.href = "#"
        }

        if(!user || user == 'undefined') {
            divBtns.append(aLogin, aCadastro)
        } else {
            divBtns.append(aSair)
        }

        divNavbar.append(divBtns)

        if(admin == 'true') {
            btnToggleMobile.append(spanToggleIcon)
            header.append(img, form_check, btnToggleMobile, divNavbar)
        } else{
            header.append(img, form_check, divNavbar)
        }

        body.insertAdjacentElement('afterbegin', header)

        Header.darkMode()
    }

    static logout() {

        const user = localStorage.getItem('@kenzie:User_id')
        const admin = localStorage.getItem("@kenzie:admin")

        if(!user || user == 'undefined') {
            window.location.assign('../../index.html')

        } else {

            if(!document.querySelector('#headerMenu')) {
                Header.renderizarHeader()
            }

            const btnLogout = document.querySelector("#btnLogout")

            btnLogout.addEventListener('click', () => {

                Api.mensagem("Volte sempre.")
                Api.clearLocalStorage()

                setTimeout(() => {
                    window.location.assign('../../index.html')
                }, 1000)
            })
        }
    }

    static renderSwitchTema() {
        const form_check = document.createElement('div')
        const input_check = document.createElement('input')
        const label_check = document.createElement('label')

        form_check.classList.add('form-check', 'form-switch', 'd-flex', 'gap-2')
        input_check.classList.add('form-check-input')
        label_check.classList.add('form-check-label')

        input_check.type = 'checkbox'
        input_check.id = 'flexSwitchCheckDefault'
        input_check.role = 'switch'

        label_check.setAttribute('for', 'flexSwitchCheckDefault')
        label_check.innerHTML = 'Dark Mode'

        const corTema = document.documentElement.getAttribute("data-color-scheme")

        if(corTema == "dark") {
            input.checked = true
        }

        form_check.append(input_check, label_check)

        return form_check

    }

    static pegarTemaPreferido() {
        const temaEscuro = "(prefers-color-scheme: dark)"
        const temaNavegador = window.matchMedia ? window.matchMedia(temaEscuro) : {}

        if (temaNavegador.media === temaEscuro && temaNavegador.matches) {
            return "dark"
        }
        
        return "default"
    }

    static darkMode() {
          
        const corTema = localStorage.getItem("color-scheme") || Header.pegarTemaPreferido()
        document.documentElement.setAttribute("data-color-scheme", corTema)
          
        document.getElementById("flexSwitchCheckDefault").onclick = () => {
            const corTema = document.documentElement.getAttribute("data-color-scheme")

            const novaCorTema = corTema === "default" ? "dark" : "default"
            document.documentElement.setAttribute("data-color-scheme", novaCorTema)
          
            localStorage.setItem("color-scheme", novaCorTema)
        };
    }
}