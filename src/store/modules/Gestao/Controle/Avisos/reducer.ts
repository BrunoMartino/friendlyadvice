import {
  ABRIRFECHARMENU,
  ABRIRFECHARMENUMAISAVISOS,
  ATUALIZARAVISOS,
  ATUALIZARAVISOS_LOTE,
  BUSCARTODOSAVISOS,
  DELETARMENSAGEM,
  ENVIARAVISOS,
  TOTALIZADORAVISOS,
  ORDENARDATAS,
  ENVIARAVISOSLOTE,
} from './actions';

const estadoInicial = {
  count: 0,
  abrir: false,
  abrirMaisAcoes: false,
  data: [
    {
      id: '',
      mensagem: '',
      lida: false,
      link: '',
      dataCriacao: '',
    },
  ],
  dataALL: [
    {
      id: '',
      mensagem: '',
      lida: false,
      link: '',
      dataCriacao: '',
    },
  ],
};

const avisosRetaguarda = (state = estadoInicial, action: any) => {
  switch (action.type) {
    case ENVIARAVISOS: {
      let newData: any;

      if (state.data.length === 1 && state.data[0].mensagem === '') {
        newData = [];

        newData.push({
          id: action.payload.id,
          mensagem: action.payload.mensagem,
          lida: action.payload.lida ? action.payload.lida : false,
          link: action.payload.link,
          dataCriacao: action.payload.dataCriacao,
        });
      } else {
        const idx = state.data.findIndex(
          (f: any) => f.id === action.payload.id,
        );

        newData = [...state.data];

        if (idx && idx === -1) {
          newData.push({
            id: action.payload.id,
            mensagem: action.payload.mensagem,
            lida: action.payload.lida ? action.payload.lida : false,
            link: action.payload.link,
            dataCriacao: action.payload.dataCriacao,
          });
        }
      }

      return {
        ...state,
        data: newData,
      };
    }
    case DELETARMENSAGEM: {
      let newData = [...state.data];
      newData = newData.filter((el: any) => el.id !== action.payload);

      return {
        ...state,
        data: newData,
      };
    }
    case ATUALIZARAVISOS: {
      let newData = [...state.data];
      let newDataALL = [...state.dataALL];
      const idx = state.data.findIndex((f: any) => f.id === action.payload.id);
      const idxALL = state.dataALL.findIndex(
        (f: any) => f.id === action.payload.id,
      );

      newData[idx] = {
        ...newData[idx],
        mensagem: action.payload.mensagem,
        lida: action.payload.lida,
        link: action.payload.link,
        dataCriacao: action.payload.dataCriacao,
      };

      newDataALL[idxALL] = {
        ...newDataALL[idxALL],
        mensagem: action.payload.mensagem,
        lida: action.payload.lida,
        link: action.payload.link,
        dataCriacao: action.payload.dataCriacao,
      };

      return {
        ...state,
        data: newData,
        dataALL: newDataALL,
      };
    }
    case ATUALIZARAVISOS_LOTE: {
      let newData = [...state.data];
      let newDataALL = [...state.dataALL];

      if (action.payload.avisos && action.payload.avisos.length > 0) {
        for (let aviso of action.payload.avisos) {
          const idx = state.data.findIndex((f: any) => f.id === aviso.id);

          const idxALL = state.dataALL.findIndex((f: any) => f.id === aviso.id);

          newData[idx] = {
            ...newData[idx],
            mensagem: aviso.mensagem,
            lida: aviso.lida,
            link: aviso.link,
            dataCriacao: aviso.dataCriacao,
          };

          newDataALL[idxALL] = {
            ...newDataALL[idxALL],
            mensagem: aviso.mensagem,
            lida: aviso.lida,
            link: aviso.link,
            dataCriacao: aviso.dataCriacao,
          };
        }
      }

      return {
        ...state,
        data: newData,
        dataALL: newDataALL,
      };
    }
    case ABRIRFECHARMENU: {
      return {
        ...state,
        abrir: action.payload,
      };
    }
    case ABRIRFECHARMENUMAISAVISOS: {
      return {
        ...state,
        abrirMaisAcoes: action.payload,
      };
    }
    case TOTALIZADORAVISOS: {
      return {
        ...state,
        count: action.payload,
      };
    }
    case BUSCARTODOSAVISOS: {
      return {
        ...state,
        dataALL: action.payload,
      };
    }
    case ORDENARDATAS: {
      const newData = [...state.data];
      newData.sort((a, b): any => {
        let data1 = new Date(a.dataCriacao),
          data2 = new Date(b.dataCriacao);
        return data1 < data2;
      });

      return {
        ...state,
        data: newData,
      };
    }
    case ENVIARAVISOSLOTE: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};

export default avisosRetaguarda;
