import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  

const useTarefa_Mysql = () => {
  const [id, setId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [finalizada, setFinalizada] = useState(false);
  const [listaTarefas, setListaTarefas] = useState([]);

  // Recuperando o usuário logado do Firebase
  const auth = getAuth();
  const usuario = auth.currentUser;

  const navigate = useNavigate();

  //definição fixa da URL do servidor
  const api = axios.create({
    //baseURL: "http://localhost:3001" 
    baseURL: process.env.REACT_APP_API_URL+":"+process.env.REACT_APP_API_PORT 
  });


  // Função para buscar as tarefas do servidor
  const buscar_tarefas = async () => {
    try {
      const resposta = await api.get("/tarefas");
      const tarefasUsuario = resposta.data.filter(tarefa => tarefa.uid === usuario.uid)
      setListaTarefas(tarefasUsuario);
    } catch (error) {
      alert("Erro ao buscar tarefas: " + error)
    }
  }

  useEffect(() => {
    // Buscar tarefas quando o componente for montado
    if(usuario){
        buscar_tarefas()
    }
  }, [usuario])

  // Função para adicionar uma nova tarefa
  const adicionar_tarefa = async (titulo) => {
    const novaTarefa = {
      titulo,
      finalizada: false,
      uid: usuario.uid,
    }

    try {

      await api.post("/tarefas", novaTarefa);

      buscar_tarefas()
      
      alert("Tarefa adicionada com sucesso!")

    } catch (error) {

      alert("Erro ao adicionar tarefa:" + error);

    }
  }

  // Função para excluir uma tarefa
  const excluir_tarefa = async (id) => {
    try {

      await api.delete("/tarefas/"+id)

      buscar_tarefas()

      alert("Tarefa excluída com sucesso!")

    } catch (error) {

      alert("Erro ao excluir tarefa:", error)

    }
  }

  // Função para exibir detalhes de uma tarefa
  const exibir_detalhes_tarefa = (id) => {

    const tarefa = listaTarefas.find(tarefa => tarefa.id === id)
    navigate("/tarefaDetalhes", { state: tarefa })

  }

  // Função para alterar uma tarefa
  const alterar_tarefa = async (tarefa_editada) => {
    try {

      await api.put("/tarefas/"+tarefa_editada.id, tarefa_editada)
      
      buscar_tarefas()

      alert("Tarefa alterada com sucesso!")

    } catch (error) {
      alert("Erro ao alterar tarefa:", error);
    }
  };

  return {
    id, setId,
    titulo, setTitulo,
    finalizada, setFinalizada,
    listaTarefas,
    adicionar_tarefa,
    excluir_tarefa,
    exibir_detalhes_tarefa,
    alterar_tarefa,
    usuario
  }

}

export default useTarefa_Mysql;
