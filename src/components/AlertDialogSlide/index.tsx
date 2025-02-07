import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { Props } from './alertInterface';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const tema = (props: any) =>
  createTheme({
    typography: {
      h6: {
        fontSize: `${props.fontSizeTitle ? props.fontSizeTitle : '2rem'}`,
        color: `${props.corTextoTitulo ? props.corTextoTitulo : 'black'}`,
        fontWeight: 'bold',
      },
      body1: {
        fontSize: `${props.fontSizeText ? props.fontSizeText : '1.6rem'}`,
      },
    },
    overrides: {
      MuiButton: {
        root: {
          fontSize: `${props.fontSizeButton ? props.fontSizeButton : '1.6rem'}`,
        },
        textPrimary: {
          color: `${props.corTextoBotao ? props.corTextoBotao : 'black'}`,
        },
      },
      MuiTypography: {
        colorTextSecondary: {
          color: `${props.corTextoCorpo ? props.corTextoCorpo : 'black'}`,
        },
      },
      MuiDialogTitle: {
        root: {
          backgroundColor: `${
            props.corBackgroud ? props.corBackgroud : 'white'
          }`,
        },
      },
      MuiDialogContent: {
        root: {
          backgroundColor: `${
            props.corBackgroud ? props.corBackgroud : 'white'
          }`,
        },
      },
      MuiDialogActions: {
        root: {
          backgroundColor: `${
            props.corBackgroud ? props.corBackgroud : 'white'
          }`,
        },
      },
      MuiDialog: {
        paper: {
          width: `${props.width ? props.width : ''}`,
        },
      },
    },
  });

const AlertDialogSlide: React.FC<Props> = ({ ...rest }) => {
  const history = useHistory();
  const handleClose = () => {
    if (rest.linkBotao) {
      history.push(rest.linkBotao);
      rest.config?.onHandleCloseAlert(false);
    } else {
      rest.config?.onHandleCloseAlert(false);
    }
  };

  return (
    <div>
      <ThemeProvider theme={tema(rest)}>
        <Dialog
          open={rest.config?.openAlert!}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          style={{ zIndex: 12000 }}
        >
          <DialogTitle id="alert-dialog-slide-title">{rest.titulo}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {rest.vetorTextoCorpo && rest.vetorTextoCorpo.length > 0
                ? rest.vetorTextoCorpo.map((item: string, idx: number) => (
                    <span key={idx}>{item}</span>
                  ))
                : rest.textoCorpo}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {rest.textoBotao}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default AlertDialogSlide;
