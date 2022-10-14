import {Api} from "./components/api.js"
import {Header} from "./components/header.js"
import {Aside} from "./components/aside.js"
import {Render} from "./components/render.js"
import {Modal} from "./components/modal.js"

export class Dashboard {

    static async renderDashboard() {
        const admin = localStorage.getItem("@kenzie:admin")

        if(admin == 'true') {
            
            const secaoUsuarioComum = document.querySelector("#sectionNormalUser")
            secaoUsuarioComum.remove()

            Dashboard.renderWelcomeHeader('admin')

        } else {

            const secaoAdmin = document.querySelector("#sectionAdmin")
            secaoAdmin.remove()

            await Dashboard.renderNormalUSer()
        }
    }

    /*USUÁRIO NORMAL*/

    static async renderNormalUSer() {
        const myInfo = await Dashboard.renderMyInfo()

        await Dashboard.renderMyCompanyAndDepartment(myInfo.department_uuid)
        await Dashboard.renderMyCoworkers()
    }

    static async renderMyCompanyAndDepartment (department) {
        const myCompany = await Api.getMyCompanyDepartments()

        const sectionEmpresa = document.querySelector("#sectionEmpresa")
        const sectionMeuDepartamento = document.querySelector("#sectionMeuDepartamento")

        if(!myCompany.uuid) {

            sectionEmpresa.append(
                Render.renderCompany({name: "Você ainda não foi vinculado à uma empresa."})
            )

            sectionMeuDepartamento.append(
                await Render.renderDepartment({name: "Você ainda não foi vinculado à um departamento."})
            )

        } else {
            sectionEmpresa.append(Render.renderCompany(myCompany))

            const companyDepartments = myCompany.departments

            for (const key in companyDepartments) {
                if (Object.hasOwnProperty.call(companyDepartments, key)) {
                    if(companyDepartments[key].uuid == department) {
                        sectionMeuDepartamento.append(
                            await Render.renderDepartment(companyDepartments[key])
                        )
                    }
                }
            }
        }
    }

    static async renderMyCoworkers () {
        const user_id = localStorage.getItem("@kenzie:User_id")
        const myCoworkers = await Api.getMyCoworkers()

        const sectionMeusColegas = document.querySelector("#sectionMeusColegas")

        if(!myCoworkers[0].users) {
            sectionMeusColegas.append(
                Render.renderCoworkers({username: "Você ainda não possui colegas de trabalho."})
            )
        } else {

            const coworkers = myCoworkers[0].users

            for (const key in coworkers) {
                if (Object.hasOwnProperty.call(coworkers, key)) {
                    if(coworkers[key].uuid != user_id) {
                        sectionMeusColegas.append(
                            Render.renderCoworkers(coworkers[key])
                        )
                    }              
                }
            }
        }
    }

    static async renderMyInfo () {
        const myInfo = await Api.getMyInfo()

        Dashboard.renderWelcomeHeader(myInfo.username)

        const divCardUser = Render.renderUsers(myInfo)

        const sectionMinhasInformacoes = document.querySelector("#sectionMinhasInformacoes")
        sectionMinhasInformacoes.innerHTML = ""
        
        sectionMinhasInformacoes.append(divCardUser)

        Modal.eventModalButton()

        return myInfo
    }

    /*USUÁRIO ADMIN*/

    /* AMBOS */
    static renderWelcomeHeader(nome) {
        document.querySelector("#welcome-header").innerHTML = `Olá, ${nome}!` 
    }
}

Header.logout()
Aside.renderizarAside()

await Dashboard.renderDashboard()