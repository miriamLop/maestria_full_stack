import React from "react";

import { withRouter } from 'react-router-dom';

// css
import '../assetss/css/Login.css';

// importando imagen
import logo from '../assetss/img/react.png';

// importando url de servicios
import { Apiurl } from '../services/apirest';

// importanto axios para hacer POST, GET
import axios from 'axios';

//import { useHistory } from "react-router-dom";

class Login extends React.Component {

    /*constructor(props){
        super(props);
    }*/

    // state para enlazar los input de formulario
    state = {
        form: {
            "email": "",
            "password": ""
        },
        error: false,
        errorMsg: ""
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

        //const history = useHistory();
        //history.push("nuevo");
        console.log("Boton enviado...");

        let url = Apiurl + "/login"
        //let url = Apiurl + "/usuarios"

        axios.post(url, this.state.form, {headers: { "Content-Type": "application/json" }} )
            .then(
                response => {
                    console.log(response);
                    console.log("status: ", response.data.status);
                    if(response.data.status === "ok"){
                        // autenticacion correcta
                        // almacenar el token
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('id', response.data.id);
                        console.log("Autenticacion correcta.");

                        // redireccionando a otra pagina
                        //this.props.history.push('/nuevo');
                        window.location.href = "/dashboard";

                    } else {
                        this.setState({
                            error: true,
                            errorMsg: response.data.message
                        })
                    }

                })
            .catch((error) => {

                console.log("Error: ", error)
                if(error.response){
                    console.log("Error: ", )
                }
                if(error.request){

                }
                if(error.message){

                }
                console.log("Error: ", )
            })

        /*axios.get(url)
            .then(
                response => {
                    console.log("Respuesta: ", response);
                }
            );*/

        console.log("Boton enviado...");


    }


    // manejador de evento que evita recargar la pagina completa
    manejadorSubmit = (params) => {
        params.preventDefault();
    }


    render() {
        return (
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">

                        <div className="fadeIn first">
                            <br />
                            <br />
                            <img src={logo} width="100px" alt="User Icon" />
                            <br />
                            <br />
                        </div>

                        <form onSubmit={this.manejadorSubmit} >
                            <input type="text" className="fadeIn second" name="email" placeholder="Usuario" onChange={this.manejadorChange} />
                            <input type="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.manejadorChange} />
                            <input type="submit" className="fadeIn fourth" value="Log In" onClick={ this.manejadorBoton } />
                        </form>

                        {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMsg}
                            </div>
                        }

                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default  withRouter(Login);;
