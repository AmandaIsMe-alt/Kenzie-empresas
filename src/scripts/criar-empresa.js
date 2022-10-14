import {Api} from "./components/api.js"
import {Header} from "./components/header.js"
import {Aside} from "./components/aside.js"

class criarEmpresa {
    static async renderForm() {
        const form = document.createElement('form')
        const inputName = document.createElement('input')
        const labelHour = document.createElement('label')
        const inputHour = document.createElement('input')
        const textareaDescription = document.createElement('textarea')
        const labelSector = document.createElement('label')
        const selectSector = document.createElement('select')
        const btnCriar = document.createElement('button')

        const sectors = await Api.getAllSectors()

        for (let index = 0; index < sectors.length; index++) {
            const optionSector = document.createElement('option')
            optionSector.value = sectors[index].uuid
            optionSector.innerHTML = sectors[index].description

            selectSector.append(optionSector)
        }

        inputName.id = "inputName"
        inputHour.id = "inputHour"
        textareaDescription.id = "textareaDescription"
        selectSector.id = "selectSector"
        btnCriar.id = "btnRegister"
        btnCriar.classList.add('btn', 'btn-primary', 'w-100')

        inputName.type = "text"
        inputHour.type = "time"

        inputName.setAttribute('required', 'true')
        inputHour.setAttribute('required', 'true')
        textareaDescription.setAttribute('required', 'true')

        inputName.placeholder = "Nome da Empresa"
        textareaDescription.placeholder = "Descrição sobre a empresa"
        btnCriar.innerHTML = "Criar Empresa"
        labelHour.innerHTML = "Horário de funcionamento"
        labelSector.innerHTML = "Setor de atuação"

        form.append(inputName, labelHour, inputHour, textareaDescription, labelSector, selectSector, btnCriar)

        return form
    }

    static async renderCriar() {
        const article = document.querySelector('article > main')
        article.append(await criarEmpresa.renderForm())

        criarEmpresa.registrar()
    }

    static registrar() {
        const inputName     = document.getElementById('inputName')
        const inputHour     = document.getElementById('inputHour')
        const selectSector     = document.getElementById('selectSector')
        const textareaDescription     = document.getElementById('textareaDescription')
        const btnRegister   = document.getElementById('btnRegister')
    
        btnRegister.addEventListener('click', async event => {
            event.preventDefault()
    
            const data = {
                name: inputName.value,
                opening_hours: inputHour.value,
                description: textareaDescription.value,
                sector_uuid: selectSector.value
            }
    
            if (

                inputName.value.trim()      == "" ||
                inputHour.value.trim()      == "" ||
                textareaDescription.value.trim()  == ""

            ) {
                Api.mensagem("Preencha todos os campos! Não deixe campos vazios.")

            } else {
                const erro = await Api.registerCompanie(data)  
            }
        })
    }
}

Header.logout()
Aside.renderizarAside()

criarEmpresa.renderCriar()