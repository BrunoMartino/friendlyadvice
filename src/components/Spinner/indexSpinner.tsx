import React from 'react';
import Classes from './spinnerStyles.module.css';

interface TypeSpinner {
  text?: string;
}

const Spinner: React.FC<TypeSpinner> = ({ text }: TypeSpinner) => {
  return (
    <div className={Classes.Container}>
      <div className={Classes.Text}>
        <h1>{text ? text : `Aguarde, estamos preparando tudo para você :D`}</h1>
      </div>
      <div className={Classes.Loading} />
    </div>
  );
};

export default Spinner;
