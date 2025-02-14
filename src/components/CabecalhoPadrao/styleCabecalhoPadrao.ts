import styled from 'styled-components';
import { backgroundInpera, backgroundInpera10, redInpera } from '../../utils/colorsInpera';
import { _mediaQueryCadastros } from '../../utils/consts';

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  background: ${backgroundInpera};
  /* background: ${backgroundInpera10}; */
  justify-content: center;

  width: inherit;
  min-width: 100vw;
  min-height: 7.539rem;

  font-family: 'Source Sans Pro', sans-serif;
  z-index: 1000;
  position: fixed;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr auto;

  height: inherit;

  margin: 0 1rem;

  @media (max-width: ${_mediaQueryCadastros}px) {
    justify-content: space-between;
    align-items: center;
  }

  .imagemLOGO {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2.5rem;
    /* height: 5rem; */
    width: 4.759rem;
    img {
      height: 5rem;
      width: 4.759rem;
      object-fit: cover;

      cursor: pointer;
      transition: filter 0.2;

      &:hover {
        filter: brightness(95%);
      }
    }
  }
`;

export const MenuHeader = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, min-content);
  align-items: center;
  align-content: flex-end;
  gap: 3.5rem;



  @media (max-width: ${_mediaQueryCadastros}px) {
    gap: 0.5rem;

    svg {
      font-size: 3rem;
      color: var(--color-branco);
    }
  }

  .icons {
    display: flex;
    position: relative;
    align-self: center;
    align-items: center;
    cursor: pointer;
    transition: filter 0.2;

    &:hover {
      filter: brightness(95%);
    }

    svg {
      font-size: 3rem;
      color: var(--color-branco);
    }
  }
`;

export const IconsNotifications = styled.div`
  display: grid;
  grid-template-columns: repeat(3, min-content);
  color: var(--color-branco);

  h4 {
    font-size: 1.4rem;
    font-weight: 600;
    text-align: left;
  }

  p {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }

  #iconsAlertHeader {
    position: relative;
    padding: 0 2.5rem 0 2.5rem;

    @media (max-width: ${_mediaQueryCadastros}px) {
      padding: 0 1.5rem 0 2rem;
    }
  }

  .numbersNotification {
    display: flex;
    position: absolute;
    left: 4rem;
    bottom: 1.3rem;
    /* align-items: center;*/
    justify-content: center;
    border: none;
    background-color: ${redInpera};
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;

    @media (max-width: ${_mediaQueryCadastros}px) {
      left: 3.8rem;
    }

    p {
      font-size: 1.2rem;

      align-self: center;

      -webkit-touch-callout: none; //iPhone OS, Safari
      -webkit-user-select: none; /* Chrome, Safari 3 */
      -khtml-user-select: none; /* Safari 2 */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+ */
      user-select: none; /* Possível implementação no futuro */
    }
  }

  .icons {
    display: flex;
    align-self: center;
    align-items: center;
    cursor: pointer;
    transition: filter 0.2;

    svg:hover {
      filter: brightness(85%);
    }

    svg {
      font-size: 3.5rem;
      color: var(--color-branco);
    }
  }

  .icons-message {
    display: flex;
    align-self: center;
    align-items: center;
    cursor: pointer;
    transition: filter 0.2;
    padding-right: 0.8rem;

    &:hover {
      filter: brightness(95%);
    }

    svg {
      font-size: 3rem;
      color: var(--color-branco);
    }
  }

  .icons-user {
    display: flex;
    align-self: center;
    align-items: center;
    cursor: pointer;
    transition: filter 0.2;
    width: auto;

    &:hover {
      filter: brightness(95%);
    }

    svg {
      font-size: 3rem;
      color: var(--color-branco);
    }
  }

  .user {
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: flex-start;

    margin-top: 1.5rem;

    @media (max-width: ${_mediaQueryCadastros}px) {
      padding-left: 0;
      padding-right: 0;
    }
  }
`;
