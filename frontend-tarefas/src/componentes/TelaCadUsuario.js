import { useNavigate } from "react-router-dom";
import useUsuario from "../hooks/useUsuario";


const TelaCadUsuario = () => {
  
  const {
    erro,
    setEmail,
    setSenha,
    cadUsuario
  } = useUsuario();


  const navigate = useNavigate();

  const clickVoltar = () => {
    navigate("/")
  }


  return (
    <div className="box">
      <h4>Tela de Cadastro de Usuário</h4>

      <div style={{color:"red"}}>
            {erro ? <p aria-label="mensagem de erro">
              {erro}
              </p> : null}
      </div>

      <form onSubmit={cadUsuario}>

      <div style={{display:"flex", alignItems:"center", gap:"10px", whiteSpace:"nowrap"}}>
      <label style={{color:"black",width:"50px"}}>Email:</label> 
      <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            onChange={(campo) => setEmail(campo.target.value)}
          />
        </div>
        <div style={{display:"flex", alignItems:"center", gap:"10px", whiteSpace:"nowrap"}}>
        <label style={{color:"black",width:"50px"}}>Senha:</label> 
        <input
            type="password"
            aria-label="Senha"
            onChange={(campo) => setSenha(campo.target.value)}
          />
        </div>
        <div style={{display:"flex", justifyContent:"center", textAlign:"center", gap:"10px"}}>
          <button type="submit">Cadastrar</button>
          <button onClick={clickVoltar}>Voltar</button>
        </div>
      </form>
    </div>
  );
};

export default TelaCadUsuario;
