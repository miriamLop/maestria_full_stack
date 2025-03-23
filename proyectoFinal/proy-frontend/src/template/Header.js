import React from "react";

class Header extends React.Component {
    render() {

        return (
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="/registrarTarea" >Registrar Tarea</a>
                <a className="navbar-brand" href="/dashboard" >Listar Tareas</a>
                <a className="navbar-brand" href="/nuevo" >Registrar Usuarios</a>
                <a className="navbar-brand" href="/usuarios">Listar Usuarios</a>
                
            </nav>
            
        );

    }
}

export default Header;