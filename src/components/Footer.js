import React, { Component } from 'react'
import {Navbar, Col} from "reactstrap"

class Footer extends Component {
    render() {
        return (
            <div>
                <div>
                <Navbar color="primary" light expand="md" className ="shadow-lg navbar fixed-bottom">
                        <Col  sm={{ size: 9, offset:2}}>
                            <h6 className= "text-white text-center">© Mis Gastos App 2020 - Taller de Front End ORT - Bruno Mendez, Nicolás Wolman</h6>
                        </Col>              
                </Navbar> 
                <br/>  
            </div>
            </div>
        )
    }
}

export default Footer
