import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Container } from './MenuSlide.Styled';
import { FcMenu } from 'react-icons/fc';
import Menu from './Menu/MenuSlide.Menu.Index';

const MenuSlide: React.FC = () => {
  const [show, setShow] = useState(false);
  const refMenuSlide = useRef<HTMLDivElement>(null);

  const handleClickToShowMenu = useCallback((state: boolean) => {
    setShow(state);
  }, []);

  const closeMenu = useCallback(
    (event: any) => {
      if (
        refMenuSlide &&
        refMenuSlide.current &&
        refMenuSlide.current.contains(event.target)
      ) {
        return;
      }

      handleClickToShowMenu(false);
    },
    [refMenuSlide],
  );

  useEffect(() => {
    document.body.addEventListener('click', closeMenu);

    return () => {
      document.body.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <Container ref={refMenuSlide}>
      <FcMenu size={35} onClick={() => handleClickToShowMenu(true)} />
      {show ? <Menu handleClickToShowMenu={handleClickToShowMenu} /> : null}
    </Container>
  );
};

export default MenuSlide;
