import React, { useState } from 'react';

import {
  ContainerHeader,
  Header,
  IconsNotifications,
  MenuHeader,
} from './styleCabecalhoPadrao';

import { IoIosArrowDown, IoMdNotifications } from 'react-icons/io';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { useSelector } from 'react-redux';
import { logoPadrao } from '../../utils/imagensPadrao';
import MenuAcao from '../Menus/MenuAcao/menuAcaoIndex';
import { menuItensAplicativos, menuUsuario } from './MenuItens';
import { Hidden } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import MenuAvisos from './MenuAvisos/indexMenuAvisos';
import Spinner from '../Spinner/indexSpinner';
import { FaUserAlt } from 'react-icons/fa';

const CabecalhoPadrao: React.FC = () => {
  const history = useHistory();
  const [openAplicativo, setOpenAplicativo] = useState(false);
  const [openMenuUsuario, setOpenMenuUsuario] = useState(false);
  const empresaAdmin = useSelector((state: any) => state.global.empresaAdmin);
  const empresaAll = useSelector(
    (state: any) => state.global.empresa.empresaAll,
  );
  const token = localStorage.getItem('@INPERA:token');
  const tokenAdm = localStorage.getItem('@INPERA:token_adm');

  const empresaId =
    empresaAdmin && empresaAdmin.id && empresaAdmin.id !== undefined
      ? empresaAdmin.id
      : empresaAll && empresaAll.id !== undefined && empresaAll.id;

  const quantidadeAvisos = useSelector(
    (state: any) => state.session.avisosRetaguarda.count,
  );

  const abrirMenuAvisos = useSelector(
    (state: any) => state.session.avisosRetaguarda.abrir,
  );

  let usuarioNome = '';
  let usuarioEmail = '';
  let decoded;

  if (tokenAdm) {
    decoded = jwt.decode(tokenAdm, { json: true });
    usuarioNome = decoded?.usuarioNome.split(' ')[0];
    usuarioEmail = decoded?.usuarioEmail;
  }
  if (token) {
    decoded = jwt.decode(token, { json: true });
    usuarioNome = decoded?.usuarioNome.split(' ')[0];
    usuarioEmail = decoded?.usuarioEmail;
  }

  let menuApp = menuItensAplicativos();

  const handleVoltar = () => {
    history.push(`/dashboard`);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          top: 0,
          height: '6.8rem',
          zIndex: 1300,
        }}
      >
        <ContainerHeader>
          <Helmet>
            <title>{`${quantidadeAvisos > 0 ? `(${quantidadeAvisos}) -` : ''} ${
              empresaAdmin.nomeFantasia
            }`}</title>
            <style>{'body { background-color: #f0edf5; }'}</style>
          </Helmet>
          <Header>
            <div className="imagemLOGO">
              {
                <LazyLoadImage
                  onClick={handleVoltar}
                  src={
                    empresaAll &&
                    empresaAll.logoTipoImagem &&
                    empresaAll.logoTipoImagem !== null
                      ? empresaAll.logoTipoImagem
                      : logoPadrao
                  }
                />
              }
            </div>

            <MenuHeader>
              <Hidden smDown>
                <MenuAcao
                  isUser={false}
                  isOpen={openAplicativo}
                  nomeMenu={'Aplicativos'}
                  handleOpen={() => {
                    setOpenAplicativo(true);
                  }}
                  icon={<IoIosArrowDown />}
                  menuItens={menuApp}
                />
              </Hidden>
            </MenuHeader>
            <IconsNotifications>
              <span className="icons" id="iconsAlertHeader">
                <IoMdNotifications />

                {quantidadeAvisos > 0 && (
                  <span className="numbersNotification">
                    <p>{quantidadeAvisos > 99 ? '99+' : quantidadeAvisos}</p>
                  </span>
                )}
              </span>

              <span className="icons-user" style={{ zIndex: 1000 }}>
                <Hidden smDown>
                  <MenuAcao
                    isUser={false}
                    isOpen={openMenuUsuario}
                    icon={<FaUserAlt />}
                    handleOpen={() => {
                      setOpenMenuUsuario(true);
                    }}
                    menuItens={menuUsuario({ usuarioEmail, usuarioNome })}
                  />
                </Hidden>
                <Hidden mdUp>
                  <MenuAcao
                    isOpen={openMenuUsuario}
                    icon={<FaUserAlt />}
                    handleOpen={() => {
                      setOpenMenuUsuario(true);
                    }}
                    menuItens={menuUsuario({ usuarioEmail, usuarioNome })}
                  />
                </Hidden>
                <Hidden smDown>
                  <span className="user">
                    <h4>{usuarioNome}</h4>
                    <h4>{usuarioEmail}</h4>
                  </span>
                </Hidden>
              </span>
            </IconsNotifications>
          </Header>
        </ContainerHeader>
        {abrirMenuAvisos && <MenuAvisos />}
      </div>
    </>
  );
};

export default CabecalhoPadrao;
