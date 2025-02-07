import React, { useEffect, useRef } from 'react';
import {
  Container,
  ButtonActions,
  TitlePage,
  HeaderAction,
  ContentOptions,
  Form,
  Icons,
  Section,
  TitleContainer,
  SubTitlePage,
} from './styleCabecalhoTela';
import { CabecalhoTelaProps, TipoCabecalho } from './interfaceCabecalhoTela';
import { BiPrinter, BiSearchAlt } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { validTokenAdministracao } from '../../utils/fn';
import SelectBoxSearch from '../SelectBox/SelectBox-Search/SelectBox-Search';
import { useDetectOS } from '../../hooks/use-detect-os';
const CabecalhoTela: React.FC<CabecalhoTelaProps> = ({
  useSave = true,
  breakWidth = 827,
  hasPadding = false,
  spaceTop,
  hasMoreField,
  colorHeader,
  ...props
}) => {
  const dispatch = useDispatch();
  const searchRef = useRef<any>();
  const tokenAdm = validTokenAdministracao();

  const configuracoesEmpresa = useSelector(
    (state: any) => state.global.configuracoesEmpresa.configuracoes,
  );
  const isLoading = useSelector(
    (state: any) => state.session.paginacao.isLoading,
  );
  const empresaAdmin = useSelector((state: any) => state.global.empresaAdmin);
  const filtroSelecionado = useSelector(
    (state: any) => state.session.paginacao.filtroSelecionado,
  );

  const handleEscape = (e: any) => {
    if (props.handleCancelar) {
      if (e.keyCode === 27) {
        props.handleCancelar(e);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const system = useDetectOS();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Container breakWidth={breakWidth} isLoading={isLoading}>
      <HeaderAction
        colorHeader={colorHeader}
        spaceTop={spaceTop}
        hasPadding={hasPadding}
        breakWidth={breakWidth}
      >
        {props.descricaoSubTitle ? (
          <TitleContainer>
            <TitlePage>
              <span className="title">
                <span className="iconeTitle">{props.icone}</span>
                <span className="text ">{props.descricao}</span>
              </span>
            </TitlePage>
            <SubTitlePage>
              <span className="subtitle">
                <span className="text ">
                  {props.descricaoSubTitle.length > 26
                    ? props.descricaoSubTitle.substring(0, 26) + '...'
                    : props.descricaoSubTitle}
                </span>
              </span>
            </SubTitlePage>
          </TitleContainer>
        ) : (
          <TitlePage>
            <span className="title">
              <span className="iconeTitle">{props.icone}</span>
              <span className="text ">{props.descricao}</span>
            </span>
          </TitlePage>
        )}
        {props.tipo === TipoCabecalho.CADASTRO ? (
          <ButtonActions breakWidth={breakWidth}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              type="button"
              onClick={props.handleCancelar}
              className="btn cancel"
              disabled={props.disabledVoltar ? props.disabledVoltar : false}
            >
              {props.nameBtnCancel ? props.nameBtnCancel : 'Voltar'}
            </button>
            {useSave && (
              <button
                onClick={props.handleGravar}
                className="btn-tela"
                disabled={
                  props.disabled ? props.disabled : tokenAdm ? tokenAdm : false
                }
                style={{ opacity: props.disabled || tokenAdm ? 0.35 : 1 }}
                type="submit"
              >
                Salvar
              </button>
            )}
          </ButtonActions>
        ) : (
          <ButtonActions breakWidth={breakWidth}>
            {props.handleVoltar && (
              <button
                className="btn cancel"
                onClick={props.handleVoltar}
                type="button"
              >
                Voltar
              </button>
            )}
            <button
              className="btn-tela"
              onClick={props.handleNovo}
              type="button"
              disabled={
                props.handleNovo === undefined ||
                props.valorDiferenciado ||
                tokenAdm ||
                props.newBtnDisabled ||
                props.newBtnInvisible
              }
              style={{
                opacity:
                  (props.handleNovo === undefined ||
                    props.valorDiferenciado ||
                    tokenAdm ||
                    props.disabled ||
                    props.newBtnDisabled) &&
                  !props.newBtnInvisible
                    ? 0.35
                    : props.newBtnInvisible
                    ? 0
                    : 1,
                cursor: props.newBtnInvisible ? 'default' : 'pointer',
              }}
            >
              + Novo
            </button>
          </ButtonActions>
        )}
      </HeaderAction>
      {props.tipo === TipoCabecalho.LISTAGEM && !props.cabecalhoOnly ? (
        <ContentOptions breakWidth={breakWidth} hasMoreField={hasMoreField}>
          {hasMoreField ? (
            <Section hasMoreField={hasMoreField}>
              {props.select &&
              props.select.data &&
              props.select.data.length > 0 ? (
                <div style={{ marginRight: '0.5rem' }}>
                  <SelectBoxSearch
                    idInput="filtro"
                    autoComplete
                    padding={'1rem 0.5rem'}
                    selectorData={props.select.data}
                    selectorDataKey={['id', 'descricao', 'inputValue']}
                    onFieldSet={(e) => {}}
                    objectKey={'filtro'}
                    placeholder={
                      props.selectPlaceholder
                        ? props.selectPlaceholder
                        : 'Escolha uma opção'
                    }
                    dontSearch
                    values={filtroSelecionado}
                    styleMethod="cadastros"
                  />
                </div>
              ) : null}
              <Form breakWidth={breakWidth} hasMoreField={hasMoreField}>
                <input
                  type="search"
                  name="search"
                  readOnly={props.handlePesquisar === undefined}
                  id="search"
                  value={props.valuePesquisado ? props.valuePesquisado : ''}
                  onChange={(e: any) => {}}
                  style={{
                    opacity: props.handlePesquisar === undefined ? 0.35 : 1,
                  }}
                  onKeyPress={(e: any) => {
                    if (e.charCode === 13) {
                      e.preventDefault();
                      props.handlePesquisar!();
                    }
                  }}
                  placeholder={
                    props.pesquisaPlaceholder
                      ? props.pesquisaPlaceholder
                      : 'Digite o texto para pesquisar'
                  }
                  ref={searchRef}
                />
                <div
                  id="search-icon"
                  style={{
                    cursor:
                      props.handlePesquisar !== undefined
                        ? 'pointer'
                        : 'no-drop',
                  }}
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (props.handlePesquisar) {
                      props.handlePesquisar!();
                    }
                  }}
                >
                  <BiSearchAlt
                    style={{
                      cursor:
                        props.handlePesquisar !== undefined
                          ? 'pointer'
                          : 'no-drop',
                      right: '5',
                      top: '0.6rem',
                      opacity: props.handlePesquisar === undefined ? 0.35 : 1,
                    }}
                  />
                </div>
              </Form>
            </Section>
          ) : (
            <Form breakWidth={breakWidth} hasMoreField={hasMoreField}>
              <input
                type="search"
                name="search"
                readOnly={props.handlePesquisar === undefined}
                id="search"
                value={props.valuePesquisado ? props.valuePesquisado : ''}
                onChange={(e: any) => {}}
                style={{
                  opacity: props.handlePesquisar === undefined ? 0.35 : 1,
                }}
                onKeyPress={(e: any) => {
                  if (e.charCode === 13) {
                    e.preventDefault();
                    props.handlePesquisar!();
                  }
                }}
                placeholder={
                  props.pesquisaPlaceholder
                    ? props.pesquisaPlaceholder
                    : 'Digite o texto para pesquisar'
                }
                ref={searchRef}
              />
              <div
                id="search-icon"
                style={{
                  cursor:
                    props.handlePesquisar !== undefined ? 'pointer' : 'no-drop',
                }}
                onClick={(e: any) => {
                  e.preventDefault();
                  if (props.handlePesquisar) {
                    props.handlePesquisar!();
                  }
                }}
              >
                <BiSearchAlt
                  style={{
                    cursor:
                      props.handlePesquisar !== undefined
                        ? 'pointer'
                        : 'no-drop',
                    right: '5',
                    top: '0.6rem',
                    opacity: props.handlePesquisar === undefined ? 0.35 : 1,
                  }}
                />
              </div>
            </Form>
          )}
          <Icons breakWidth={breakWidth} hasMoreField={hasMoreField}>
            {props.handleImpressao ? (
              <BiPrinter onClick={props.handleImpressao} />
            ) : (
              <BiPrinter
                style={{
                  opacity: 0.3,
                  cursor: 'auto',
                }}
              />
            )}
            <FaTrashAlt
              onClick={
                !tokenAdm && props.handleRemove ? props.handleRemove : undefined
              }
              style={{
                marginLeft: '1rem',
                opacity:
                  !props.handleRemove ||
                  tokenAdm ||
                  (configuracoesEmpresa &&
                    configuracoesEmpresa.precoDiferenciado &&
                    empresaAdmin &&
                    empresaAdmin.integracaoFacilite)
                    ? 0.4
                    : 1,
                cursor: props.newBtnInvisible ? 'default' : 'pointer',
              }}
            />
          </Icons>
        </ContentOptions>
      ) : null}
      <div style={{ paddingBottom: '1rem' }}></div>
      {props.children}
    </Container>
  );
};

export default CabecalhoTela;
