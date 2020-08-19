import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Table} from "reactstrap"

 class EstadisticasGenerales extends Component {
     
    render() {
        return (
            <div>
                <h2 className = "text-primary text-center">Estadisticas Generales</h2>
                <Table dark striped>
                    <thead>
                        <tr> 
                            <th> Cantidad de Gastos</th>
                            <th> Monto total de todos los gastos</th>
                        </tr>
                       
                    </thead>
                    <tbody>                  

                        {(this.props.gastos.length !== 0)?
                        <tr><td>{this.props.gastos.length}</td><td>$ {this.props.gastos.reduce((acc, val) => {return acc + Math.round(val.monto);}, 0)}</td></tr>:
                        <tr><td>No hay gastos</td></tr>}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    gastos: state.gastos
    
})


export default connect(mapStateToProps)(EstadisticasGenerales)
