import { login } from './utils';
import './index.css';
import { useEffect, useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.


export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [messageError, setMessageError] = useState(false)
  
  async function handleSubmit() {
    try {
      setLoading(true)
      console.log(password)
      await login( {password, email})   
      window.alert('Parabéns, login efetuado com sucesso!')   
    } catch (error) {
      setMessageError(true)
      console.log("Erro durante o login:", error);
    }finally{
      setLoading(false)
    }
  }

  function showButton() {
    if (email != '' && password.length > 6) {
      setIsActive(true)
      return
    }
    setIsActive(false)
  }

  useEffect(() => {
    showButton()
  }, [email, password])

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {messageError && <div className='errorMessage'>Erro durante o login</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input id={'email'} type={'email'} autoComplete='off' value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input id={'password'} type={'password'} value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>

        <div className='button'>
          <button onClick={handleSubmit} disabled={!isActive || loading}>Login</button>
        </div>
      </div>
    </div>
  );
}
