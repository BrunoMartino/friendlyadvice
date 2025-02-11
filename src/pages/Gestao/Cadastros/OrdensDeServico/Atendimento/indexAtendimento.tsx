import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SnackbarDefault from '../../../../../components/SnackbarDefault';
import CabecalhoPadrao from '../../../../../components/CabecalhoPadrao/indexCabecalhoPadrao';
import { AiOutlinePrinter } from 'react-icons/ai';
import { backgroundInpera } from '../../../../../utils/colorsInpera';
import { AddButton } from '../../../../../components/CabecalhoTelaFlutter/styleCabecalhoTelaFlutter';
import api, { apiGenerica } from '../../../../../services/api';
import {
  AtendimentoGrid,
  BodyAtendimentoGrid,
  BodyGridService,
  BreadCrumbs,
  Container,
  ExpandedDiv,
  HeaderGridService,
} from './styledAtendimento';
import { FaPen, FaTrashAlt, FaWhatsapp } from 'react-icons/fa';
import { services } from './apiGenerica';
import moment from 'moment';
import { AssinaturaIconFailed } from '../../../../../components/Icons/AssinaturaIcon/icon-assinatura-index';
import useWindowSize from '../../../../../hooks/useWindowSize';
import { ModalFlutterAtendimento } from './modalAtendimento/index-modal-atendimento';
import { useDispatch } from 'react-redux';
import { abrirMensagem } from '../../../../../store/modules/Components/SnackBar/action';
import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import { DateTime } from 'luxon';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface IAtendimento {
  codigo_servico: string;
  idOrdemServicoAtendimento: string;
  idOrdemServicoItem: string;
  data: string;
  hora_inicial: string;
  hora_final: string;
  descricao: string;
  assinatura: boolean | string;
}

interface IOrdemServicoItens {
  PRO_CODIGO: string;
  PRO_DESCRICAO: string;
  descricaoDoServicoCompleta: string;
  idOrdemServico: string;
  idOrdemServicoItem: string;
}

const newFormatTime = (dateIso: any) => {
  return DateTime.fromISO(dateIso).toISOTime({
    format: 'extended',
    suppressSeconds: true,
    suppressMilliseconds: true,
    includeOffset: false,
  });
};

const AtendimentoOrdensDeServico = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [ordemServico, setOrdemServico] = useState<{
    getAllOrdemServico: any;
    setAllServicoItens: any;
    setAllAtendimento: any;
  } | null>(null);

  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<{
    descricao: string;
    id: string;
  } | null>(null);

  const [openModalAtendimento, setOpenModalAtendimento] = useState(false);
  const [serviceSelectedToEdit, setServiceSelectedToEdit] =
    useState<IAtendimento | null>(null);
  const size = useWindowSize().width;
  const dispatch = useDispatch();

  const itensToData = selectedFilter ? [selectedFilter] : [];

  const skipFirstRender = useRef(true);

  const deleteService = useCallback(async (id: string) => {
    try {
      await api.delete(`/api/v1/ordemdeservico/deletar/${id}`);
      await requestFunction();
    } catch (e) {
      console.error('Error deleting service:', e);
    }
  }, []);

  const toggleExpand = (idOrdemServicoAtendimento: string) => {
    setExpandedItem(
      expandedItem === idOrdemServicoAtendimento
        ? null
        : idOrdemServicoAtendimento,
    );
  };

  const requestFunction = useCallback(async () => {
    try {
      const response = await services({
        state: { idOrdemServico: id },
        api: apiGenerica,
      });

      const { getAllOrdemServico, setAllAtendimento, setAllServicoItens } =
        response;

      setOrdemServico({
        getAllOrdemServico,
        setAllServicoItens,
        setAllAtendimento,
      });
    } catch (error) {
      console.error('Error fetching ordemServico:', error);
      setOrdemServico(null);
    }
  }, []);

  useEffect(() => {
    requestFunction();
  }, []);

  useEffect(() => {
    if (skipFirstRender.current) {
      skipFirstRender.current = false;
      return;
    }

    if (!selectedFilter?.id) {
      requestFunction();
    }
  }, [selectedFilter]);

  async function handleFilterAtendimento(
    idSelectedOrdem: string,
    idSelectedItem: string,
    descricao: string,
  ) {
    try {
      const response = await services({
        state: {
          idOrdemServico: idSelectedOrdem,
          idOrdemServicoItem: idSelectedItem,
        },
        api: apiGenerica,
      });

      const { setAllAtendimento } = response;

      if (selectedFilter?.id === idSelectedItem) {
        setSelectedFilter(null);
      } else {
        setSelectedFilter({ id: idSelectedItem, descricao });
      }

      setOrdemServico((prev: any) => ({
        ...prev,
        setAllAtendimento,
      }));
    } catch (e) {
      console.error('Error fetching ordemServico:', e);
    }
  }

  function loadItens() {
    if (ordemServico) {
      if (!ordemServico.setAllServicoItens?.data) {
        return <h1>Nenhum dado encontrado</h1>;
      }

      return ordemServico.setAllServicoItens.data.data.map(
        (item: IOrdemServicoItens, index: number) => {
          return (
            <BodyGridService
              key={item.PRO_CODIGO + index}
              selected={
                selectedFilter
                  ? selectedFilter.id === item.idOrdemServicoItem
                  : false
              }
              onClick={() => {
                handleFilterAtendimento(
                  item.idOrdemServico,
                  item.idOrdemServicoItem,
                  item.PRO_DESCRICAO + ' - ' + item.descricaoDoServicoCompleta,
                );
              }}
            >
              <p>{item.PRO_CODIGO ?? '---'}</p>
              <p className="descricao-itens">{`${item.PRO_DESCRICAO ?? '---'} ${
                item.descricaoDoServicoCompleta
                  ? ' - ' + item.descricaoDoServicoCompleta
                  : ''
              }`}</p>
            </BodyGridService>
          );
        },
      );
    }
  }

  function loadAtendimento() {
    if (!ordemServico?.setAllAtendimento?.data?.data) {
      return <h1>Nenhum atendimento encontrado</h1>;
    }

    function handleEditItem(item: IAtendimento) {
      if (!ordemServico?.setAllServicoItens.data.data) return;

      const getDescriptIion = ordemServico.setAllServicoItens.data.data.find(
        (a: any) => a.idOrdemServicoItem === item.idOrdemServicoItem,
      );

      setSelectedFilter({
        descricao:
          getDescriptIion?.PRO_DESCRICAO +
          ' - ' +
          getDescriptIion?.descricaoDoServicoCompleta,
        id: item.idOrdemServicoAtendimento,
      });
      setServiceSelectedToEdit(item);
      setOpenModalAtendimento(true);
    }

    return ordemServico.setAllAtendimento.data.data.map(
      (item: IAtendimento, index: number) => {
        return (
          <React.Fragment
            key={item.codigo_servico + '_' + item.descricao + index}
          >
            <BodyAtendimentoGrid
              onClick={() => toggleExpand(item.idOrdemServicoAtendimento)}
              key={item.idOrdemServicoAtendimento}
            >
              <p className="cd-service-body">{item.codigo_servico}</p>
              <p className="data-body">
                {DateTime.fromISO(item.hora_inicial).toFormat('dd/MM/yyyy')}
              </p>
              <p className="hr-inicial-body">
                {newFormatTime(item.hora_inicial)}
              </p>
              <p className="hr-final-body">{newFormatTime(item.hora_final)}</p>
              <p className="descricao">{item.descricao}</p>
              <div className="assinatura-body">
                {!item.assinatura ? (
                  <AssinaturaIconFailed />
                ) : (
                  typeof item.assinatura === 'string' && (
                    <LazyLoadImage
                      src={item.assinatura}
                      style={{
                        width: '15.6rem',
                        height: '8rem',
                        objectFit: 'scale-down',
                      }}
                      effect="blur"
                    />
                  )
                )}
              </div>
              <div className="button-div">
                <FaPen
                  onClick={() =>
                    handleEditItem({
                      codigo_servico: item.codigo_servico,
                      idOrdemServicoAtendimento: item.idOrdemServicoAtendimento,
                      data: item.data,
                      hora_inicial: item.hora_inicial,
                      hora_final: item.hora_final,
                      descricao: item.descricao,
                      assinatura: item.assinatura,
                      idOrdemServicoItem: item.idOrdemServicoItem,
                    })
                  }
                />
                <FaTrashAlt
                  onClick={() => deleteService(item.idOrdemServicoAtendimento)}
                />
              </div>
            </BodyAtendimentoGrid>

            {expandedItem === item.idOrdemServicoAtendimento && size! < 900 && (
              <ExpandedDiv>
                <div className="extra-details">
                  <p>
                    Data do atendimento:{' '}
                    <span>{moment(item.data).format('DD/MM/YYYY')}</span>
                  </p>
                  <p>
                    Código do serviço:
                    <span>{item.codigo_servico}</span>
                  </p>
                  <p>
                    Descrição: <span>{item.descricao}</span>
                  </p>
                  <p>
                    Assinatura:{' '}
                    <span>
                      {item.assinatura
                        ? 'Atendimento assinado'
                        : 'Sem assinatura'}
                    </span>
                  </p>
                </div>
              </ExpandedDiv>
            )}
          </React.Fragment>
        );
      },
    );
  }

  return (
    <>
      <SnackbarDefault />
      <CabecalhoPadrao />
      {openModalAtendimento && (
        <ModalFlutterAtendimento
          isOpen={openModalAtendimento}
          onClose={() => {
            setOpenModalAtendimento(false);
            setServiceSelectedToEdit(null);
          }}
          setStateChange={async () => await requestFunction()}
          dados={{
            idOrdemServico: id,
            itens: itensToData,
            dataToEdit: serviceSelectedToEdit,
          }}
        />
      )}
      <Container>
        <>
          <header>
            <BreadCrumbs>
              <p onClick={() => history.push('/dashboard')}>Inicio |</p>
              <p>☰ Aplicativos |</p>
              <p
                className="clampedText"
                onClick={() => history.push('/listagem/OrdensDeServico')}
              >
                Ordens de Serviço |
              </p>
              <p className="clampedText" style={{ color: '#D0944B' }}>
                Atendimentos
              </p>
            </BreadCrumbs>
            <div className="icons-div">
              <AiOutlinePrinter fill={backgroundInpera} />
              <FaWhatsapp fill={backgroundInpera} />
            </div>
          </header>
          <div style={{ marginTop: '1.6rem' }} className="selected-os-div">
            <h2>
              Ordem de serviço:
              {ordemServico?.getAllOrdemServico.data.data[0].OS_NUMERO} -
              Cliente: {ordemServico?.getAllOrdemServico.data.data[0].CLI_RAZAO}
            </h2>
          </div>
          <section>
            <HeaderGridService>
              <p className="codigo">Código</p>
              <p className="descricao">Descrição do Serviço</p>
            </HeaderGridService>
            {!ordemServico || !ordemServico.setAllServicoItens ? (
              <>
                <h1>CARREGANDO</h1>
              </>
            ) : (
              loadItens()
            )}
          </section>
        </>
        <section>
          <div className="service-provided-header">
            <h2>Atendimentos realizados</h2>
            <AddButton
              style={
                !selectedFilter ? { background: '#c0c0c0', opacity: 0.5 } : {}
              }
              onClick={() => {
                if (!selectedFilter) {
                  dispatch(
                    abrirMensagem({
                      open: true,
                      mensagem:
                        'Para adicionar um novo atendimento é necessario selecionar um serviço.',
                      tipo: TipoMensagem.INFO,
                    }),
                  );
                  return;
                }
                setOpenModalAtendimento(true);
              }}
            >
              <span>+</span>
            </AddButton>
          </div>
          <AtendimentoGrid>
            <p className="cd-servico">Código</p>
            <p>Data</p>
            <p className="h-inicial">Inicial</p>
            <p className="h-final">Final</p>
            <p className="descricao">Descrição</p>
            <p className="assinatura">Assinatura</p>
          </AtendimentoGrid>
          {!ordemServico || !ordemServico.getAllOrdemServico ? (
            <h1>CARREGANDO</h1>
          ) : (
            loadAtendimento()
          )}
        </section>
      </Container>
    </>
  );
};

export default AtendimentoOrdensDeServico;
