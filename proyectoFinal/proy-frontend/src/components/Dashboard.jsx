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
        tareas: []
    }

    clickTarea(id) {
        console.log(id);
        //this.props.history.push("/editar/"+id);
        window.location.href = "/editar/"+id;
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

    render() {
        return (
            <React.Fragment>
                <Header>

                </Header>

                <div className="container" >
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