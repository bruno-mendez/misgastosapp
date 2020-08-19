import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Table} from "reactstrap"
import {Line} from "react-chartjs-2"

class CantidadPorRubro extends Component {

    render() {

        const data = {
            labels: this.props.rubrosInfo.map(importe_rubro => importe_rubro.nombre),
            datasets: [
              {
                label: 'Cantidad X Rubro',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.props.rubrosInfo.map(importe_rubro => importe_rubro.cantidad),
              }
            ]
          };


        return (
            <div>
                
                <h2  className = "text-primary text-center">Gráfica Cantidad por Rubro</h2>
                <Line data={data} /> <hr/> <br/>
                <h2 className = "text-primary text-center">Cantidad por Rubro</h2>
                <Table dark striped>
                    <thead>
                        <tr> 
                            <th> Rubro</th>
                            <th> Compras por Rubro</th>
                        </tr>
                       
                    </thead>
                    <tbody> 
                    {(this.props.rubrosInfo.length !== 0)?            
                    this.props.rubrosInfo.map((el_rubro,i) => <tr key ={i}><td>{el_rubro.nombre}</td><td>{el_rubro.cantidad}</td></tr>):
                    <tr><td>No hay Compras por Rubro</td></tr>}
                     </tbody>
                </Table>
               
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    rubros: state.rubros,
    gastos: state.gastos,
    rubrosInfo: state.rubrosInfo

})



export default connect(mapStateToProps)(CantidadPorRubro)
