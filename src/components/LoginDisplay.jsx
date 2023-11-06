import { useState, useEffect } from "react";

import './loginDisplay.css'
function LoginDisplay() {

    // Passo 1 - Salva os inputs
    // Passo 2 - Envia os dados para o servidor

    const [clients, setClients] = useState([]) // imutavel
    const [userClient, setUserClient] = useState() // imutavel
    const [password, setPassword] = useState() // imutavel 
    const [login, setLogin] = useState(false) // padrão false

   // console.log(clients)

   
    useEffect( () => {
        fetch('http://localhost:5000/')
        .then((response) => response.json())
        .then((data) => {
        setClients(data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [userClient, password] )

    const handleSubmit = (event) => {
        event.preventDefault()

        if(!userClient || !password) {
            console.log('Dados precisam está preenchidos')
        }

        if(clients[0].email === userClient && clients[0].senha === password) {
            console.log('Bem-vindo') // true = verdade
            setLogin(true)
        } else{
            console.log('não bateu') // false = mentira 
            setLogin(false)
        }
    }


    return (
        <section>
            <h2>Loga no Sistema</h2>

            { login ? (
                <h3>Seja muito bem-vindo</h3>
            ) : (
                <form onSubmit={handleSubmit}>
                <div>
                    <label>E-mail</label>
                    <input type="email" value={userClient} onChange={ (e) => setUserClient(e.target.value)} />
                </div>
    
                <div>
                    <input type="password" value={password} onChange={ (e) => setPassword(e.target.value)} />
                    <label >Senha</label>
                </div>
                <button type="submit">ENTRAR</button>
            </form>
            )

            }    
        </section>
    );
  }
  
  export default LoginDisplay; //
  