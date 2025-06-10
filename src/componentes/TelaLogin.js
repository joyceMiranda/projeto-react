import { Link } from "react-router-dom";
import "./Tarefa.css"
import useUsuario from "../hooks/useUsuario";

const TelaLogin = () => {

  const {
    erro,
    setEmail,
    setSenha,
    fazerLogin
  } = useUsuario();


  return (
    <>
    <div className="box" >
      <h4>Tela de Login</h4>
      <div style={{color:"red"}}>
            {erro ? <p aria-label="mensagem de erro">
              {erro}

              </p> : null}
      </div>
      <form onSubmit={fazerLogin} >

        <div style={{display:"flex", alignItems:"center", gap:"10px", whiteSpace:"nowrap"}}>
        <label style={{color:"black",width:"50px"}}>Email:</label> 
        <input
          type="email"
          aria-label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div style={{display:"flex", alignItems:"center", gap:"10px", whiteSpace:"nowrap"}}>
        <label style={{color:"black",width:"50px"}}>Senha:</label> 
        <input
          type="password"
          aria-label="senha"
          onChange={(e) => setSenha(e.target.value)}
        />
         </div>
        <button type="submit">
          Entrar
        </button>
        <p>
        <Link to="/cadUsuario">
              Não tem conta? Cadastre-se aqui.
        </Link>
        </p>

      </form>
    </div>
   
    </>
  );
}


export default TelaLogin;
