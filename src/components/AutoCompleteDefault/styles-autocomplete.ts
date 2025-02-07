import styled from 'styled-components';
import {
  backgroundInpera10,
  backgroundInperaInput,
  borderInput,
  borderInputFocus,
  colorText,
} from '../../utils/colorsInpera';

export const Content = styled.div`
  position: relative;
`;

export const Options = styled.div`
  position: absolute;
  max-height: 17rem;
  width: 100%;
  overflow: auto;
  z-index: 1;

  ul {
    text-decoration: none;
    list-style: none;
    border: 0.15rem solid ${borderInput};

    z-index: 1;
  }

  .autocomplete-opcao {
    background-color: #fff;
    padding: 0 0.6rem;
    color: ${colorText};
    font-size: 1.4rem;
    cursor: pointer;
    min-height: 2rem;
    display: flex;
    position: relative;

    :hover {
      background-color: ${backgroundInpera10};
    }
  }
  .autocomplete-opcao-secondkey {
    position: absolute;
    left: auto;
    right: 1rem;
    color: #484b5495;
  }
`;

export const InputSearch = styled.div`
  width: 100%;
  height: 2.7rem;
  background: ${backgroundInperaInput};
  border: 0.15rem solid ${borderInput};
  color: ${colorText};
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  text-align: ${(props: any) =>
    props.alinhamento ? props.alinhamento : 'start'};

  padding: 0.5rem;
  font-size: 1.4rem;
  cursor: text;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  display: flex;
  align-items: center;

  input {
    border: none;
    width: 100%;
    background: ${backgroundInperaInput};
  }

  .autocomplete-nobody {
    position: absolute;
    display: flex;
    align-items: center;
    background-color: #c2213b50;
    color: #c2213b;
    font-size: 0.8rem;
    padding: 0.5rem;
    right: 0.1rem;
    left: auto;
    background-color: #00a04a20;
    color: #00a04a;
    border-radius: 0.2rem;
    span {
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .autocomplete-document {
    padding-right: '2.5rem';
    color: #484b5495;
  }

  :focus-within {
    border: 0.15rem solid ${borderInputFocus};
  }
`;
