import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {Link} from "react-router-dom";
import { Badge, Button, Container, Row, Col, Form, FormGroup, Label, Input, Alert } from "reactstrap";

class Login extends Component {

    constructor(){
        super();
        this.usuario = React.createRef();
        this.password = React.createRef();
        this.state = {mensaje: "",
                    alertOpen: false}
    }

    componentDidMount(){
        let id = localStorage.getItem("id");
        let apikey = localStorage.getItem("apiKey");

        let usuarioActual = {
            id: id,
            apikey:apikey
        }

        if (apikey !== null || id !== null){
            this.props.dispatch({type:"INGRESAR", payload:usuarioActual})
        }

    }

    procesarLogin = e =>{
        if (this.usuario.current.value ==="" || this.password.current.value===""){
            this.setState({
                mensaje: 'Debes completar todos los campos',
                alertOpen:true
          });
        }else {
            fetch("http://xpense.develotion.com/login.php",
            {
                method:"POST",
                body:JSON.stringify({usuario:this.usuario.current.value, password:this.password.current.value})
            }).then(r=>{
                return r.json()
            })
            .then(respuesta => {
                if(respuesta.codigo === 200){
                    let usuarioActual = {
                        id:respuesta.id,
                        apiKey:respuesta.apiKey
                    }
                    localStorage.setItem("id", respuesta.id);
                    localStorage.setItem("apiKey", respuesta.apiKey);
                    this.props.dispatch({type:"INGRESAR", payload:usuarioActual})
    
                }
                else{
                    this.setState({
                        mensaje: respuesta.mensaje,
                        alertOpen:true
                  });
                }
             })
        }  
    }
    render() {
        if(this.props.login) return <Redirect to="/dashboard"/>
        return (
            <Container>
                <Row>
                    <Col className= "mt-5" sm="12" md={{ size: 6, offset: 3 } }>
                       <h1><Badge className= "mt-5"color="primary">Login</Badge></h1> 
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
                        <Button color="primary"value="Ingresar" size ="lg"onClick={this.procesarLogin}block>Ingresar</Button> <br/>
                        <Link to="/registro"><Button color="secondary" size="lg"block>Registrarse</Button></Link><br/> 
                        <Alert color="danger" isOpen={this.state.alertOpen}>{this.state.mensaje}</Alert>
                        </Form>      
                        <br/> 
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    login:state.login,
    user:state.user
})

export default connect(mapStateToProps)(Login)
