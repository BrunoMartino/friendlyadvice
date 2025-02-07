import { Dropdown } from 'react-bootstrap';
import React, { Fragment } from 'react';
import { MenuAcaoProps } from './interfaceMenuAcao';
import './menuAcaoStyles.css';
import {
  backgroundInpera,
  colorBlack,
  colorText,
  borderInput,
} from '../../../utils/colorsInpera';
import { useHistory } from 'react-router-dom';

import { IoIosArrowDown } from 'react-icons/io';

const MenuAcao: React.FC<MenuAcaoProps> = ({ isUser, ...props }) => {
  const history = useHistory();

  return (
    <div className="Container">
      <Dropdown className='teste' onClick={props.handleOpen}>
          {/* {console.log(props.isOpen, 'props.isOpen')} */}
          <Dropdown.Toggle
            className={!props.isOpen ? 'conteudo-rotacionado' : 'conteudo'}
            //onClick={teste}
            variant={backgroundInpera}
            id="dropdown-basic"
            style={{
              // transform: rotacionado ? 'rotateZ(180deg)' : 'rotateZ(360deg)',
              display: props.icon !== <IoIosArrowDown /> ? 'flex' : 'flex',
              width: isUser ? '180px' : 'auto',
              fontSize: isUser ? '1.5rem' : '',
              color: isUser ? '#2C2F38' : '',
              alignItems: props.icon !== <IoIosArrowDown /> ? 'center' : '',
              justifyContent:
                props.icon !== <IoIosArrowDown /> ? 'space-between' : '',
              paddingRight: isUser ? '' : '20px',
            }}
          >
            {props.nomeMenu ? props.nomeMenu : props.icon}
          </Dropdown.Toggle>

        <Dropdown.Menu className={isUser ? 'teste' : 'teste-dois'}>
          {props.menuItens &&
            props.menuItens.length > 0 &&
            props.menuItens.map((menu: any, index: any) => {

              return (
                <Fragment key={index}>
                  <Dropdown.Item
                    target={menu.blank}
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
                  </Dropdown.Item>
                  {/* <button>TESTE</button> */}
                  {/* {size.width! / 16 <= 59.9375 && (
                  <MenuAcao
                    isOpen={openCadastro}
                    nomeMenu={'Cadastros'}
                    handleOpen={() => {
                      setOpenCadastro(true);
                    }}
                    icon={<IoIosArrowDown />}
                    menuItens={menuCadastre}
                  />
                  )} */}
                </Fragment>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default MenuAcao;
