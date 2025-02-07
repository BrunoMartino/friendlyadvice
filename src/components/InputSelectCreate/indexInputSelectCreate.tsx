import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';

import Dialog from '@material-ui/core/Dialog';

import { InputSelectProps } from './interfaceInputSelectCreate';

import { MuiThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import {
  backgroundInperaInput,
  borderInput,
  borderInputFocus,
  colorText,
  greenInpera,
} from '../../utils/colorsInpera';
import './stylesInputSelectCreate.css';
import { validCharacters } from '../../utils/fn';
import { makeStyles } from '@material-ui/styles';

const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: 0,
        backgroundColor: backgroundInperaInput,
        height: '2.7rem',
        fontFamily: 'Source Sans Pro',
        fontSize: '1.5rem',
        color: `${colorText}`,
        outline: 'none',
        width: '100%',

        '& $notchedOutline': {
          borderColor: `${borderInput}`,
          borderStyle: 'solid',
          borderWidth: '0.1rem',
        },
        '&:hover $notchedOutline': {
          borderColor: `${borderInput}`,
          borderStyle: 'solid',
          borderWidth: '0.1rem',
        },
        '&$focused $notchedOutline': {
          borderColor: `${borderInputFocus}`,
          borderStyle: 'solid',
          borderWidth: '0.1rem',
        },
        '&&& $input': {
          border: 'none',
          outline: 'none',

          position: 'absolute',
          width: '80%',

          padding: 0,
          margin: 0,
          cursor: 'text',

          '&::placeholder': {
            fontSize: '1.5rem',
            opacity: 0.8,
          },
        },
      },
    },
  },
});

const themeFinancas = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: 8,
        backgroundColor: 'white',
        height: '4rem',
        fontFamily: 'Poppins',
        fontSize: '1.4rem',
        color: '#c0c0c0',
        outline: 'none',
        width: '100%',
        marginTop: '5px',

        '& $notchedOutline': {
          borderColor: '#c0c0c0',
          borderStyle: 'solid',
          borderWidth: '2px',
        },
        '&:hover $notchedOutline': {
          borderColor: '#c0c0c0',
          borderStyle: 'solid',
          borderWidth: '2px',
        },
        '&$focused $notchedOutline': {
          borderColor: `${borderInputFocus}`,
          borderStyle: 'solid',
          borderWidth: '2px',
        },
        '&&& $input': {
          border: 'none',
          outline: 'none',

          position: 'absolute',
          width: '80%',

          padding: 0,
          margin: 0,
          cursor: 'text',

          '&::placeholder': {
            fontSize: '1.5rem',
            opacity: 0.8,
          },
        },
      },
    },
  },
});

const useStyles = makeStyles({
  endAdornment: {
    top: 'calc(3.3rem - 2.4rem) !important',
    display: 'flex',
    justifyContent: 'center',
    right: '0 !important',
    width: '5rem !important',
  },
});

const filter = createFilterOptions<any>();

const InputSelectCreate: React.FC<InputSelectProps> = ({
  dados,
  open,
  setOpen,
  setDialogValue,
  width = '',
  maxWidth,
  setFieldValue,
  refcampo,
  id,
  value,
  disabled,
  tabIndex,
  setParent,
  clearFields,
  showMessageToRemove = false,
  onBlur,
  onFocus,
  notUseNewCadastro,
  placeholder,
  useMargin,
  action,
  messageCreate,
  maxLength,
  financasTheme = false,
  onKeyPress,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div
      className={useMargin ? 'marginComponente' : ''}
      style={{ opacity: disabled ? 0.7 : 1 }}
    >
      <Autocomplete
        classes={{ endAdornment: financasTheme ? classes.endAdornment : '' }}
        value={value}
        id={id}
        disabled={disabled}
        onBlur={onBlur || null}
        onFocus={onFocus || null}
        onChange={(event, newValue: any, reason) => {
          if (reason === 'clear') {
            setFieldValue(id, {
              id: '',
              descricao: '',
              inputValue: '',
            });
            if (setParent) {
              setParent('');
            }

            if (clearFields) {
              clearFields();
            }
          } else if (typeof newValue === 'string') {
            setTimeout(() => {
              setOpen(true);
              setDialogValue({
                descricao: '',
              });
            });
          } else if (newValue && newValue.inputValue && !notUseNewCadastro) {
            setOpen(true);
            setDialogValue({
              descricao: newValue.inputValue,
            });
            if (setParent) {
              if (newValue && newValue.id) {
                setParent(newValue.id);
              }
            }
          } else {
            if (newValue) {
              setFieldValue(id, newValue);

              if (setParent) {
                setParent(newValue.id);
              }
              if (clearFields && !showMessageToRemove) {
                clearFields();
              }
              if (action) {
                action();
              }
            }
          }
        }}
        filterOptions={(option, params) => {
          if (!notUseNewCadastro) {
            const filtered = filter(option, params) as any[];
            let tagCadastro = (
              <span
                style={{
                  fontWeight: 600,
                  fontSize: '1.6rem',
                  cursor: 'pointer',
                  color: greenInpera,
                }}
              >
                {messageCreate
                  ? `${messageCreate}: "${params.inputValue}"`
                  : ` Clique para cadastrar: "${params.inputValue}"`}
              </span>
            );
            if (params.inputValue !== '' && filtered.length === 0) {
              if (validCharacters(params.inputValue)) {
                filtered.push({
                  inputValue: params.inputValue,
                  descricao: tagCadastro,
                });
              }
            }

            return filtered;
          } else {
            const justFiltered = filter(option, params) as any[];
            if (!params.inputValue) {
              return justFiltered;
            }
            return justFiltered;
          }
        }}
        noOptionsText={
          notUseNewCadastro
            ? 'Não existe essa opção'
            : 'Uma palavra deve conter no máximo até 29 caracteres'
        }
        getOptionSelected={(option, value) =>
          option?.descricao === value?.descricao
        }
        options={dados}
        getOptionLabel={(option: any) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }

          return option.descricao;
        }}
        renderOption={(option) => option.descricao}
        selectOnFocus
        clearOnEscape
        clearOnBlur
        handleHomeEndKeys
        style={{
          ...props.style,
          width: `${width}`,
          maxWidth: `${maxWidth}`,
        }}
        renderInput={(params) => (
          <MuiThemeProvider theme={financasTheme ? themeFinancas : theme}>
            <TextField
              {...params}
              variant="outlined"
              placeholder={placeholder ?? 'Selecione uma opção'}
              ref={refcampo}
              // autoFocus
              tabIndex={tabIndex}
              // inputProps={{
              //   maxLength: props.maxLength,
              // }}
            />
          </MuiThemeProvider>
        )}
        onKeyPress={onKeyPress}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        {props.children}
      </Dialog>
    </div>
  );
};

export default InputSelectCreate;
