import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gasto from "./Gasto"
import {Table} from "reactstrap"

class Listar extends Component{

cargarGastos = e => {
  fetch(`http://xpense.develotion.com/gastos.php?id=${this.props.user.id}`, 
  {
    method: "GET",
    headers: {apikey: localStorage.getItem("apiKey"),
      'Cache-Control': 'no-cache'}
  })
  .then(r=>r.json())
  .then(respuesta =>{
      if(respuesta.codigo === 200){
      this.props.dispatch({type:"CARGAR_GASTOS", payload:respuesta.gastos})
      this.cargarRubros()
      }
  })
}

cargarRubros = e => {
  fetch("http://xpense.develotion.com/rubros.php", 
  {
    method: "GET",
    headers: {apikey: localStorage.getItem("apiKey")},
  })
  .then(r=>r.json())
  .then(respuesta =>{
      this.props.dispatch({type:"CARGAR_RUBROS", payload:respuesta.rubros})
      respuesta.rubros.forEach(element => {
          let infoRubro = {
              idRubro: element.id,
              nombre: element.nombre,
              cantidad: this.props.gastos.filter(gasto => Number(gasto.rubro) == element.id).length,
              total: this.props.gastos.filter((gasto)=>  Number(gasto.rubro) == element.id).reduce((acc, val) => {return acc + Math.round(val.monto);}, 0)
          };
          this.props.dispatch({type:"CARGAR_IMPORTE_RUBRO", payload:infoRubro})
      });
      
  })
}

componentDidMount(){
 this.cargarGastos()  
}

  render(){
    return (
      <div>
        <h2 className = "text-primary text-center">Lista de Gastos</h2>
        <Table dark striped responsive >
        <thead>
              <tr> 
                  <th> Nombre del gasto</th>
                  <th> Monto </th>
              </tr>                 
        </thead>
        <tbody>
          {(this.props.gastos.length !== 0)?
          this.props.gastos.slice(Math.max(this.props.gastos.length - 10, 0)).map((gasto,i) => <Gasto key ={i}{...gasto}/>):
        <tbody><tr><td>No hay gastos</td></tr></tbody>}
        </tbody>
        </Table>
      </div>
     );
  }
}

const mapStateToProps = (state) => ({
    gastos: state.gastos,
    user: state.user
})

export default connect(mapStateToProps)(Listar)

