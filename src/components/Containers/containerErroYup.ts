import styled from 'styled-components';

interface PropsYUP {
  maxWidth?: string;
}

export const ContainerYUP = styled.div<PropsYUP>`
  display: flex;
  flex-wrap: nowrap;
  color: #c53030;
  font-size: 1.2rem;
  max-width: ${(props: PropsYUP) =>
    props.maxWidth ? props.maxWidth : undefined};
  font-family: 'Source Pro Sans', sans-serif;
  font-weight: 400;
  /* margin: 0.3rem; */
  text-align: center;
`;
