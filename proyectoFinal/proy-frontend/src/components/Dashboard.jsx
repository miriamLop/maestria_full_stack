import React from "react";

import { withRouter } from 'react-router-dom';

import Header from "../template/Header";
// importando url de servicios
import { Apiurl } from '../services/apirest';
// importanto axios para hacer POST, GET
import axios from 'axios';


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        form: {
            "titulo2": ""
        },
        error: false,
        errorMsg: "",
        tareas: []
    }

    clickTarea(id) {
        console.log(id);
        //this.props.history.push("/editar/"+id);
        window.location.href = "/editar/" + id;
    }

    componentDidMount() {

        let id = localStorage.getItem('id');

        console.log("ID: ", id);
        let url = Apiurl + "/usuarios/tarea/" + id;

        axios.get(url)
            .then(
                response => {
                    console.log(response);

                    this.setState({
                        tareas: response.data
                    })

                })

    }

    // manejador de evento que evita recargar la pagina completa
    manejadorSubmit = (params) => {
        params.preventDefault();
    }

    //(enf)
    // metodo que permite capturar los valores desde los inputs y  los adiciona al state
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

    manejadorBoton = (params) => {
        let url = Apiurl + "/tareas/titulo"
        console.log('url registro tarea ', url);
        //para llamar al metodo de backend
        const userId = localStorage.getItem('id');
        const titulo2 = this.state.form.titulo2;
        console.log(userId, " == ", titulo2);
        axios.post(url, { titulo2: titulo2, usuarioId: userId })
            .then(
                response => {
                    console.log('tareas listadas por titulo', response);
                    console.log("status: ", response.data.status);
                    this.setState({
                        tareas: response.data
                    })


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

    }

    render() {
        return (
            <React.Fragment>
                <Header>

                </Header>

                <div >
                    <br /><br />

                    <div >

                        <form role="form" onSubmit={this.manejadorSubmit} >
                            <input type="text" className="titulo2" name="titulo2" placeholder="Titulo" onChange={this.manejadorChange} />
                            <input type="submit" className="fadeIn fourth" value="buscar" onClick={this.manejadorBoton} />
                        </form>
                    </div>

                    <br /><br />

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tareas.map(
                                    (value, index) => {
                                        return (
                                            <tr key={index} onClick={() => this.clickTarea(value.id)}>
                                                <td >{value.id}</td>
                                                <td>{value.titulo}</td>
                                                <td>{value.descripcion}</td>
                                                <td>{value.estado}</td>
                                                <td>{value.flimite}</td>
                                            </tr>
                                        )
                                    }
                                )
                            }


                        </tbody>
                    </table>
                </div>

            </React.Fragment>
        );
    }

}

export default withRouter(Dashboard);