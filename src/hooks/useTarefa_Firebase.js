import { getAuth } from "firebase/auth";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, db } from "../firebase";

const useTarefa_Firebase = () => {

  const [id, setId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [finalizada, setFinalizada] = useState(false);
  const [listaTarefas, setListaTarefas] = useState([]);
  
  // Recuperando o usuário logado do Firebase
  const auth = getAuth();
  const usuario = auth.currentUser;

  const navigate = useNavigate();

  // Função para buscar as tarefas do usuário no Firestore
  const buscarTarefas = async () => {
    const colecao_tarefas = collection(db, "tarefas");
    const docs_tarefas = await getDocs(colecao_tarefas);

    // Filtra as tarefas do usuário logado
    const listaTarefasUsuario = docs_tarefas.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(tarefa => tarefa.uid === usuario.uid);

    setListaTarefas(listaTarefasUsuario);
  };

  useEffect(() => {
    // Buscar tarefas quando o componente for montado
    if(usuario){
        buscarTarefas();
    }
  }, [usuario]);

  // Função para adicionar uma nova tarefa no Firestore
  const adicionar_tarefa = async (titulo) => {

    const novaTarefa = {
      titulo: titulo,
      finalizada: false,
      uid: usuario.uid,
    };

    try {
      const novo_registro = await addDoc(collection(db, "tarefas"), novaTarefa);

      buscarTarefas()
      
      alert("Tarefa adicionada com sucesso! ");
    
    } catch (e) {
      alert("Erro ao adicionar tarefa: " + e);
    }
  };

  // Função para exibir detalhes da tarefa
  const exibir_detalhes_tarefa = (id) => {
    const tarefa = listaTarefas.find(tarefa => tarefa.id === id);
    navigate("/tarefaDetalhes", { state: tarefa });
  };

  // Função para excluir uma tarefa no Firestore
  const excluir_tarefa = async (id) => {
    try {
      
      await deleteDoc(doc(db, "tarefas", id));
      
      buscarTarefas()
      
      alert("Tarefa excluída com sucesso!");

    } catch (e) {
      alert("Erro ao excluir tarefa.");
    }
  };

//
//  Função para alterar uma tarefa no Firestore
  const alterar_tarefa = async (tarefa_editada) => {
    try {

      const registro_tarefa = doc(db, "tarefas", tarefa_editada.id);
      
      await updateDoc(registro_tarefa, 
        {
            titulo: tarefa_editada.titulo,  
            finalizada: tarefa_editada.finalizada
        }
      );
     
      buscarTarefas()
      
      alert("Tarefa alterada com sucesso!");
    
    } catch (e) {
        alert("Erro ao alterar tarefa.");
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
  };
};

export default useTarefa_Firebase;
