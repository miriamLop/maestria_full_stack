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

class Nuevo extends React.Component {

    constructor(props) {
        super(props);
    }

    // state para enlazar los input de formulario
    state = {
        form: {
            "nombre": "",
            "email": "",
            "password": ""
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

    //enf
    manejadorBoton = (params) => {
        console.log("Boton enviado...");

        let url = Apiurl + "/registrar"
        axios.post(url, this.state.form)
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
                                "nombre": "",
                                "email": "",
                                "password": ""
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

                }
            );

    }

    render() {
        return (
            <React.Fragment>

                <Header>

                </Header>
                <br/>
                <br/>
                <div >
                    <div className="row">
                        <div className="container" >

                            <form className="form-signin" role="form" onSubmit={this.manejadorSubmit}>
                                <h3 className="form-signin-heading">Registro de Usuario</h3>

                                <input type="text" className="form-control" name="nombre" placeholder="Nombre" required autofocus onChange={this.manejadorChange} />
                                <input type="email" className="form-control" name="email" placeholder="Email" required onChange={this.manejadorChange} />
                                <input type="password" className="form-control" name="password" placeholder="Password" required onChange={this.manejadorChange} />
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

export default withRouter(Nuevo);