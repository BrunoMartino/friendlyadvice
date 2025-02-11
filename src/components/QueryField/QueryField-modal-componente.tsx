import React, { SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/button-componente';
import { ButtonThemes } from '../Button/ButtonThemesEnum';

import ContentHeader from '../ContentHeader/contentHeader-componente';
import InputFieldSearch from '../InputField/InputField-Search/index-inputfield-search';
import Paginacao from '../Paginacao/indexPaginacao';
import { Container } from './styled-QueryField-modal';

type TPropsModal = {
  close: React.Dispatch<SetStateAction<boolean>>;
  title: string;
};

const QueryField: React.FC<TPropsModal> = ({ close, title }) => {
  return createPortal(
    <Container>
      <div className="div-main">
        <ContentHeader
          title={title}
          rightButtons={
            <>
              <Button
                buttonWidth="15.4rem"
                buttonHeigth="4.5rem"
                children="Cancelar"
                onClick={() => close(false)}
                theme={ButtonThemes.grayButton}
              />
              <Button
                buttonWidth="15.4rem"
                buttonHeigth="4.5rem"
                children="Confirmar"
                theme={ButtonThemes.default}
              />
            </>
          }
          listSearch={
            <form>
              <InputFieldSearch placeholder="Buscar" width="64.1rem" />
            </form>
          }
        />
        <div
          style={{
            border: '1px solid red',
            borderRadius: '0.9rem',
            height: '29.3rem',
            marginBottom: '2.4rem',
          }}
        ></div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Paginacao />
        </div>
      </div>
    </Container>,
    document.getElementById('root-portal')!,
  );
};

export default QueryField;
