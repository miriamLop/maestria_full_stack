//pagina de filtros

import React from "react";

import { withRouter } from 'react-router-dom';

// css
import '../assetss/css/Nuevo.css';

// importando url de servicios
import { Apiurl } from '../services/apirest';

// importanto axios para hacer POST, GET
import axios from 'axios';

import Header from "../template/Header";

import { HttpStatusCode } from "axios";

// js
//import '../assetss/js/Nuevo.js';

class RegistrarTarea extends React.Component {

    constructor(props) {
        super(props);
    }

    // state para enlazar los input de formulario
    state = {
        form: {
            "titulo": "",
            "descripcion": "",
            "estado": "",
            "flimite": "",
            "usuarioId": ""
        },
        error: false,
        errorMsg: "",
        success: false,
        sucessMsg: "",
    }

    // manejador de evento que evita recargar la pagina completa
    manejadorSubmit = (params) => {
        params.preventDefault();
    }

    //(enf)
    // metodo que permite capturar los valores desde los imputs
    // asi que se tiene que colocar en los imputs
    manejadorChange = async (e) => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form);
    }

    //metodo para registrar
    manejadorBoton =  (params) => {
        console.log("Boton enviado...");

        let url = Apiurl + "/tareas"
        console.log('url registro tarea ', url);
        //obteniendo el id del usuario
        const idUser = localStorage.getItem('id');
        const estado = "Pendiente";
        console.log('id usuario', idUser);
        axios.post(url, {
            titulo: this.state.form.titulo,
            descripcion: this.state.form.descripcion,
            estado: estado,
            flimite: this.state.form.flimite,
            usuarioId: idUser
        })
            .then(
                response => {
                    console.log(response);

                    console.log("response.status: ", response.status);
                    if (response.status === HttpStatusCode.Created) {
                        console.log("Registro correcto.");
                        this.setState({
                            success: true,
                            sucessMsg: "Registro correcto.",
                            error: false,
                            errorMsg: "",
                            form: {
                                "titulo": "",
                                "descripcion": "",
                                "estado": "",
                                "flimite": "",
                                "usuarioId": ""

                            }
                        })
                    } else {
                        this.setState({
                            success: false,
                            sucessMsg: "",
                            error: true,
                            errorMsg: "Error de registro."
                        })
                    }

                })
            .catch((error) => {

                console.log("Error: ", error)
                if (error.response) {
                    console.log("Error: ",)
                }
                if (error.request) {

                }
                if (error.message) {

                }
                console.log("Error: ",)
            })
        console.log("Boton enviado...");



    }

    render() {
        return (
            <React.Fragment>

                <Header>

                </Header>
                <br />
                <br />
                <div >
                    <div className="row">
                        <div className="container" >

                            <form className="form-signin" role="form" onSubmit={this.manejadorSubmit}>
                                <h3 className="form-signin-heading">Registro de Tarea</h3>

                                <input type="text" className="form-control" name="titulo" placeholder="Titulo" required autofocus onChange={this.manejadorChange} />
                                <input type="text" className="form-control" name="descripcion" placeholder="Descripcion" required autofocus onChange={this.manejadorChange} />
                                <input type="text" className="form-control" name="estado" value="Pendiente" readOnly required autofocus onChange={this.manejadorChange} />
                                <input type="text" className="form-control" name="flimite" placeholder="aaaa-mm-dd" required autofocus onChange={this.manejadorChange} />

                                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.manejadorBoton} >Guardar</button>
                            </form>
                        </div>
                    </div>
                    {this.state.success === true &&
                        <div className="alert alert-primary" role="alert">
                            {this.state.sucessMsg}
                        </div>
                    }
                    {this.state.error === true &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsg}
                        </div>
                    }
                </div>

            </React.Fragment>
        );
    }

}

export default withRouter(RegistrarTarea);