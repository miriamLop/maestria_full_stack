import React from "react";
import { withRouter } from 'react-router-dom';

class EditarUsuario extends React.Component {

    constructor(props){
        super(props);
    }
    componentDidMount(){
        let usuarioId=this.props.match.params.id;
        console.log("usuarioId: ", usuarioId);


        
    }

    render () {
        return(
            <div>
                Hola desde Editar Usuario: 

            </div>
        );
    }

}

export default withRouter(EditarUsuario);