import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { greenInpera } from '../../utils/colorsInpera';
import { validTokenAdministracao } from '../../utils/fn';
import Classes from './stylesAdicionar.module.css';

interface dadosProps {
  caption: String;
  disabled: boolean;
  handleClick: any;
  marginLeft?: any;
  loading?: boolean;
}

const BotaoAdicionar_Cadastros: React.FC<dadosProps> = ({ ...rest }) => {
  const tokenAdm = validTokenAdministracao();
  return (
    <div
      style={{
        display: 'flex',
        width: '10rem',
        marginLeft: rest.marginLeft ? rest.marginLeft : '0.5rem',
        height: 'inherit',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <button
        className={Classes.btnAdd}
        style={{
          backgroundColor: `${greenInpera}`,
          opacity: rest.disabled || tokenAdm ? 0.35 : 1,
          cursor: rest.disabled || tokenAdm ? 'default' : 'pointer',
        }}
        type="button"
        disabled={rest.disabled || tokenAdm || rest.loading}
        onClick={rest.handleClick}
        // onClick={() => {
        //   adicionaCondicional(values, initialValues.id);
        //   dispatch(setAlteracaoCondicionalItem(values.id));
        // }}
      >
        <IoMdAdd
          style={{
            fill: 'white',
            stroke: 'white',
            fontSize: '2.5rem',
            color: 'white',
          }}
        />
        {rest.caption}
      </button>
    </div>
  );
};

export default BotaoAdicionar_Cadastros;
