import React, { useState } from 'react';
import { Container, Body, NavItem } from './MenuSlide.Menu.Styles';
import { BiChart, BiSearch } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface IMenu {
  handleClickToShowMenu: (state: boolean) => void;
}

const Menu: React.FC<IMenu> = (props) => {
  const history = useHistory();
  const [subMenu, setSubMenu] = useState(false);

  // Não apagar funções abaixo utilizadas no subMenu

  // const handleClickVendas = useCallback((): void => {
  //   setSubMenu(!subMenu);
  // }, [subMenu]);

  // const handleCloseSubMenu = useCallback((): void => {
  //   setSubMenu(false);
  // }, []);

  const dispatch = useDispatch();
  return (
    <Container>
      <Body>
        <div className="inputDiv">
          <div className="searchIcon">
            <BiSearch size={19} />
          </div>
          <input
            type="text"
            disabled
            placeholder="Buscar..."
            style={{ opacity: 0.3 }}
          />
          <button
            className="buttonCloseMenu"
            onClick={() => props.handleClickToShowMenu(false)}
            style={{
              display: !subMenu ? 'initial' : 'none',
            }}
          >
            X
          </button>
        </div>

        <div className="subTitle">
          <span>RESUMOS</span>
          {/* <span>RESUMOS</span> */}
        </div>
        <div className="itensDiv">
          <NavItem>
            <p
              onClick={() => {
                history.push('/resumos/vendasdiarias');
              }}
              // onClick={handleClickVendas}
              style={{
                width: '100%',
                borderBottom: subMenu
                  ? '1px solid rgba(255,255,255, .4)'
                  : 'none',
                background: subMenu
                  ? 'linear-gradient(90deg, rgba(208, 148, 75, 0.5) 0%, rgba(44, 47, 56, 0) 12.28%)'
                  : 'none',
              }}
            >
              <span>
                <BiChart size={23} style={{ marginBottom: '3px' }} />
              </span>
              {/* Vendas */}
              Vendas Diárias
            </p>
          </NavItem>
        </div>
      </Body>

      {/* Deixar somente um menu por enquanto, não apagar codigo do subMenu abaixp */}
      {/* {subMenu && (
        <div
          className="subMenu-divPai"
          style={{
            transition: 'all 220ms cubic-bezier(.77,.01,.23,1.01)',
          }}
        >
          <button className="buttonCloseMenu" onClick={handleCloseSubMenu}>
            X
          </button>
          <NavItem>
            <p className="tittleSubMenu">
              <span>
                <BiChart size={22} />
              </span>
              Resumo de Vendas
            </p>
          </NavItem>
          <NavItem>
            <div
              className="subItens"
              onClick={() => {
                // dispatch(setFilterOnReduxVendasDiariasSave(false));
                dispatch(SetLimparFiltrosVendasDiarias());
                history.replace('/resumos/vendasdiarias');
              }}
            >
              <p>
                <span>
                  <BiCalendar size={22} />
                </span>
                Vendas Diárias
              </p>
            </div>
          </NavItem>
        </div>
      )} */}
    </Container>
  );
};

export default Menu;
