import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useUsuario from "../hooks/useUsuario";
import M from 'materialize-css';


const TelaMenu = () => {

  const {fazerLogout} = useUsuario()

  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }, []);

  return (
    <>
    <nav className="nav-wrapper blue darken-3" style={{ whiteSpace: 'nowrap'}}>
        <div>
            <a href="/tarefas" className="brand-logo" tabIndex={1} >App - Gestão de Tarefas</a>
            <a href="#" data-target="mobile-menu" className="sidenav-trigger" tabIndex={1}>
                <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
            
                <li>
                    <Link to="/" tabIndex={1}>Login</Link>
                </li>

                <li >
                    <Link to="/tarefas" tabIndex={1}>Tarefas</Link>
                </li>

                <li>
                    <Link to="#" onClick={fazerLogout} tabIndex={1}>Sair</Link>
                </li>

            </ul>
      </div>
    </nav>

    {/* SideNav para mobile */}


    <ul className="sidenav" id="mobile-menu" tabIndex={0} style={{ width: "200px" }} >


        {/* Ícone de fechar no início do menu */}
        <li>
                <a href="#!" className="sidenav-close">
                    <i className="material-icons" translate="no" aria-label="Fechar Menu">
                        close
                    </i>
                </a>
        </li>


        <li>
            <Link to="/"  >Login</Link>
        </li>

        <li >
            <Link to="/tarefas"  >Tarefas</Link>
        </li>

        <li>
            <Link to="#" onClick={fazerLogout}  >Sair</Link>
        </li>
    </ul>

    
    </>
    
  );
};

export default TelaMenu;
