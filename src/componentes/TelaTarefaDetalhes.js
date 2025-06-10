import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import "./Tarefa.css"
import useTarefa_Mysql from "../hooks/useTarefa_Mysql";
import useTarefa_Firebase from "../hooks/useTarefa_Firebase";


const TelaTarefaDetalhes = () => {

    const location = useLocation()

    const tarefa = location.state || {}

    const navigate = useNavigate();

    const handle_buttonClick_voltar = () => {
        navigate(-1)
    }

    const [input_tituloTarefa, setInput_tituloTarefa] = useState(tarefa.titulo) 
    
    const [radio_finalizada, setRadio_Finalizada] = useState(tarefa.finalizada);

    const {alterar_tarefa} = useTarefa_Firebase()

    const handle_buttonClick_alterar = () => {
        const tarefa_editada = {...tarefa, titulo: input_tituloTarefa, finalizada: radio_finalizada}
        alterar_tarefa(tarefa_editada)
        navigate("/tarefas")
      }

        
    return (
        <>

        <div className="box" >

            <h4 style={{textAlign:"center"}} tabIndex={1}> Tela de Detalhamento - Tarefa </h4>


           <div style={{display:"flex",alignItems: "center", gap:"8px", padding:"10px"}}>
            <strong tabIndex={1}>Título:</strong> 
            <input type="text" aria-label="título" value={input_tituloTarefa}
             tabIndex={1}
            onChange={(campo)=>{setInput_tituloTarefa(campo.target.value)}} ></input>
           </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <strong tabIndex={1}>Finalizada:</strong>
            <label>
                <input tabIndex={1}
                    name="finalizada"
                    type="radio"
                    aria-label="finalizada sim"
                    //value={1}
                    //checked={radio_finalizada === 1}
                    value={true}
                    checked={radio_finalizada === true}
                    onChange={(campo)=>{
                        setRadio_Finalizada(JSON.parse(campo.target.value))
                    }}
                />
                <span>Sim</span>
            </label>

            <label>
                <input tabIndex={1}
                    type="radio"
                    name="finalizada"
                    aria-label="finalizada não"
                    value={0}
                    checked={radio_finalizada === 0}
                    //value={false}
                    //checked={radio_finalizada === false}
                    onChange={(campo)=>{
                        setRadio_Finalizada(JSON.parse(campo.target.value))
                    }}
                />
                <span>Não</span>
            </label>

            </div>

                <button tabIndex={1} onClick={()=>{handle_buttonClick_alterar()}}>Alterar</button>
                &nbsp;
                <button tabIndex={1} onClick={()=>{handle_buttonClick_voltar()}}>Voltar</button>
            </div>

        </>
    )


}

export default TelaTarefaDetalhes