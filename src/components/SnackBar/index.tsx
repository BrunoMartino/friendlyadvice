import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import React, { useState } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { PropsAlert, TipoMensagem, TipoPosicao } from './interface';
import './styles.css';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar: React.FC<PropsAlert> = ({ open, mensagem, tipo, posicao, setCloseToast }) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setCloseToast();
  };

  const tempoExecucao = (tipoMensagem: TipoMensagem) => {
    switch (tipoMensagem) {
      case TipoMensagem.ERRO:
        return 6000;
      case TipoMensagem.INFO:
        return 4000;
      case TipoMensagem.SUCESSO:
        return 2000;
      default:
        return 2000;
    }
  };

  const posicaoExecucao = (
    tipoPosicao: TipoPosicao | undefined,
  ): SnackbarOrigin => {
    if (!tipoPosicao) {
      return { vertical: 'top', horizontal: 'right' };
    } else {
      const novoTipo = tipoPosicao.split('_');
      let posicao: SnackbarOrigin;
      if (novoTipo[1] === 'right') {
        posicao = {
          vertical: novoTipo[0] === 'bottom' ? 'bottom' : 'top',
          horizontal: 'right',
        };
      } else if (novoTipo[1] === 'left')
        posicao = {
          vertical: novoTipo[0] === 'bottom' ? 'bottom' : 'top',
          horizontal: 'left',
        };
      else {
        posicao = {
          vertical: novoTipo[0] === 'bottom' ? 'bottom' : 'top',
          horizontal: 'center',
        };
      }
      return posicao;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={tempoExecucao(tipo)}
      onClose={handleClose}
      anchorOrigin={posicaoExecucao(posicao)}
    >
      <Alert onClose={handleClose} severity={tipo}>
        {mensagem}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
