import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";

const RotaPrivada = ({ children }) => {
  
  //monitorar o estado de autenticação de um usuário 
  const [usuario, carregando] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!carregando && !usuario) {
      navigate("/");  
    }
  }, [usuario, carregando, navigate]);

  if (carregando) return (<div>Carregando...</div>);

  return (usuario ? children : null); 
}

export default RotaPrivada