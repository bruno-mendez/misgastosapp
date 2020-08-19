import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ListarGastos from "./ListarGastos"
import AgregarGasto from './AgregarGasto'
import ImportesDeRubro from "./ImportesDeRubro"
import CantidadPorRubro from "./CantidadPorRubro"
import EstadisticasGenerales from "./EstadisticasGenerales"
import {Container,Row,Col, Badge} from "reactstrap"


export class Dashboard extends Component {

    render() {
        if(!this.props.login) return <Redirect to="/"/>
        return (
            <div>
                <br/>
                <Container>
                    <Row className= "pb-2 mt-5">
                        <Col md={{ size: 6, offset: 3}}>
                        <h1><Badge color="primary"  className = "d-flex justify-content-center">Mi Dashboard</Badge></h1> 
                        </Col>                       
                    </Row>
                    <Row className= "pb-4 ">
                        <Col md={{ size: 6}} lg={{ size: 4}} className ="border border-primary rounded">
                        <AgregarGasto/>
                        </Col>
                       
                        <Col  md={{ size: 6}} lg={{ size: 4}} className ="border border-primary rounded">
                        <ListarGastos/>
                        </Col>       
                        <Col md={{ size: 6}} lg={{ size: 4}} className ="border border-primary rounded">
                        <EstadisticasGenerales/>
                        </Col>                   
                    </Row>
                    <Row>
                        <Col md={{ size: 6 }}className ="border border-primary rounded">
                        <ImportesDeRubro/>
                        </Col>
                       
                        <Col md={{ size: 6}}className ="border border-primary rounded">
                        <CantidadPorRubro/>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </Container>              
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
     login:state.login,
     user:state.user
})


export default connect(mapStateToProps)(Dashboard)
