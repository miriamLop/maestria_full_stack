import React from "react";

import { withRouter } from 'react-router-dom';

import Header from "../template/Header";
// importando url de servicios
import { Apiurl } from '../services/apirest';
// importanto axios para hacer POST, GET
import axios from 'axios';


class DashboardUsuario extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        usuarios: []
    }

    clickTarea(id) {
        console.log(id);
        window.location.href = "/usuarios/editar/"+id;
    }

    componentDidMount() {

        console.log("Cargando usuarios");
        let url = Apiurl + "/usuarios/";

        axios.get(url)
            .then(
                response => {
                    console.log(response);

                    this.setState({
                        usuarios: response.data
                    })

                })

    }

    render() {
        return (
            <React.Fragment>
                <Header>

                </Header>

                <div  >
                    <br /><br />
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">email</th>
                                <th scope="col">Fecha Creacion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.usuarios.map(
                                    (value, index) => {
                                        return (
                                            <tr key={index} onClick={() => this.clickTarea(value.id)}>
                                                <td >{value.id}</td>
                                                <td>{value.nombre}</td>
                                                <td>{value.email}</td>
                                                <td>{value.createAt}</td>
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

export default withRouter(DashboardUsuario);