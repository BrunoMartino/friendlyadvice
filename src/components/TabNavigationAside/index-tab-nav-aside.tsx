import React from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';
import { MenuItem, MenuItems, MenuItemBack } from './styles-tab-nav-aside';

type typeLinkRequires = {
  handleLink: (e?: any) => void;
  selected: boolean;
  disabled?: boolean;
  descricao: string;
};

interface iTabNavAside {
  links: typeLinkRequires[];
  handleVoltar: () => void;
}

const TabNavigationAside: React.FC<iTabNavAside> = ({
  links,
  handleVoltar,
}) => {
  return (
    <MenuItems>
      <div className='options'>
        {links &&
          links.length > 0 &&
          links.map((link: typeLinkRequires, i: number) => (
            <MenuItem
              key={i}
              disabled={link.disabled}
              className={link.selected ? 'selected' : ''}
              onClick={() => {
                if (!link.disabled) link.handleLink();
              }}
            >
              {link.disabled ? <HiLockClosed /> : null} {link.descricao}
            </MenuItem>
          ))}
      </div>
      <div className='go-back-button'>
        <MenuItemBack onClick={handleVoltar}>
          <BsArrowLeftShort /> Voltar
        </MenuItemBack>
      </div>
    </MenuItems>
  );
};

export default TabNavigationAside;
