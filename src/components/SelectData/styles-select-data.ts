import styled from 'styled-components';
import {
  backgroundInpera10,
  backgroundInperaInput,
  borderInput,
  borderInputFocus,
  colorText,
} from '../../utils/colorsInpera';

export const Select = styled.button`
  width: 100%;
  height: 2.7rem;
  /* background: ${(props: any) =>
    props.disabled ? '#dcdcdc' : backgroundInperaInput}; */
  opacity: ${(props: any) =>
    props.disabled ? 0.4 : 1};
  border: 0.15rem solid ${borderInput};
  color: ${colorText};
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  text-align: ${(props: any) =>
    props.alinhamento ? props.alinhamento : 'start'};

  padding-left: 0.5rem;
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .select-data-arrow {
    color: #707070;
    font-size: 1.3rem;
    padding: 0.3rem 0.1rem;
  }

  .select-data-selected {
    margin-right: 1rem;
    color: #484b5495;
  }

  &:hover > div .select-data-arrow {
    background-color: ${(props: any) =>
      props.disabled ? '#dcdcdc' : '#dedede'};
  }

  &:focus {
    border: 0.15rem solid ${borderInputFocus};
  }

  @media screen and (max-width: 650px) {
    height: 3.3rem;
  }

  @media screen and (max-width: 325px) {
    font-size: 1.2rem;
  }
`;

export const Options = styled.div`
  position: relative;
  ul {
    position: absolute;
    text-decoration: none;
    list-style: none;
    border: 0.15rem solid ${borderInput};
    width: 100%;
    z-index: 1;
  }

  .select-data-opcao {
    background-color: #fff;
    padding: 0 0.6rem;
    color: ${colorText};
    font-size: 1.4rem;
    cursor: pointer;
    min-height: 2rem;

    :hover {
      background-color: ${backgroundInpera10};
    }
  }
`;
