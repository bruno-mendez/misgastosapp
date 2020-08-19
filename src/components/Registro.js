import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {Link} from "react-router-dom";
import { Badge, Button, Container, Row, Col, Form, FormGroup, Label, Input, Alert } from "reactstrap";

class Registro extends Component {

    constructor(){
        super();
        this.usuario = React.createRef();
        this.password = React.createRef();
        this.state = {mensaje: "",
                    alertOpen: false,
                    alertColor: ""}
    }

    procesarRegistro = e =>{
        if (this.usuario.current.value ==="" || this.password.current.value===""){
            this.setState({
                mensaje: 'Debes completar todos los campos',
                alertOpen:true,
                alertColor: "danger"
          });
        }else {
        fetch("http://xpense.develotion.com/usuarios.php",
        {
            method:"POST",
            body:JSON.stringify({usuario:this.usuario.current.value, password:this.password.current.value})
        }).then(r=>{
            console.log(r.status)
            return r.json()
        })
        .then(respuesta => {
            if(respuesta.codigo === 200){
                this.setState({
                    mensaje: "Registro existoso",
                    alertOpen:true,
                    alertColor: "success"
              });
                this.props.dispatch({type:"REGISTRO", payload:respuesta.id})
            }
            else{
                this.setState({
                    mensaje: respuesta.mensaje,
                    alertOpen:true,
                    alertColor: "danger"
              });
            }
            
         })
        } 
    }

    render() {
        if(this.props.login) return <Redirect to="/dashboard"/>
        return (
            <div>
                <Container>
                <Row>
                    <Col className= "mt-5" sm="12" md={{ size: 6, offset: 3 }}>
                       <h1><Badge className= "mt-5"color="primary">Registro</Badge></h1> 
                        <Form>
                        <FormGroup>
                            <Label for="usuario">Usuario</Label>                      
                            <Input
                                type="text"
                                name="email"
                                id="usuario"
                                placeholder="Usuario"
                                innerRef={this.usuario}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="pass">Contraseña</Label>                      
                            <Input
                                type="password"
                                name="pass"
                                id="usuario"
                                placeholder="Contraseña"
                                innerRef={this.password}
                            />
                        </FormGroup><br/>
                        <Button color="primary"value="Ingresar" size ="lg" onClick={this.procesarRegistro} block>Registrarse</Button> <br/>
                        <Alert color={this.state.alertColor} isOpen={this.state.alertOpen}>{this.state.mensaje}</Alert><br/>
                        <Link to="/"><input type="button" className ="btn btn-secondary" value="¿Ya estás registrado? Ir a Login"/></Link>
                        </Form>      
                        <br/> <br/>
                    </Col>
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


export default connect(mapStateToProps)(Registro)
