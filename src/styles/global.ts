import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --color-header: #9c092f;
    --color-background: #1b1e25;
    --color-cinza-claro-1: #3e414c;
    --color-cinza-claro-2: #5b5d67;
    --color-cabecalho-pedido: #2c2f38;
    --color-botao-filtro: #646569;

    // STATUS DOS PEDIDOS
    --color-status-aberto: #b4002d;
    --color-status-producao: #ff7730;
    --color-status-entrega: #2998ff;
    --color-status-finalizado: #55c57a;
    --color-status-cancelado: #ccc;
    --tamanhoCabecalho: 7rem;

    //CSS Puro
    --color-Branco: #FFFFFF;
    --color-Text: #2C2F38;
    --backgroundInpera: #d0944b;
    --backgroundInpera10: #F2E1CC;
    --backgroundInpera45: #e8cba8;
    --corPrimaria10: #faf4ed;
    --corPrimaria45: #e8cba8;
    --corPrimaria60: #f0c186;
    --backgroundLight : #EBE8E4;
    --backgroundLightSecundary : #F9F7F2;
    --backgroundLightSecundary_50 : #F9F7F280;
    --backgroundLightSecundary_white : #f9f8f6;
    --backgroundLightSecundary_gray : #e4e0dd;
    --colorInpera: #F2B05E;

    //Grid - CSS Puro
    --background-grid : #FAFAFC;
    --border-grid:#E6E6F0;
    --border-input:#7e8086;
    --color-placeholder:#7E8086;
    --background-check: #F7F5FA;
    --border-check: #C4C4C4;


    //cores com base nas cores atualizada. Com base no utils/colorsAtualizada.ts
    //coloquei as cores que não estavam presente nesse arquivo anteriormente

    --textGray10: #564F52;
    --textGray40: #2E2B2C;
    --backgroundMainColor15: '#F8F6F2',
    --orangeInpera10: 'rgba(208, 148, 75, 0.9)';
    --orangeInpera45: 'rgba(208, 148, 75, 0.65)';
    --yellowMainColor20: #D89E57;
    --yellowMainColor30: #d39345;
    --yellowColor: #FCA53B;
    --yellowColor20: #DF8F2E;
    --errorTomatoDanger: '#F27F57',
    --errorTomatoDanger80: '#ed5e4e',
    --errorMessage: '#ff3333',
    //sucesso
    --successColorLight: '#66bb6a',
    --successColorLight20: '#4bb543',
    --successColorDark: '#00a84e',
    //informação
    --infoColor: 'rgb(37, 150, 190)',

  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    scroll-behavior: smooth;
    font-family: 'Source Sans Pro', sans-serif;

    .MuiAutocomplete-popper {
      z-index: 9999999;
    }

    ::-webkit-scrollbar-track {
       background-color: #1b1e25;
     }
    ::-webkit-scrollbar {
       width: 0.5rem;
       height: 0.5rem;
       background: #d0944b;
     }
    ::-webkit-scrollbar-thumb {
       background: #d0944b;
     }

     //For Firefox
     /* scrollbar-width: thin;
     scrollbar-color: #d0944b #1B1E25; */

    ::-moz-scrollbar-thumb {
      background-color: #333; /* cor do controle deslizante */
    }
    ::-moz-scrollbar-track {
      background-color: #d0944b; /* cor da trilha */
    }
  }

  html {
    font-size: 62.5%;

    
  }

  body {
    background: var(--backgroundLight);
    color: #fff;
    -webkit-font-smoothing: antialiased;

    overflow-x: hidden !important;

    .MuiAutocomplete-popper {
      display: flex;
      z-index: 99999;

      .MuiAutocomplete-listbox {
        width: 100vw;
      }
    }
  }

  .disableScrollbar {
    overflow-y: hidden !important;
  }

  p {
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
    outline: none !important;
  }
`;
