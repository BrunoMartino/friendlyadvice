import React, { useEffect, useRef, useCallback, useState } from 'react';
import Classes from './stylesMenuAvisos.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { IoMdNotificationsOff } from 'react-icons/io';
// import {
//   abrirFecharMenuAvisos,
//   atualizarAvisosBACKEND,
//   atualizarTodosAvisos,
//   buscarAvisos,
// } from '../../../store/modules/Gestao/Controle/Avisos/actions';
import { useHistory } from 'react-router';
import moment from 'moment';

import StatusIcon from './StatusIcon/index-statusicon';
import { BiCheckDouble } from 'react-icons/bi';

import { TypeNotificacoes } from '../../../utils/enum';

const MenuAvisos: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const Avisos = useSelector(
    (state: any) => state.session.avisosRetaguarda.data,
  );
  const refMenuAvisos = useRef<HTMLDivElement>(null);

  const [existData, setExistData] = useState<Boolean>(false);

  const fecharMenuAvisos = useCallback(
    (event: any) => {
      if (
        (refMenuAvisos &&
          refMenuAvisos.current &&
          refMenuAvisos.current.contains(event.target)) ||
        document.getElementById('iconsAlertHeader')?.contains(event.target)
      ) {
        return;
      }

      // dispatch(abrirFecharMenuAvisos(false));
    },
    [refMenuAvisos],
  );

  useEffect(() => {
    // dispatch(buscarAvisos());
    document.body.addEventListener('click', fecharMenuAvisos);

    return () => {
      document.body.removeEventListener('click', fecharMenuAvisos);
    };
  }, []);

  useEffect(() => {
    setExistData(Avisos && Avisos.length >= 1 && Avisos[0].id !== '');
  }, [Avisos]);

  const dataConverter = (dateNot: Date): string => {
    const atualDate = new Date();
    const msgDate = new Date(dateNot);

    if (
      atualDate.getFullYear() === msgDate.getFullYear() &&
      atualDate.getMonth() === msgDate.getMonth() &&
      atualDate.getDate() === msgDate.getDate() &&
      atualDate.getHours() === msgDate.getHours() &&
      atualDate.getMinutes() === msgDate.getMinutes()
    ) {
      return `Agora mesmo`;
    } else if (
      atualDate.getFullYear() === msgDate.getFullYear() &&
      atualDate.getMonth() === msgDate.getMonth() &&
      atualDate.getDate() === msgDate.getDate() &&
      atualDate.getHours() === msgDate.getHours()
    ) {
      return `${atualDate.getMinutes() - msgDate.getMinutes()}min atrás`;
    } else if (
      atualDate.getFullYear() === msgDate.getFullYear() &&
      atualDate.getMonth() === msgDate.getMonth() &&
      atualDate.getDate() === msgDate.getDate()
    ) {
      return `${atualDate.getHours() - msgDate.getHours()}h atrás`;
    } else if (
      atualDate.getFullYear() === msgDate.getFullYear() &&
      atualDate.getMonth() === msgDate.getMonth()
    ) {
      return `${atualDate.getDate() - msgDate.getDate()} dia(s) atrás`;
    } else if (atualDate.getFullYear() === msgDate.getFullYear()) {
      return `${atualDate.getMonth() - msgDate.getMonth()} mes(es) atrás`;
    } else {
      return moment(msgDate).format('DD/MM/YYYY');
    }
  };

  const formatInlineStyles = (text: string) => {
    let formattedText = text;

    // Aplica itálico para partes entre underscores (_)
    formattedText = formattedText.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Aplica negrito para partes entre asteriscos (*)
    formattedText = formattedText.replace(
      /\*([^*]+)\*/g,
      '<strong>$1</strong>',
    );

    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  const formatMessage = (text: string) => {
    return text.split('\\n').map((paragraph, index) => (
      <React.Fragment key={index}>
        {index > 0 && <div style={{ marginBottom: '0.5rem' }} />}
        {formatInlineStyles(paragraph)}
      </React.Fragment>
    ));
  };

  return (
    <div
      id="menuAvisosINPERA"
      className={Classes.container}
      ref={refMenuAvisos}
    >
      <div className={Classes.titulo}>
        <div className={Classes.textoTitulo}>Notificações</div>
        {existData && (
          <div
            onClick={() => {
              history.push('/admin/gerenciarAvisos');
            }}
            className={Classes.seeAllLink}
          >
            Ver todas
          </div>
        )}
      </div>
      <div className={Classes.msgContainer}>
        {existData ? (
          Avisos &&
          Avisos.length > 0 &&
          Avisos.map((av: any, idx: number) => {
            return (
              <React.Fragment key={av.id}>
                <div
                  onClick={(e: any) => {
                    e.stopPropagation();
                    if (av.link && av.link !== '') {
                      if (av.link.indexOf('https://') !== -1) {
                        window.open(av.link, '_blank');
                      } else {
                        history.push(av.link);
                      }
                    }

                    // setTimeout(() => {
                    //   dispatch(
                    //     atualizarAvisosBACKEND(
                    //       {
                    //         id: av.id,
                    //         lida: !av.lida,
                    //       },
                    //       history,
                    //     ),
                    //   );
                    // }, 500);
                    if (av.lida === false) {
                      // dispatch(
                      //   atualizarAvisosBACKEND(
                      //     {
                      //       id: av.id,
                      //       lida: true,
                      //     },
                      //     history,
                      //   ),
                      // );
                    }
                  }}
                  className={Classes.notificationCard}
                  style={{
                    backgroundColor: av.lida ? '#f1efec' : '#f8f6f2',
                  }}
                >
                  <div className={Classes.mainContainerMessage}>
                    <div className={Classes.status}>
                      <StatusIcon />
                    </div>
                    <div className={Classes.mensagem}>
                      {formatMessage(av.mensagem)}
                      <span className={Classes.created}>
                        {dataConverter(av.dataCriacao)}
                      </span>
                    </div>
                    {av.lida ? null : (
                      <div className={Classes.sectionNotRead}>
                        <div className={Classes.notRead}></div>
                        <span className={Classes.text}>não lida</span>
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <div className={Classes.containerNoData}>
            <IoMdNotificationsOff size={52} />
            <h1>Não existem avisos!</h1>
          </div>
        )}
      </div>
      <div className={Classes.footer}>
        <div
          onClick={
            () => {}
            // dispatch(atualizarTodosAvisos(true, TypeNotificacoes.cabecalho))
          }
          className={Classes.checkAllRead}
        >
          <BiCheckDouble size="2rem" />
          Marcar todos como lido
        </div>
      </div>
    </div>
  );
};

export default MenuAvisos;
