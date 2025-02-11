import styled from 'styled-components';
import { boxShadowDashboard, _mediaQuery } from '../../../utils/consts';
interface IBox {
  colorBackground: string;
}

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  width: 100%;
  padding: 0.8rem 0;

  -webkit-touch-callout: none; /* iPhone OS, Safari */
  -webkit-user-select: none; /* Chrome, Safari 3 */
  -khtml-user-select: none; /* Safari 2 */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  user-select: none; /* Possível implementação no futuro */
`;

export const Container = styled.div`
  display: flex;
  flex-flow: row;
  overflow-x: auto;

  @media (max-width: ${_mediaQuery}px) {
    flex-flow: row wrap;
  }
`;

export const Box = styled.div<IBox>`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  text-justify: center;
  width: 100%;
  height: 15.2rem;
  margin-right: 1rem;
  box-shadow: ${boxShadowDashboard};

  &:last-child {
    margin-right: 0;
  }

  background: ${(props) => props.colorBackground};

  header {
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    border-bottom: 0.16rem solid white;
    font-weight: 600;
    font-size: 2.88rem;
    background: transparent;

    p {
      color: white;
    }
  }

  .icon {
    margin-top: 0.2rem;
    color: white;
  }

  @media (max-width: ${_mediaQuery}px) {
    margin-right: 0;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 1rem;
    }
  }
`;

export const NumberValue = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  height: 100%;

  .Valor {
    margin-top: 0.64rem;
    font-size: 5.8rem;
  }
`;
