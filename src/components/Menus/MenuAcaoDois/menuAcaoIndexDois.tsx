import { Dropdown } from 'react-bootstrap';
import React, { useState } from 'react';
import { MenuAcaoProps } from './interfaceMenuAcaoDois';
import './menuAcaoStyles.css';
import { backgroundInpera } from '../../../utils/colorsInpera';
import { useHistory } from 'react-router-dom';
import {
  // menuItensAdministracaoDois,
  menuItensAplicativos,
  // menuItensAplicativosDois,
  // menuItensCadastro,
  // menuItensSuprimentos,
} from '../../CabecalhoPadrao/MenuItens';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import useWindowSize from '../../../hooks/useWindowSize';
import { licencasExpiradas } from '../../../utils/fn';
import MenuAcao from '../MenuAcao/menuAcaoIndex';

const MenuAcaoDois: React.FC<MenuAcaoProps> = ({
  isMenu,
  isUser,
  isIconeCerto,
  ...props
}) => {
  const history = useHistory();
  const [openCadastro, setOpenCadastro] = useState(false);
  const [openAdministracao, setOpenAdministracao] = useState(false);
  const [openAplicativo, setOpenAplicativo] = useState(false);
  const [openSuprimentos, setOpenSuprimentos] = useState(false);
  const empresaAdmin = useSelector((state: any) => state.global.empresaAdmin);
  const configEmpresa = useSelector(
    (state: any) => state.global.configuracoesEmpresa.configuracoes,
  );
  const empresaAll = useSelector(
    (state: any) => state.global.empresa.empresaAll,
  );
  const licenca = useSelector(
    (state: any) => state.global.empresaLicencas.licencas,
  );

  const dispatch = useDispatch();

  const empresaId =
    empresaAdmin && empresaAdmin.id && empresaAdmin.id !== undefined
      ? empresaAdmin.id
      : empresaAll && empresaAll.id !== undefined && empresaAll.id;

  const checkLicenca = licencasExpiradas(empresaAdmin);

  const tokenAdm = localStorage.getItem('@INPERA:token_adm');

  const size = useWindowSize();

  const connectionPDV = useSelector(
    (state: any) => state.global.inperaPDV.connection.created,
  );

  // let menuMobileDois = menuItensDoMobile(empresaAdmin, licenca, false);
  // let menuCadastre = menuItensCadastro(empresaAdmin, configEmpresa, empresaAll);
  // let menuAdministration = menuItensAdministracaoDois(
  //   empresaAdmin,
  //   licenca,
  //   dispatch,
  //   empresaId,
  //   empresaAll,
  //   checkLicenca,
  // );
  // let menuApp = menuItensAplicativos(
  //   empresaAdmin,
  //   licenca,
  //   false,
  //   tokenAdm ? true : false,
  //   dispatch,
  //   empresaId,
  //   checkLicenca,
  //   history,
  //   size,
  //   connectionPDV,
  // );

  // let menuMobileTres = menuItensAplicativosDois(
  //   empresaAdmin,
  //   licenca,
  //   true,
  //   tokenAdm ? true : false,
  //   dispatch,
  //   empresaId,
  //   checkLicenca,
  //   history,
  //   size,
  //   connectionPDV,
  // );

  // let menuSuprimentos = menuItensSuprimentos(
  //   empresaAdmin,
  //   configEmpresa,
  //   // empresaAll,
  // );

  //const size = useWindowSize();

  return (
    <div className="Container-dois">
      <Dropdown onClick={props.handleOpen}>
        <Dropdown.Toggle variant={backgroundInpera} id="dropdown-basic">
          {props.nomeMenu ? props.nomeMenu : props.icon}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {/* {props.menuItens &&
            props.menuItens.length > 0 &&
            props.menuItens.map((menu: any, index: any) => {
              return ( */}
          <>
            {/* <Dropdown.Item
                    target={menu.blank}
                    key={index}
                    // href={menu.url}
                    onClick={() => {
                      menu?.onItemClick && menu.onItemClick();
                      history.push(menu.url);
                    }}
                    disabled={
                      menu.hasOwnProperty('inativo') &&
                        menu.inativo === true &&
                        menu.inativo !== undefined
                        ? true
                        : false
                    }
                  >
                    {menu.userName !== '' && menu.userEmail !== '' ? (
                      <div
                        style={{
                          color: colorText,
                          opacity: 0.5,
                        }}
                      >
                        {menu.userName}
                        {menu.userEmail && (
                          <>
                            {menu.userEmail}
                            <hr />
                          </>
                        )}
                      </div>
                    ) : undefined}
                    {menu.oculto ? (
                      <div style={{ opacity: 0.3, cursor: 'default' }}>
                        {menu.icone ? menu.icone : null} {menu.nome}
                      </div>
                    ) : (
                      <div
                        style={{
                          color:
                            menu.hasOwnProperty('inativo') &&
                              menu.inativo === true &&
                              menu.inativo !== undefined
                              ? borderInput
                              : colorBlack,
                          opacity:
                            menu.hasOwnProperty('inativo') &&
                              menu.inativo === true &&
                              menu.inativo !== undefined
                              ? 0.3
                              : 1,
                        }}
                      >
                        {menu.icone ? menu.icone : null} {menu.nome}
                      </div>
                    )}
                  </Dropdown.Item> */}
            {/* <button>TESTE</button> */}
            {size.width! / 16 <= 59.9375 &&
            ((empresaAll &&
              empresaAll.integracaoFacilite &&
              configEmpresa &&
              configEmpresa.precoDiferenciado) ||
              (!empresaAll.integracaoFacilite &&
                !empresaAdmin.cartaoVirtual)) ? (
              <div className="icones-textos">
                {/* <MenuAcao
                  isUser={true}
                  isOpen={openCadastro}
                  nomeMenu={'Cadastros'}
                  handleOpen={() => {
                    setOpenCadastro(!openCadastro);
                    setOpenAplicativo(false);
                    setOpenAdministracao(false);
                    setOpenSuprimentos(false);
                  }}
                  icon={<IoIosArrowDown />}
                  menuItens={menuCadastre}
                /> */}
              </div>
            ) : null}
            {process.env.REACT_APP_ENV !== 'PROD' &&
              size.width! / 16 <= 59.9375 &&
              empresaAll &&
              !empresaAll.integracaoFacilite && (
                <div className="icones-textos">
                  {/* <MenuAcao
                    isUser={true}
                    isOpen={openSuprimentos}
                    nomeMenu={'Suprimentos'}
                    handleOpen={() => {
                      setOpenSuprimentos(!openSuprimentos);
                      setOpenAplicativo(false);
                      setOpenCadastro(false);
                      setOpenAdministracao(false);
                    }}
                    icon={<IoIosArrowDown />}
                    menuItens={menuSuprimentos}
                  /> */}
                  {/* <IoIosArrowDown style={{ width: '20px' }} /> */}
                </div>
              )}
            {size.width! / 16 <= 59.9375 && (
              <div className="icones-textos">
                {/* <MenuAcao
                  isUser={true}
                  isOpen={openAplicativo}
                  nomeMenu={'Aplicativos'}
                  handleOpen={() => {
                    setOpenAplicativo(!openAplicativo);
                    setOpenCadastro(false);
                    setOpenAdministracao(false);
                    setOpenSuprimentos(false);
                  }}
                  icon={<IoIosArrowDown />}
                  menuItens={menuMobileTres}
                /> */}
                {/* <IoIosArrowDown style={{ width: '20px' }} /> */}
              </div>
            )}
            {size.width! / 16 <= 59.9375 && (
              <div className="icones-textos">
                {/* <MenuAcao
                  isUser={true}
                  isOpen={openAdministracao}
                  nomeMenu={'Administração'}
                  handleOpen={() => {
                    setOpenAdministracao(!openAdministracao);
                    setOpenAplicativo(false);
                    setOpenCadastro(false);
                    setOpenSuprimentos(false);
                  }}
                  //icon={<IoIosArrowDown />}
                  menuItens={menuAdministration}
                /> */}
                {/* <IoIosArrowDown style={{ width: '20px' }} /> */}
              </div>
            )}
          </>
          {/* );
            })} */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default MenuAcaoDois;
