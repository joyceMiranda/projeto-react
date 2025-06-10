import { getAuth } from "firebase/auth";
import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const useTarefa = () => {

    const [id, setId] = useState(null)
    const [titulo, setTitulo] = useState("")
    const [finalizada, setFinalizada] = useState(false)

    //Recuperando o usuário logado do Firebase
    const auth = getAuth();
    const usuario = auth.currentUser;

    const [listaTarefas, setListaTarefas] = useState(
        () => {
            const listaTarefas_storage = localStorage.getItem("listaTarefas")

            const todasTarefas = listaTarefas_storage?JSON.parse(listaTarefas_storage):[]

            // Filtra as tarefas que pertencem ao usuário logado
            return todasTarefas.filter(tarefa => tarefa.uid === usuario.uid);
        }
    )



    useEffect(
        
        () => {

            //recupera lista completa de tarefas armazenadas
            const listaTarefas_storage = localStorage.getItem("listaTarefas");
            const tarefasTodosUsuarios = listaTarefas_storage ? JSON.parse(listaTarefas_storage):[];

            // Recupera tarefas dos outros usuários
            const tarefasOutrosUsuarios = tarefasTodosUsuarios.filter(tarefa => tarefa.uid !== usuario.uid);

            // Unir tarefas do usuário atual com as tarefas dos outros usuários
            const novaListaTarefas = [...tarefasOutrosUsuarios, ...listaTarefas];

            //armazenar nova lista no localStorage
            localStorage.setItem("listaTarefas", JSON.stringify(novaListaTarefas));

            
        },[listaTarefas]
    )

    const adicionar_tarefa = (titulo) => {
        
        const novaTarefa = {
            id: Math.random(),
            titulo: titulo,
            finalizada: false,
            uid: usuario.uid
        }

        const novaListaTarefas = [...listaTarefas, novaTarefa]
        setListaTarefas(novaListaTarefas)

        alert("Tarefa adicionada com sucesso!")


    }

    const excluir_tarefa = (id) => {
        const novaListaTarefas = listaTarefas.filter(tarefa => tarefa.id !== id)
        
        setListaTarefas(novaListaTarefas)

        alert("Tarefa excluída com sucesso!")
    }

    const navigate = useNavigate()
    const exibir_detalhes_tarefa = (id) => {
        
        const tarefa = listaTarefas.find(tarefa => tarefa.id === id)
   
        navigate("/tarefaDetalhes", {state: tarefa} )
    }

    const alterar_tarefa = (tarefa_editada) => {
        const novaListaTarefas = listaTarefas.map(tarefa => {
            if(tarefa.id === tarefa_editada.id){
                return tarefa_editada
            }else{
                return tarefa
            }
        })

        setListaTarefas(novaListaTarefas)

        alert("Tarefa alterada com sucesso!")

    }

    return({
        id, setId,
        titulo, setTitulo,
        finalizada, setFinalizada,
        listaTarefas, 
        usuario,
        adicionar_tarefa, 
        excluir_tarefa, 
        exibir_detalhes_tarefa, 
        alterar_tarefa
    })


}

export default useTarefa




