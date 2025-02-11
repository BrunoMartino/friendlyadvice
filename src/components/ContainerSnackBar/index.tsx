import React from 'react';
import { useSelector } from 'react-redux';
import SnackBar from '../SnackBar';

// import { Container } from './styles';

const ContainerSnackBar: React.FC = () => {
  const snackBarRedux = useSelector((state: any) => state.session.mensagem);

  return (
    <SnackBar
      mensagem={snackBarRedux.mensagem}
      open={snackBarRedux.open}
      tipo={snackBarRedux.tipo}
      posicao={snackBarRedux.posicao}
    />
  );
};

export default ContainerSnackBar;
