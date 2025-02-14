//1-favor colocar em ordem de tonalidade
//2-não repetir cores :). somente repetir quando for montar um objeto de componente. ex: grid, toggle, etc

//cores em ordem do mais claro para o mais escuro. Represente ela por número no final. ex: 10 é mais fraco que 20
export const Colors = {
  TextColors: {
    textWhiteGray: '#A09B9B', //textGray10 com 50% lightness
    textGray05: '#2b2b2b',
    textGray10: '#564F52',
    textGray30: '#2C2F38',
    textGray40: '#2E2B2C',
    textGray50: '#564f5280',
    textGray60: '#564f5240',
    textBrown: '#453022',
    textBlack: '#000',
    textWhite: '#fff',
  },
  InperaColors: {
    //cinzas
    backgroundMainColor: '#EBE8E4',
    backgroundMainColor10: `#F9F7F2`,
    backgroundMainColor15: '#F8F6F2',
    backgroundMainColor20: '#E4E0DD',
    backgroundMainColor30: '#b9b9b9',
    backgroundMainColor50: `#F9F7F280`,

    backgroundGrayColor: `#918d82`,


    //border inpera colors
    borderColor: '#C6C2C0',

    backgroundColorGray: '#dad7d3',

    //laranja
    orangeInpera: '#D0944B',
    orangeInpera10: 'rgba(208, 148, 75, 0.9)',
    orangeInpera45: 'rgba(208, 148, 75, 0.65)',
    //
  },
  DeliveryColors: {
    //
    yellowMainColor10: '#F2B05E',
    yellowMainColor20: '#D89E57',
    yellowMainColor30: '#d39345',
    //
    yellowColor: '#FCA53B',
    yellowColor20: '#DF8F2E',
  },
  CoresUtilitarias: {
    //erros
    errorTomatoDanger: '#F27F57',
    errorTomatoDanger80: '#ed5e4e',
    errorMessage: '#ff3333',
    //sucesso
    successColorLight: '#66bb6a',
    successColorLight20: '#4bb543',
    successColorDark: '#00a84e',
    //informação
    infoColor: 'rgb(37, 150, 190)',
  },
  componentes: {
    GridColors: {
      gridBackgroundHeader: `#E4E0DD`,
      gridBackground: `#F8F6F2`,
      gridBorder: '0.1rem solid #C6C2C0',
      gridText: `#564F52`,
      gridDetailColor: `#EBE8E4`,
    },
    Button: {
      backgroundGreen: '#00a84e',
      backgroundDelete: '#ff3333',
      backgroundGray: '#dad7d3',
      backGroundDefault: '#F2B05E',
      backgroudPdvPedido: '#17B0A6',
      backgroudPdvCupom: '#10C787',
      textColor: '#2e2b2c',
    },
    inputDefault: {
      inputBorder: '0.1rem solid "#564F52"',
      inputLabel: '#564F52',
      inputLineHeight: '2.1rem',
      inputFontSize: '1.4rem',
      backgroundHover: '#D89E57',

    },
    Toggle: {
      color: '#2E2B2C',
      backgroundActive: '#F2B05E',
      backgroundOff: '#ccc',
    },
    ButtonDropDown: {
      backgroundColor: '#E4E0DD',
      borderLeft: '#b9b9b9',
      borderBottom: '#b9b9b9',
      backgroundHover: '#D89E57',
      //ButtonDropDown é um Button. Herdou a cor do texto dele.
    },
    ButtonDelectOnSelect: {
      backgroundColorSelected: '#F27F57',
    },
    CheckBoxComponent: {
      backgroundActive: '#D89E57',
      backgroundOff: '',
      color: '#2E2B2C',
      borderOff: '#564F52',
      borderActive: '#d39345',
    },
    LinkToBack: {
      color: '#A09B9B',
      fillIcon: '#A09b9b',
    },
    ContentHeader: {
      color: '#A09B9B',
      colorDarker: '#564F52',
      colorBrown: '#453022',
      border: '#C6C2C0',
    },
    InputFieldContainer: {
      labelColor: '#564f52',
      colorErrors: '#f27f57',
      contrastStrongColor: '#fca53b',
      borderColor: '#564f5240',
      iconColor: '#564f5280',
    }
    // . . .
  },
};
