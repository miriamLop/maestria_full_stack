import React from "react";
import { withRouter } from 'react-router-dom';
import { Apiurl } from "../services/apirest";
//librerias
import axios from 'axios';
//templete
import Header from '../template/Header';

class Editar extends React.Component {

    constructor(props) {
        super(props);
    }

    // state para enlazar los input de formulario
    state = {
        form: {
            "id": 0,
            "titulo": "",
            "descripcion": "",
            "estado": "",
            "flimite": ""
        },
        error: false,
        errorMsg: "",
        success: false,
        successMsg: ""
    }

    componentDidMount() {
        let tareaId = this.props.match.params.id;
        let url = Apiurl + "/tareas/" + tareaId;
        //console.log("tareaId: ", tareaId);
        //console.log("url: ", url);
        axios.get(url)
            .then(response => {
                //console.log(response);
                //console.log(response.data);
                console.log(response.data.titulo);
                this.setState({
                    form: {
                        id: response.data.id,
                        titulo: response.data.titulo,
                        descripcion: response.data.descripcion,
                        estado: response.data.estado,
                        flimite: response.data.flimite
                    }

                })
            });
    }

    // manejador de evento que evita recargar la pagina completa
    manejadorSubmit = (params) => {
        params.preventDefault();
    }

    //(enf)
    // metodo que permite capturar los valores desde los inputs
    // asi que se tiene que colocar en los imputs
    manejadorChange = async (e) => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        //console.log(this.state.form);
    }
    manejadorEliminar = async (e) => {
        let tareaId = this.props.match.params.id;
        let url = Apiurl + "/tareas/" + tareaId
        let datos = {
            "token": localStorage.getItem("token"),
            "tareaId": tareaId
        }
        console.log(datos);
        axios.delete(url, { headers: datos })
            .then(response => {
                window.location.href = "/dashboard";
            })

    }

    manejadorModificar = async (e) => {
        //const history = useHistory();
        //history.push("nuevo");
        console.log("Boton enviado...");
        let tareaId = this.props.match.params.id;

        let url = Apiurl + "/tareas/" + tareaId
        //let url = Apiurl + "/usuarios"

        axios.put(url, this.state.form, { headers: { "Content-Type": "application/json" } })
            .then(
                response => {
                    console.log(response);
                    console.log("status: ", response.data.status);

                    this.setState({
                        success: true,
                        successMsg: "Modificacion correcta."
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

        /*axios.get(url)
            .then(
                response => {
                    console.log("Respuesta: ", response);
                }
            );*/

        console.log("Boton enviado...");
    }


    render() {
        const form = this.state.form;

        return (
            <React.Fragment>
                <Header />
                <div  >
                    <h3> Editar Tarea</h3>

                </div>
                <div >
                    <form className="form-horizontal" onSubmit={this.manejadorSubmit} >

                        <div className="row">
                            <div className="col-sm-12">
                                <label className="col-md-2 control-label">Titulo</label>
                                <div className="col-md-10">
                                    <input className="form-control" name="id" placeholder="ID" type="text"
                                        value={form.id} readOnly />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <label className="col-md-2 control-label">Titulo</label>
                                <div className="col-md-10">
                                    <input className="form-control" name="titulo" placeholder="Titulo" type="text"
                                        value={form.titulo} onChange={this.manejadorChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <label className="col-md-2 control-label">Descripcion</label>
                                <div className="col-md-10">
                                    <input className="form-control" name="descripcion" placeholder="Descripcion" type="text"
                                        value={form.descripcion} onChange={this.manejadorChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <label className="col-md-2 control-label">Estado</label>
                                <div className="col-md-10">
                                    <input className="form-control" name="estado" placeholder="Estado" type="text"
                                        value={form.estado} onChange={this.manejadorChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <label className="col-md-2 control-label">Fecha Limite</label>
                                <div className="col-md-10">
                                    <input className="form-control" name="flimite" placeholder="Fecha Limite" type="text"
                                        value={form.flimite} onChange={this.manejadorChange} readOnly />
                                </div>
                            </div>
                        </div>

                        <br />
                        {this.state.success === true &&
                            <div className="alert alert-primary" role="alert">
                                {this.state.successMsg}
                            </div>
                        }
                        <br />

                        <button type="submit" className="btn btn-primary" style={{ marginRight: "10px" }} onClick={this.manejadorModificar} >Modificar</button>
                        <button type="submit" className="btn btn-danger" style={{ marginRight: "10px" }} onClick={this.manejadorEliminar}>Eliminar</button>
                        <a className="btn btn-dark" href="/dashboard">Salir</a>

                    </form>

                </div>

            </React.Fragment>
        );
    }

}

export default withRouter(Editar);