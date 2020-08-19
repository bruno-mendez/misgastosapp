import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  Navbar, NavbarBrand, Button, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import Logo from '../img/misgastosapp_logo.png'

class Header extends Component {

    logout = e =>{
        localStorage.clear();
        this.props.dispatch({type:"LOGOUT"})
        return <Redirect to="/"/>
        
    }
    render() {
        let button ="";
        if(this.props.login===true){
            button = <Button color="secondary" onClick={this.logout}>Cerrar sesión</Button>
        }
        return (
            <div>
                <Navbar className = "shadow-lg navbar fixed-top" color="primary" light expand="md">
                        <Col  xs={{ size: 9}}>
                        <NavbarBrand><img src= {Logo} alt= "logo" width = '20%'></img></NavbarBrand>
                        </Col >
                        <Col  xs={{ size: 3}}>
                        {button}
                        </Col>              
                </Navbar> 
                <br/>  
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    login:state.login,
})

export default connect(mapStateToProps)(Header)