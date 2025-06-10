import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const useUsuario = () => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const fazerLogin = async (e) => {

    e.preventDefault()
    setErro("")
  
    try {
      //aguarda o retorno do firebase
      await signInWithEmailAndPassword(auth, email, senha)
      navigate("/tarefas")
    } catch (error) {
      setErro("Email ou senha inválidos.")
    }
  
  };

  const fazerLogout = async (e) => {
    
    e.preventDefault()
    setErro("")
  
    try {
      await signOut(auth); // Encerra a sessão do usuário
      navigate("/");  
    } catch (error) {
      setErro("Erro ao fazer logout:", error);
    }
  };
  

  const cadUsuario = async (e) => {
    e.preventDefault()
    setErro("")
    try {
      await createUserWithEmailAndPassword(auth, email, senha)
      alert("Cadastro realizado com sucesso!")
      navigate("/")
    } catch (error) {
      setErro("Erro ao cadastrar: " + error.message)
    }
  }
  
  


  
  return ({
    erro,
    setEmail,
    setSenha,
    fazerLogin,
    fazerLogout,
    cadUsuario 
  })

}

export default useUsuario
