import React, { Component } from 'react'
import { connect } from 'react-redux'

 class Gasto extends Component {


    eliminarGasto = e => {
        fetch("http://xpense.develotion.com/gastos.php", 
        {
          method: "DELETE",
          headers: {apikey: localStorage.getItem("apiKey")},
          body:JSON.stringify({idGasto: this.props.id})
        })
        .then((r)=>{
            return r.json();
        })
        .then(respuesta =>{
            if(respuesta.codigo === 200){
                let gasto = this.props.gastos.filter(g => g.id == respuesta.idGasto)
                gasto = gasto[0]
                this.props.dispatch({type:"RESTAR_RUBROS_INFO", payload:gasto})
                this.props.dispatch({type:"ELIMINAR_GASTO", payload:respuesta.idGasto})
            }
        })
    } 

    render() {
        return (
                <tr>
                    <td>{this.props.nombre}</td>
                    <td>$ {this.props.monto}</td>
                    <td><input type="button" className ="btn btn-primary btn-sm" value="Eliminar" onClick = {this.eliminarGasto}/></td>
                </tr>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    gastos: state.gastos
})


export default connect(mapStateToProps)(Gasto)
