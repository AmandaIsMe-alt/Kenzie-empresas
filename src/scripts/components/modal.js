import {Api} from "./api.js"
import {Render} from "./render.js"

export class Modal {

    static objectCases(who) {
        const cases = {
            user: {
                mensagem: 'Editar informações',
                campos: {
                    username: {
                        type: 'text',
                        id: 'inputName',
                        placeholder: 'Seu nome',
                        required: 'true'
                    },

                    email: {
                        type: 'email',
                        id: 'inputEmail',
                        placeholder: 'Seu e-mail',
                        required: 'true'
                    },

                    password: {
                        type: 'password',
                        id: 'inputPass',
                        placeholder: 'Nova senha',
                        required: 'false'
                    }
                }
            },

            dep: {
                mensagem: 'Editar departamento',
                campos: {
                    name: {
                        type: 'text',
                        id: 'inputName',
                        placeholder: 'Nome do departamento',
                        required: 'true'
                    },

                    description: {
                        type: 'textarea',
                        id: 'textareaDescricao',
                        placeholder: 'O que esse departamento faz?',
                        required: 'true'
                    }
                }
            },

            worker: {
                mensagem: 'Editar funcionário',
                campos: {
                    professional_level: {
                        type: 'select',
                        id: 'kind_of_work',
                        placeholder: 'Qual o nível profissional desse funcionário?',
                        required: 'false',
                        value: {
                            0: {
                                description: 'estágio'
                            },
                            1: {
                                description: 'júnior'
                            },
                            2: {
                                description: 'pleno'
                            },
                            3: {
                                description: 'sênior'
                            }
                        }
                    },

                    kind_of_work: {
                        type: 'select',
                        id: 'professional_level',
                        placeholder: 'Qual modalidade desse funcionário?',
                        required: 'false',
                        value: {
                            0: {
                                description: 'home office'
                            },
                            1: {
                                description: 'presencial'
                            },
                            2: {
                                description: 'híbrido'
                            }
                        }
                    }
                }
            }
        }

        return cases[who]
    }

    static fecharModal() {
        var modal = document.getElementById("modal")
        var fundo = document.querySelector(".modal-backdrop")
        fundo.remove()
        modal.remove()

        setTimeout(() => {
            window.location.reload();
        }, 1500)
    }

    static abrirModal() {
        var myModal = new bootstrap.Modal(document.getElementById("modal"), {})
        myModal.show()
    }

    static renderModal() {

        const body = document.querySelector('body')

        const modal = document.createElement('div')
        const modal_dialog = document.createElement('div')
        const modal_content = document.createElement('div')
        const modal_header = document.createElement('div')
        const modal_body = document.createElement('div')

        modal.classList.add('modal','fade')
        modal.id = "modal"
        modal_dialog.classList.add('modal-dialog')
        modal_content.classList.add('modal-content')
        modal_header.classList.add('modal-header')
        modal_body.classList.add('modal-body')

        modal_content.append(modal_header, modal_body)
        modal_dialog.append(modal_content)
        modal.append(modal_dialog)

        if(!document.querySelector('#modal')) {
            body.append(modal)
        }
    }

    static async editModal(who, uuid = "") {

        const modal = document.querySelector('#modal .modal-body')

        modal.innerHTML = ""

        let form = document.createElement('form')
        const quem = Modal.objectCases(who).campos

        let data = new Object();
        if(who == 'user') {
            data = await Api.getMyInfo()
        }

        for (const key in quem) {

            if (Object.hasOwnProperty.call(quem, key)) {

                const label = document.createElement('label')
                label.innerHTML = quem[key].placeholder

                form.append(label)

                if(quem[key].type == 'select') {
                    const select = Render.renderSelect(quem[key].value, false)
                    select.id = quem[key].id
                    form.append(select);

                } else{

                    if(key != 'password') {
                        form.append(Render.renderInput(quem[key], data[key]));
                    } else {
                        form.append(Render.renderInput(quem[key]));
                    }
                }
            }
        }

        form.append(Render.renderSaveModalButton('Salvar', 'btnSave', uuid))
        modal.append(form)

        Modal.abrirModal()

        const btnSave   = document.querySelector('#modal .btnSave')
        btnSave.addEventListener('click', async event => {
            event.preventDefault()
            let data = new Object();

            for (const key in quem) {

                if (Object.hasOwnProperty.call(quem, key)) {
                    const input = document.getElementById(quem[key].id)

                    if (input.value.trim() == "" && input.required == true) {
                        Modal.modalAviso('Preencha todos os campos obrigatórios!')

                    } else if(input.value.trim() != "") {
                        data[key] = document.getElementById(quem[key].id).value
                    }
                }
            }

            if(Object.keys(data).length > 0) {
                let erro;
                if(who == 'user') {
                    erro = await Api.updateMyInfo(data)

                } else if (who == 'dep') {
                    erro = await Api.editDepartment(data, uuid)
                    
                } else if (who == 'worker') {
                    erro = await Api.updateWorkersInfo(data, uuid)
                }

                if(!erro.error) {
                    Modal.fecharModal()
                } else {
                    Modal.modalAviso(erro.error)
                }
            }
        })
    }

    static async createModal(who, uuid = "") {
        const modal = document.querySelector('#modal .modal-body')

        modal.innerHTML = ""

        const form = document.createElement('form')
        const quem = Modal.objectCases(who).campos

        for (const key in quem) {
            if (Object.hasOwnProperty.call(quem, key)) {
                const label = document.createElement('label')
                label.innerHTML = quem[key].placeholder

                form.append(label)
                form.append(Render.renderInput(quem[key]));
            }
        }

        form.append(Render.renderSaveModalButton('Criar', 'btnCreate', uuid))
        modal.append(form)

        Modal.abrirModal()

        const btnCreate   = document.querySelector('#modal .btnCreate')
        btnCreate.addEventListener('click', async event => {
            event.preventDefault()
            let data = new Object();

            for (const key in quem) {

                if (Object.hasOwnProperty.call(quem, key)) {
                    const input = document.getElementById(quem[key].id)

                    if (input.value.trim() == "" && input.required) {
                        Modal.modalAviso('Preencha todos os campos obrigatórios!')

                    } else if(input.value.trim() != "") {
                        data[key] = document.getElementById(quem[key].id).value
                    }
                }
            }

            if(Object.keys(data).length > 0) {
                if(who == 'company') {

                } else if (who == 'dep') {
                    data['company_uuid'] = uuid
                    await Api.registerDepartment(data)
                }

                Modal.fecharModal()
            }
        })
    }

    static async deleteModal(who, uuid = "") {
        const modal = document.querySelector('#modal .modal-body')

        modal.innerHTML = ""

        const form = document.createElement('form')
        const h5 = document.createElement('h5')

        if(who == 'user') {
            h5.innerHTML = "Tem certeza que quer deleter permanentemente este usuário?"
        } else{
            h5.innerHTML = "Tem certeza que quer deleter permanentemente este departamento?"
        }

        form.append(h5, Render.renderSaveModalButton('Deletar', 'btnDelete', uuid))
        modal.append(form)

        Modal.abrirModal()

        const btnDelete   = document.querySelector('#modal .btnDelete')
        btnDelete.addEventListener('click', async event => {
            event.preventDefault()

            let erro = new Object();

            if(who == 'user') {
                erro = await Api.deleteWorker(uuid)
            } else{
                erro = await Api.deleteDepartment(uuid)
            }

            Modal.fecharModal()
        })
    }

    static async fireModal(who = "worker", uuid = "") {

        const modal = document.querySelector('#modal .modal-body')

        modal.innerHTML = ""

        const form = document.createElement('form')
        const h5 = document.createElement('h5')

        h5.innerHTML = "Tem certeza que quer demitir esse(a) funcionário(a)?"

        form.append(h5, Render.renderSaveModalButton('Demitir', 'btnFire', uuid))

        modal.append(form)

        Modal.abrirModal()

        const btnFire   = document.querySelector('#modal .btnFire')
        btnFire.addEventListener('click', async event => {
            event.preventDefault()

            const erro = await Api.fireWorker(uuid)

            if(!erro.error) {
                Modal.fecharModal()
            } else{
                Modal.modalAviso(erro.error)
            }
        })

    }

    static async hireModal(who = "worker", uuid = "") {
        const modal = document.querySelector('#modal .modal-body')

        modal.innerHTML = ""

        const users = await Api.getNoDeparmentWorkers()

        const form = document.createElement('form')

        const label = document.createElement('label')
        label.innerHTML = "Escolha o e-mail do usuário que deseja contratar:"

        form.append(label)
        form.append(Render.renderSelect(users));

        form.append(Render.renderSaveModalButton('Contratar', 'btnHire', uuid))
        modal.append(form)

        Modal.abrirModal()

        const btnHire   = document.querySelector('#modal .btnHire')
        btnHire.addEventListener('click', async event => {
            event.preventDefault()

            const input = document.getElementById('selectSector')

            const data = {
                user_uuid: input.value,
                department_uuid: uuid
            }

            if(input.value == 'null') {
                Modal.modalAviso('Para contratar selecione um usuário.')
            } else {
                const erro = await Api.hireWorker(data)

                if(!erro.error) {
                    Modal.fecharModal()
                } else{
                    Modal.modalAviso(erro.error)
                }
            }
        })
    }

    static modalAviso (text) {
        const modal = document.querySelector('#modal .modal-body')

        if(!document.querySelector('#modal_aviso')) {
            const texto = document.createElement('p')
            texto.classList.add('text-danger', 'text-center', 'pt-2')
    
            texto.id = "modal_aviso"
            texto.innerHTML = text
    
            modal.append(texto)
            
            setTimeout(() => {
              document.getElementById('mensagem_aviso').remove();
            }, "1200")
          }
    }

    static eventModalButton() {
        const buttonsControllersModal = document.querySelectorAll("[modal-goal]")

        for(let index = 0; index < buttonsControllersModal.length; index++){
            buttonsControllersModal[index].addEventListener("click", ()=>{
                let goal = buttonsControllersModal[index].getAttribute("modal-goal")
                let who = buttonsControllersModal[index].getAttribute("modal-who")
                let uuid = buttonsControllersModal[index].getAttribute("id")
                
                Modal.renderModal()
                if(goal == 'edit') {
                    Modal.editModal(who, uuid)

                } else if (goal == 'create') {
                    Modal.createModal(who, uuid)

                } else if (goal == 'delete') {
                    Modal.deleteModal(who, uuid)

                } else if (goal == 'fire') {
                    Modal.fireModal(who, uuid)

                } else if (goal == 'hire') {
                    Modal.hireModal(who, uuid)
                }
            })
        }
    }
}