import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Row, Col, Form, FormGroup, Label, Input, Alert } from "reactstrap";

class Agregar extends Component {

    constructor(){
        super();
        this.nombre = React.createRef();
        this.monto = React.createRef();
        this.state = {rubro:"",
                    mensaje: "",
                    alertOpen: false,
                    alertColor: "danger"
        }
    }

    onChange = (event) => {
        this.setState({ rubro: event.target.value });
    };

    ocultarAlert = (event) =>{
        this.setState({ alertOpen: false });
    }
   
    agregarGasto = e => {
        if (this.nombre.current.value ==="" || this.monto.current.value==="" || this.state.idRubro===""){
            this.setState({
                mensaje: 'Debe completar todos los campos del formulario',
                alertOpen:true,
                alertColor: "danger"
          });
        }else {
            fetch("http://xpense.develotion.com/gastos.php", 
            {
            method: "POST",
            headers: {apikey: localStorage.getItem("apiKey")},
            body:JSON.stringify({nombre:this.nombre.current.value, monto:this.monto.current.value, idUsuario:this.props.user.id, idRubro: this.state.idRubro})
            })
            .then(r=>r.json())
            .then(respuesta =>{
                let gasto =
                    {
                        id: respuesta.idGasto,
                        nombre:this.nombre.current.value, 
                        monto:this.monto.current.value, 
                        idUsuario:this.props.user.id, 
                        rubro: this.state.rubro
                    }
                if(respuesta.codigo === 200){
                    this.setState({
                        mensaje: "¡Gasto agregado!",
                        alertOpen:true,
                        alertColor:"success"
                  });
                    this.nombre.current.value ="";
                    this.monto.current.value ="";
                    this.props.dispatch({type:"AGREGAR_GASTO", payload:gasto})
                    this.props.dispatch({type:"SUMAR_RUBROS_INFO", payload:gasto})
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
        return (
            <div>
                <Container>
                <Row>
                    <Col>
                       <h1 className = "text-primary">Agregar Gasto</h1> 
                        <Form>
                        <FormGroup>
                            <Label for="nombreGasto">Nombre Gasto</Label>                      
                            <Input
                                type="text"
                                name="nombreGasto"
                                id="nombreGasto"
                                placeholder="nombre del gasto"
                                innerRef={this.nombre}
                                onChange ={this.ocultarAlert}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="monto">Monto ($)</Label>                      
                            <Input
                                type="number"
                                name="monto"
                                id="monto"
                                placeholder="ingresa el monto en $"
                                innerRef={this.monto}
                                onChange ={this.ocultarAlert}
                            />
                        </FormGroup>
                        <Label for="seletMulti">Selecciona el Rubro</Label>
                        <Input type="select" name="selectMulti" id="selectMulti" onChange= {this.onChange} multiple>
                            {this.props.rubros.map((rubro,i) => <option value = {rubro.id} key ={i} ref = {this.rubro}>{rubro.nombre}</option>)}
                        </Input><br/>
                        <Button color="primary"value="Agregar" size ="lg" onClick={this.agregarGasto}block>Agregar</Button> <br/>
                        <Alert timeout ={3000} color={this.state.alertColor} isOpen={this.state.alertOpen}>{this.state.mensaje} </Alert>
                        </Form>      
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    rubros: state.rubros,
    user: state.user,
    gastos: state.gastos,
    rubrosInfo: state.rubrosInfo
})


export default connect(mapStateToProps)(Agregar)
