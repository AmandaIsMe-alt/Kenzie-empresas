import {Api} from "./components/api.js"
import {Header} from "./components/header.js"

class Login {

    static realizarLogin(){
  
      const token = localStorage.getItem("@kenzie:token")
  
      if (!token || token == 'undefined') {
  
        const emailInput    = document.getElementById('inputMailLogin')
        const passwordInput = document.getElementById('inputPassLogin')
        const btnLogin      = document.getElementById('btnLogin')
  
        btnLogin.addEventListener("click", async event => {
          event.preventDefault()
  
          if (emailInput.value.trim() == "" || passwordInput.value.trim() == "") {
  
            Api.mensagem("Preencha todos os campos! Não deixe campos vazios.")
  
          } else {
  
            const data = {
              email:    emailInput.value,
              password: passwordInput.value
            }
  
            const erro = await Api.login(data)

            if(erro.error){
                Api.mensagem(erro.error, 'fail')
            }
          }
  
        })
  
      }else{
        window.location.assign("./src/pages/dashboard.html")
      }
    }
}

Header.renderizarHeader()
Login.realizarLogin()