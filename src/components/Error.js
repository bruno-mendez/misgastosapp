import React, { Component } from 'react'
import {Link} from "react-router-dom";
import {Col, Row} from "reactstrap"

class Error extends Component {
    
    render() {
        return (
            <div>
                <br/><br/><br/>
                <Row>
                    <Col md={{ size: 12}}>
                        <h3 className ="text-primary mt-5 mb-3 text-center">Ops, camino incorrecto! La pagina ingresada no existe! <br/><br/><Link to="/"><input type="button" className ="btn btn-secondary text-center " value="Ir a Pagina Principal"/></Link> </h3>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Error
