import {Api} from "./components/api.js"
import {Header} from "./components/header.js"

export class Register {

    static createNewUser() {
  
      const inputName     = document.getElementById('inputName')
      const inputMail     = document.getElementById('inputMail')
      const inputJob      = document.getElementById('inputJob')
      const inputPassword = document.getElementById('inputPassword')
      const btnRegister   = document.getElementById('btnRegister')
  
      btnRegister.addEventListener('click', async event => {
        event.preventDefault()
  
        const data = {
            password: inputPassword.value,
            email: inputMail.value,
            professional_level: inputJob.value,
            username: inputName.value
        }
  
        if (
          inputName.value.trim()      == "" ||
          inputMail.value.trim()      == "" ||
          inputJob.value.trim()     == "" ||
          inputPassword.value.trim()  == ""
        ) {
          Api.mensagem("Preencha todos os campos! Não deixe campos vazios.")
  
        } else {
  
            const erro = await Api.registerUser(data)  

            if(erro.error){
                Api.mensagem(erro.error, 'fail')
            }
        }
      })
    }
}
  
Register.createNewUser()

Header.renderizarHeader('cadastro')