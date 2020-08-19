import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Table} from "reactstrap"
import {Pie} from "react-chartjs-2"

export class ImportesDeRubro extends Component {

     cargarImportesRubro = (importes) => {
        this.props.dispatch({type:"CARGAR_IMPORTE_RUBRO", payload: importes})
     }

    render() {
         
            const data = {
                labels:this.props.rubrosInfo.map(importe_rubro => importe_rubro.nombre)
              ,
                datasets: [{
                    data: this.props.rubrosInfo.map(importe_rubro => importe_rubro.total),
                    backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#219A21',
                    '#6A1F9A',
                    '#00D1CE',
                    '#EA8308'
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#219A21',
                    '#6A1F9A',
                    '#00D1CE',
                    '#EA8308'
                    ]
                }]
            };

          
        return (
            <div>
                <h2 className = "text-primary text-center"> Gráfica Monto por Rubro</h2>
               <Pie data={data} /> <br/> <hr/>
                <h2 className = "text-primary text-center">Monto por Rubro </h2>
                <Table dark striped className ="mb-5">
                    <thead>
                        <tr> 
                            <th> Rubro</th>
                            <th> Monto Total por Rubro </th>
                        </tr>
                       
                    </thead>
                    <tbody>
                    {(this.props.rubrosInfo.length !== 0)?            
                    this.props.rubrosInfo.map((el_rubro,i) => <tr key ={i}><td>{el_rubro.nombre}</td><td>$ {el_rubro.total}</td></tr>):
                    <tr><td>No hay Importes por Rubro</td></tr>}
                  
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

export default connect(mapStateToProps)(ImportesDeRubro)
