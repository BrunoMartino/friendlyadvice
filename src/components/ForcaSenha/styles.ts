import styled from 'styled-components';

export const Container = styled.div`
  .password-strength-meter {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .password-strength-meter-progress {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 1.5rem;
  }

  .password-strength-meter-progress::-webkit-progress-bar {
    background-image: linear-gradient(to right, #999999, #666360);
    border-radius: 0.2rem;
  }

  .password-strength-meter-progress::-webkit-progress-value {
    border-radius: 0.2rem;
    background-size: 3.5rem 2rem, 100% 100%, 100% 100%;
  }

  .strength-0::-webkit-progress-value {
    background-color: #ee4549;
  }
  .strength-25::-webkit-progress-value {
    background-color: #ee4549;
  }
  .strength-50::-webkit-progress-value {
    background-color: #fabc2c;
  }
  .strength-75::-webkit-progress-value {
    background-color: #70c1b3;
  }
  .strength-100::-webkit-progress-value {
    background-color: #3bb537;
  }
`;
