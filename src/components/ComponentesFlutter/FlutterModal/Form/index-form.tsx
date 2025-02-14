import { Formik, Form } from 'formik';
import React, { forwardRef, useImperativeHandle } from 'react';
import { NoScrollRoot } from '../../../../styles/globalStyle';
import styled from 'styled-components';
import { ButtonArea, FormContainer } from '../ModalFlutter';
import Button from '../../../Button/button-componente';
import { ButtonThemes } from '../../../Button/ButtonThemesEnum';

interface IFormProps {
  children: React.ReactNode;
  handleClose: () => void;
  initialValuesFormik: Record<string, any>;
  handleSumbit: (values: Record<string, any>) => void;
}

export const FormContent = forwardRef(
  (
    { children, handleClose, initialValuesFormik, handleSumbit }: IFormProps,
    ref,
  ) => {

    return (
      <>
        <NoScrollRoot />
        <FormContainer>
          <Formik
            initialValues={initialValuesFormik}
            onSubmit={(values) => {
              handleSumbit(values);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
            }) => {
              useImperativeHandle(ref, () => ({
                values,
                handleChange,
                handleBlur,
                submitForm: () => handleSubmit(),
                setFieldValue: (field: string, value: any) =>
                  setFieldValue(field, value),
              }));

              function areAllFieldsEmpty(obj: Record<string, any>) {
                // aqui TODOS os valores do initial value vai ser validado.
                // Se todos forem vazios, o botão de salvar vai ser desabilitado.

                //caso for no futuro deixar isso opcional, recomendo criar um array de objetos e passar os keys que não serao validados
                // e fazer um filter para verificar se o key esta no array, se estiver, não valida.

                return Object.entries(obj).every(
                  ([key, value]) => value !== '',
                );
              }

              const isValid = !areAllFieldsEmpty(values);

              return (
                <Form>
                  {children}
                  <ButtonArea>
                    <Button
                      theme={ButtonThemes.default}
                      className="btn-voltar"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      voltar
                    </Button>
                    <Button
                      disable={isValid}
                      theme={ButtonThemes.default}
                      className="btn-salvar"
                      onClick={(e: any) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      salvar
                    </Button>
                  </ButtonArea>
                </Form>
              );
            }}
          </Formik>
        </FormContainer>
      </>
    );
  },
);
