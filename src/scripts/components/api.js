export class Api {

    static url = "http://localhost:6278"

    static token = localStorage.getItem("@kenzie:token") || ""
    static user_id = localStorage.getItem("@kenzie:User_id") || ""
    static admin = localStorage.getItem("@kenzie:admin") || false

    static headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`
    });
  
    static async registerUser(data) {
  
      const register = await fetch(`${this.url}/auth/register/user`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: this.headers
        })
        .then(res => res.json())
        .then(res => {
            if(res.uuid) {
              setTimeout(() => {
                window.location.assign('../../index.html')
              }, 2000)
              
              this.mensagem("Cadastrado com sucesso! Agora faça o login.")

            }

            return res
        })
        .catch(err => this.mensagem(err))
  
      return register
    }

    static async registerCompanie(data) {
  
        const registerCompanie = await fetch(`${this.url}/companies`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: this.headers
          })
          .then(res => res.json())
          .then(res => {
            this.mensagem("Empresa cadastrada com sucesso!")
            return res
          })
          .catch(err => this.mensagem(err))
    
        return registerCompanie
    }

    static async registerDepartment(data) {
  
        const registerDepartment = await fetch(`${this.url}/departments`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: this.headers
          })
          .then(res => res.json())
          .then(res => {

            if(res.uuid) {
                this.mensagem("Departamento cadastrada com sucesso!")
            }

            return res

          })
          .catch(err => this.mensagem(err))
    
        return registerDepartment
    }
  
    static async login(data) {
  
      const login = await fetch(`${this.url}/auth/login`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: this.headers
        })
        .then(res => res.json())
        .then(res => {

          if(res.uuid) {
            localStorage.setItem("@kenzie:token",   res.token)
            localStorage.setItem("@kenzie:User_id", res.uuid)
            localStorage.setItem("@kenzie:admin", res.is_admin)

            window.location.assign('./src/pages/dashboard.html')
          }

          return res

        })
        .catch(err => {  
          this.mensagem(err)
        })

      return login
    }

    static async getAllCompanies() {
  
        const companies = await fetch(`${this.url}/companies`, {
            method: "GET",
            headers: this.headers
          })
          .then(res => res.json())
          .catch(err => console.log(err))
  
        return companies
    }

    static async getAllSectors() {
  
        const sectors = await fetch(`${this.url}/sectors`, {
            method: "GET",
            headers: this.headers
          })
          .then(res => res.json())
          .catch(err => console.log(err))
  
        return sectors
    }

    static async getAllDepartments() {
  
        const departments = await fetch(`${this.url}/departments`, {
            method: "GET",
            headers: this.headers
          })
          .then(res => res.json())
          .catch(err => console.log(err))
  
        return departments
    }

    static async getCompanieBySector(setor) {
  
        const companieSector = await fetch(`${this.url}/companies/${setor}`, {
            method: "GET",
            headers: this.headers
          })
          .then(res => res.json())
          .catch(err => console.log(err))
  
        return companieSector
    }

    static async getAllCompanieDepartments(companieID) {
  
        const companieDepartments = await fetch(`${this.url}/departments/${companieID}`, {
            method: "GET",
            headers: this.headers
          })
          .then(res => res.json())
          .then(res => {
            return res
          })
          .catch(err => console.log(err))
  
        return companieDepartments
    }

    static async getMyInfo() {
  
      const myInfo = await fetch(`${this.url}/users/profile`, {
          method: "GET",
          headers: this.headers
        })
        .then(res => res.json())
        .catch(err => console.log(err))

      return myInfo
    }

    static async getMyCoworkers() {
  
        const coworkers = await fetch(`${this.url}/users/departments/coworkers`, {
            method: "GET",
            headers: this.headers
          })
          .then(res => res.json())
          .then(res => {
            return res
          })
          .catch(err => console.log(err))
  
        return coworkers
    }

    static async getMyCompanyDepartments() {
  
        const departments = await fetch(`${this.url}/users/departments`, {
            method: "GET",
            headers: this.headers
          })
          .then(res => res.json())
          .catch(err => console.log(err))
  
        return departments
    }

    static async editDepartment(data, departmentID) {
  
        const editDepartments = await fetch(`${this.url}/departments/${departmentID}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: this.headers
          })
          .then(res => res.json())
          .then(res => {
            if(res.uuid) {
                this.mensagem('Informações atualizadas com sucesso!')
            }
        })
          .catch(err => console.log(err))
  
        return editDepartments
    }

    static async deleteDepartment(departmentID) {
  
        const deleteDepartments = await fetch(`${this.url}/departments/${departmentID}`, {
            method: "DELETE",
            headers: this.headers
          })
          .then(res => res.json())
          .then(res => {
              this.mensagem('Departamento deletado com sucesso!')
              return res
          })
          .catch(err => console.log(err))
  
        return deleteDepartments
    }

    static async updateMyInfo(data) {
  
        const update = await fetch(`${this.url}/users`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: this.headers
          })
          .then(res => res.json())
          .then(res => {
            if(!res.error) {
              this.mensagem('Dados atualizados!')
            }
            return res
          })
          .catch(err => console.log(err))
  
        return update
    }

    static async hireWorker(data) {
  
        const hireWorker = await fetch(`${this.url}/departments/hire/`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: this.headers
          })
          .then(res => res.json())
          .then(res => {
                if(res.uuid) {
                    this.mensagem('Usuário contratado com sucesso!')
                }

                return res
            })
          .catch(err => console.log(err))
  
        return hireWorker
    }

    static async fireWorker(workerID) {
  
        const fireWorker = await fetch(`${this.url}/departments/dismiss/${workerID}`, {
            method: "PATCH",
            headers: this.headers
          })
          .then(res => res.json())
          .then(res => {
                if(res.uuid) {
                    this.mensagem('Demissão realizada com sucesso!')
                }

                return res
            })
          .catch(err => console.log(err))
  
        return fireWorker
    }

    static async updateWorkersInfo(data, workerID) {
  
        const updateWorker = await fetch(`${this.url}/admin/update_user/${workerID}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: this.headers
          })
          .then(res => res.json())
          .then(
            this.mensagem('Informações atualizadas!')
          )
          .catch(err => console.log(err))
  
        return updateWorker
    }

    static async deleteWorker(workerID) {
  
      const deleteWorker = await fetch(`${this.url}/admin/delete_user/${workerID}`, {
          method: "DELETE",
          headers: this.headers
        })
        .then(res => res.json())
        .then(res => {
          this.mensagem('Usuário deletado com sucesso!')
          return res
        })
        .catch(err => console.log(err))

      return deleteWorker
    }

    static async getAllUsers() {
  
        const users = await fetch(`${this.url}/users`, {
            method: "GET",
            headers: this.headers
          })
          .then(res => res.json())
          .then(res => {return res})
          .catch(err => console.log(err))
  
        return users
    }

    static async getNoDeparmentWorkers() {
  
        const noDepartments = await fetch(`${this.url}/admin/out_of_work`, {
            method: "GET",
            headers: this.headers
          })
          .then(res => res.json())
          .catch(err => console.log(err))
  
        return noDepartments
    }

    static clearLocalStorage() {
      localStorage.removeItem('@kenzie:token')
      localStorage.removeItem('@kenzie:User_id')
      localStorage.removeItem("@kenzie:admin")
    }
  
    static mensagem (text, type = 'success') {
  
      const body = document.querySelector('body')
  
      if(!document.querySelector('#mensagem_aviso')) {
        const fundo = document.createElement('div')
        const conteudo = document.createElement('div')
        const texto = document.createElement('p')

        fundo.id = "mensagem_aviso"
        conteudo.classList.add(type)

        texto.innerHTML = text

        conteudo.append(texto)
        fundo.append(conteudo)
        body.append(fundo)
        
        setTimeout(() => {
          document.getElementById('mensagem_aviso').remove();
        }, "3000")

        let closeMensagem = document.querySelector('#mensagem_aviso div')
        closeMensagem.addEventListener("click", () => {
          document.getElementById('mensagem_aviso').remove();
        })
      }
    }
  
}