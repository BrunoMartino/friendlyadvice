import styled from 'styled-components';

export const ContentModalOpen = styled.div`
  user-select: none;

  padding: 0.8rem;

  @media (max-width: 500px) {
    padding: 0px;
  }

  .titleModal {
    display: flex;
    align-items: center;

    p {
      font-family: 'Poppins', sans-serif;
      font-size: 1.8rem;
    }
  }

  p {
    font-family: 'Poppins';
    color: black;
    font-size: 1.4rem;
    font-weight: 500;
  }
`;
