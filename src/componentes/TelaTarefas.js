import React from "react";
import "./Tarefa.css"
import FormCadTarefa from "./FormCadTarefa";
import { AiOutlinePlus } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import useTarefa_Mysql from "../hooks/useTarefa_Mysql";

const TelaTarefas = () => {

    const {listaTarefas, adicionar_tarefa, excluir_tarefa, exibir_detalhes_tarefa, usuario} = useTarefa_Mysql()

    return(
        <>
            <div className="box"     >

                <h4 style={{textAlign:"center"}} tabIndex={1}>
                    Minhas Tarefas - {usuario.email}
                </h4>

                <FormCadTarefa adicionar_tarefa={adicionar_tarefa}></FormCadTarefa>
                {listaTarefas.length === 0? (<p>Nenhuma tarefa cadastrada.</p>) :
                listaTarefas.map(tarefa => 
                 (   
                    <div  
                    key={tarefa.id} 
                    tabIndex={1} 
                    className="tarefa-box" 
                    style={tarefa.finalizada? {borderLeft:"6px solid green"}: {borderLeft: "6px solid red"}}
                    aria-label={tarefa.finalizada?"Tarefa Finalizada":"Tarefa Não Finalizada"}>          
                    
                        <p style={{textAlign:"left", width:"100%"}}>
                            {tarefa.titulo}
                        </p>

                        <div className="grid-botoes" >
                            
                            <button 
                            aria-label="exibir detalhes" 
                            tabIndex="1" 
                            className="botao-grid" 
                            onClick={() => {exibir_detalhes_tarefa(tarefa.id)}}>
                                <AiOutlinePlus/>
                            </button>
            
                            <button 
                            aria-label="excluir tarefa" 
                            tabIndex="1" 
                            className="botao-grid" 
                            onClick={() => {excluir_tarefa(tarefa.id)}} >
                                <CgClose/>
                            </button>
                    
                                    
                        </div>

                    </div>            
                                
        
                    )
                )}

            </div>
        </>
    )


}

export default TelaTarefas



