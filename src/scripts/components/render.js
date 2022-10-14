import {Api} from "./api.js"

export class Render {
    static renderSelect(arr, first = '--') {

        const selectSector = document.createElement('select')
        selectSector.id = "selectSector"
        selectSector.required = true

        if(first != false) {
            const optionSector = document.createElement('option')
            optionSector.value = first != '--' ? first : null
            optionSector.innerHTML = first
            selectSector.append(optionSector)
        }

        for (const key in arr) {
            if (Object.hasOwnProperty.call(arr, key)) {
                const optionSector = document.createElement('option')
                optionSector.value = !arr[key].uuid ? arr[key].description : arr[key].uuid
                optionSector.innerHTML = !arr[key].description ? arr[key].email : arr[key].description

                selectSector.append(optionSector)
                
            }
        }

        return selectSector
    }

    static renderInput(object, value = "") {
        if (object.type != 'select' || object.type != 'textarea') {
            const input = document.createElement('input')

            input.type = object.type
            input.placeholder = object.placeholder
            input.id = object.id
            input.value = value

            if(object.required == 'true') {
                input.setAttribute('required', object.required)
            }

            return input
        }
    }

    static renderOpenModalButton(text, goal, who, uuid = "") {
        const button = document.createElement('button')

        button.classList.add('btn')
        button.id = uuid

        button.setAttribute('modal-goal', goal)
        button.setAttribute('modal-who', who)

        button.innerHTML = text

        return button
    }

    static renderSaveModalButton(text, classe, uuid = "") {
        const button = document.createElement('button')

        button.classList.add('btn', 'btn-primary', 'w-100', classe)
        button.id = uuid

        button.innerHTML = text

        return button
    }

    static renderBtnActionGroup(arr) {

        const divBtnGroup = document.createElement('div')
        const buttonOpenGroup = document.createElement('button')
        const ulBtns = document.createElement('ul')
        const liBtnHolder = document.createElement('li')

        divBtnGroup.classList.add('btn-group')
        buttonOpenGroup.classList.add('btn', 'btn-primary', 'dropdown-toggle')
        buttonOpenGroup.setAttribute('data-bs-toggle', 'dropdown')
        ulBtns.classList.add('dropdown-menu', 'p-2', 'rounded-3', 'mx-0', 'shadow', 'w-220px')

        arr.forEach(element => {
            element.classList.remove('btn');
            element.classList.add('dropdown-item', 'rounded-2')
            liBtnHolder.append(element)
        });

        ulBtns.append(liBtnHolder)
        divBtnGroup.append(buttonOpenGroup, ulBtns)

        return divBtnGroup
    }

    static renderCompany(company) {

        const divCard = document.createElement('div')
        const divCardBody = document.createElement('div')
        const divCardBodyInfo = document.createElement('div')

        const setorCompanie = document.createElement('span')
        const nomeCompanie = document.createElement('h5')
        const descricaoCompanie = document.createElement('p')
        const horarioCompanie = document.createElement('small')

        divCard.classList.add('card', 'text-black', 'empresa', 'mb-4')
        divCardBody.classList.add('card-body', 'd-flex', 'gap-2', 'w-100', 'justify-content-between', 'align-items-start')

        setorCompanie.classList.add('badge', 'text-bg-primary')
        nomeCompanie.classList.add('card-title', 'pt-3')
        descricaoCompanie.classList.add('mb-0', 'opacity-75')
        horarioCompanie.classList.add('text-muted', 'pt-3', 'd-block')

        setorCompanie.innerHTML = !company.sectors ? "" : company.sectors.description
        nomeCompanie.innerHTML = !company.name ? "" : company.name
        descricaoCompanie.innerHTML = !company.description ? "" : company.description
        horarioCompanie.innerHTML = !company.opening_hours ? "" : `Horário de funcionamento: ${company.opening_hours}`

        divCardBodyInfo.append(setorCompanie, nomeCompanie, descricaoCompanie, horarioCompanie)
        divCardBody.append(divCardBodyInfo)

        const admin = localStorage.getItem("@kenzie:admin")

        if(admin == 'true') {
            const btnEditar = document.createElement('a')
            btnEditar.classList.add('dropdown-item', 'rounded-2')
            btnEditar.innerHTML = "Editar"
            btnEditar.href = `editar-empresa.html?companie=${company.uuid}&nome=${company.name}&descricao=${company.description}`
            btnEditar.classList.add('dropdown-item', 'rounded-2')

            const btnCriar = Render.renderOpenModalButton('Criar Departamento', 'create', 'dep', company.uuid)

            const btnGroup = Render.renderBtnActionGroup([btnEditar, btnCriar])

            divCardBody.append(btnGroup)
        }

        divCard.append(divCardBody)
        
        return divCard

    }

    static async renderDepartment(department) {

        const liBody = document.createElement('li')
        const figureDepartment = document.createElement('figure')
        const figcaptionInfoBody = document.createElement('figcaption')
        const divInfo = document.createElement('div')

        const nomeDepartment = document.createElement('h5')
        const descricaoDepartment = document.createElement('small')

        liBody.classList.add('departamento', 'pt-3')
        figureDepartment.classList.add('text-black', 'd-flex', 'gap-3')
        figcaptionInfoBody.classList.add('w-100')
        divInfo.classList.add('d-flex', 'gap-2', 'w-100', 'justify-content-between', 'align-items-start')

        nomeDepartment.classList.add('mb-0')
        descricaoDepartment.classList.add('mb-0', 'opacity-75', 'd-block')

        figureDepartment.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="32" height="32" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path xmlns="http://www.w3.org/2000/svg" d="m447.07 422.801-82.839 82.843c-4.236 4.237-9.789 6.356-15.341 6.356s-11.104-2.119-15.34-6.356c-8.472-8.47-8.472-22.208-.001-30.678l45.806-45.809h-245.51c-41.503 0-75.269-33.767-75.269-75.267v-332.195c0-11.981 9.713-21.695 21.695-21.695s21.695 9.714 21.695 21.695v332.195c0 17.576 14.301 31.877 31.879 31.877h245.508l-45.804-45.805c-8.472-8.47-8.472-22.208 0-30.68 8.472-8.47 22.208-8.47 30.68 0l82.839 82.841c8.474 8.47 8.474 22.208.002 30.678z" fill="#000000" data-original="#000000" class=""></path></g></svg>`
        nomeDepartment.innerHTML = !department.name ? "" : department.name
        descricaoDepartment.innerHTML = !department.description ? "" : department.description

        nomeDepartment.append(descricaoDepartment)
        divInfo.append(nomeDepartment)
        figcaptionInfoBody.append(divInfo)

        const admin = localStorage.getItem("@kenzie:admin")

        if(admin == 'true') {

            const users = await Api.getAllUsers()

            const ulWorkers = document.createElement('ul')

            ulWorkers.id = "workers"
            ulWorkers.classList.add('pt-3', 'd-flex', 'gap-3')

            for (let i = users.length -1 ; i >= 0; i--) {

                if(users[i].department_uuid == department.uuid) {

                    const worker = Render.renderUsers(users[i])
                    ulWorkers.append(worker)
                }
            }
            figcaptionInfoBody.append(ulWorkers)

            const btnContratar = Render.renderOpenModalButton('Contratar Funcionário', 'hire', 'worker', department.uuid)
            const btnDelete = Render.renderOpenModalButton('Deletar Departamento', 'delete', 'dep', department.uuid)
            divInfo.append( Render.renderBtnActionGroup([btnContratar, btnDelete]))
        }

        figureDepartment.append(figcaptionInfoBody)
        liBody.append(figureDepartment)

        if(admin == 'true') {
            const hr = document.createElement('hr')
            liBody.append(hr)
        }
        
        return liBody

    }

    static renderCoworkers(coworker) {

        const liCoworker = document.createElement('li')
        const divInfo = document.createElement('div')
        const strongNome = document.createElement('strong')
        const spanNivel = document.createElement('span')
        const pEmail = document.createElement('p')
        const smallModalidade = document.createElement('small')

        liCoworker.classList.add('d-flex', 'justify-content-between', 'border-bottom', 'align-items-center', 'pb-3', 'pt-3')
        divInfo.classList.add('mb-0', 'small', 'lh-sm')
        strongNome.classList.add('d-block', 'text-gray-dark')
        spanNivel.classList.add('badge', 'text-bg-primary')
        pEmail.classList.add('mb-0')
        smallModalidade.classList.add('text-muted', 'd-block')

        strongNome.innerHTML = !coworker.username ? "" : coworker.username
        spanNivel.innerHTML = !coworker.professional_level ? "" : coworker.professional_level
        pEmail.innerHTML = !coworker.email ? "" : coworker.email

        let modalidade = coworker.kind_of_work
        if (!coworker.kind_of_work) {
            modalidade = ""

        } else if(coworker.kind_of_work == null) {
            modalidade = 'Qualquer Modalidade'
        }
        
        smallModalidade.innerHTML = modalidade

        strongNome.append(spanNivel)
        divInfo.append(strongNome, pEmail)
        liCoworker.append(divInfo, smallModalidade)

        return liCoworker
    }

    static renderUsers(user) {

        const thisUser = localStorage.getItem("@kenzie:User_id")

        const divCard = document.createElement('li')
        const divCardHeader = document.createElement('div')
        const divCardBody = document.createElement('div')

        const nomeUser = document.createElement('h5')
        const emailUser = document.createElement('p')
        const nivelUser = document.createElement('span')
        const modalidadeUser = document.createElement('small')

        divCard.classList.add('card', 'mb-3', 'text-center', 'col-3')
        divCard.id = 'user'
        divCardHeader.classList.add('card-header', 'position-relative')
        divCardBody.classList.add('card-body')

        nivelUser.classList.add('badge', 'text-bg-primary')
        nomeUser.classList.add('card-title', 'mt-3')
        emailUser.classList.add('card-text')
        modalidadeUser.classList.add('text-muted', 'pt-0', 'd-block')

        nivelUser.innerHTML = user.professional_level
        nomeUser.innerHTML = user.username
        emailUser.innerHTML = user.email

        const modalidade = user.kind_of_work == null ? 'Qualquer Modalidade' : user.kind_of_work
        modalidadeUser.innerHTML = `${modalidade}`

        const admin = localStorage.getItem("@kenzie:admin")
        let btnGroup;

        if(admin == 'true') {
            if(user.department_uuid != null) {

                const btnEditar = Render.renderOpenModalButton('Editar funcionário', 'edit', 'worker', user.uuid)
                const btnDemitir = Render.renderOpenModalButton('Demitir funcionário', 'fire', 'worker', user.uuid)
                const btnDeletar = Render.renderOpenModalButton('Deletar usuário', 'delete', 'worker', user.uuid)

                btnGroup = Render.renderBtnActionGroup([btnEditar, btnDemitir, btnDeletar])
            } else{

                const btnEditar = Render.renderOpenModalButton('Editar usuário', 'edit', 'worker', user.uuid)
                const btnDeletar = Render.renderOpenModalButton('Deletar usuário', 'delete', 'user', user.uuid)

                btnGroup = Render.renderBtnActionGroup([btnEditar, btnDeletar])
            }

        } else if (user.uuid == thisUser) {
            const button = Render.renderOpenModalButton('Editar Informações', 'edit', 'user', user.uuid)
            btnGroup = Render.renderBtnActionGroup([button])
        }

        btnGroup.classList.add('position-absolute', 'top-0', 'end-0')

        divCardHeader.append(btnGroup)

        divCardBody.append(nivelUser, nomeUser, emailUser, modalidadeUser)
        divCard.append(divCardHeader, divCardBody)

        return divCard
    }
}