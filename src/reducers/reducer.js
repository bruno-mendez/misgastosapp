import estadoInicial from "../estadoInicial";

function reducer(state = estadoInicial, action){
    let idRubroPay, monto,rubroActualizado,rubrosRestantes, miNuevoRubro;
    switch(action.type){
         case "INGRESAR":
            return {...state,user:action.payload,login:true}
          case "REGISTRO":
            return {...state,user:action.payload}
          case "LOGOUT":
            return {...state = estadoInicial}
          case "CARGAR_GASTOS":
            return {...state, gastos: action.payload
            }
          case "CARGAR_RUBROS":
            return {...state, rubros: action.payload}
          case "AGREGAR_GASTO":
            return {...state, gastos:[...state.gastos, action.payload] }
          case "ELIMINAR_GASTO":
            return { ...state, gastos: [...state.gastos.filter(i => i.id !== action.payload )]};
          case "CARGAR_IMPORTE_RUBRO":
            return {...state, rubrosInfo: [...state.rubrosInfo, action.payload] }
          case "SUMAR_RUBROS_INFO":
            idRubroPay = action.payload.rubro;
            monto = action.payload.monto;
            rubroActualizado = [...state.rubrosInfo.filter(e => e.idRubro === idRubroPay)]
            rubrosRestantes = [...state.rubrosInfo.filter(e => e.idRubro !== idRubroPay)];
            rubroActualizado[0].total = rubroActualizado[0].total+Number(monto);
            rubroActualizado[0].cantidad = rubroActualizado[0].cantidad+1;
            miNuevoRubro = rubroActualizado[0];
            rubrosRestantes.push(miNuevoRubro);
            return { ...state, rubrosInfo: rubrosRestantes};
          case "RESTAR_RUBROS_INFO":
              idRubroPay = action.payload.rubro;
              monto = action.payload.monto;
              rubroActualizado = state.rubrosInfo.filter(e => e.idRubro == idRubroPay)
              rubrosRestantes = [...state.rubrosInfo.filter(e => e.idRubro != idRubroPay)];
              rubroActualizado[0].total = rubroActualizado[0].total-Number(monto);
              rubroActualizado[0].cantidad = rubroActualizado[0].cantidad-1;
              miNuevoRubro = rubroActualizado[0];
              rubrosRestantes.push(miNuevoRubro);
              return { ...state, rubrosInfo: rubrosRestantes};
      default:
        return state;
    }
  }
  export default reducer;
