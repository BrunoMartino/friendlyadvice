import React from 'react';
import { backgroundInpera, colorText } from '../../utils/colorsInpera';

interface parametroGroupBox {
  label: string;
  underlineLabel?: boolean;
  fontSizeLabel?: string;
  fontWeightLabel?: any;
  width: string;
  padding?: string;
  margin?: string;
  border?: string;
}

const GroupBoxComponent: React.FC<parametroGroupBox> = ({ ...props }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        padding: props.padding,
        margin: props.margin,
        width: props.width,
        border: props.border
          ? props.border
          : `0.1rem solid ${backgroundInpera}`,
      }}
    >
      <label
        style={{
          color: colorText,
          fontSize: props.fontSizeLabel ? props.fontSizeLabel : '1.4rem',
          fontWeight: props.fontWeightLabel ? props.fontWeightLabel : '600',
          margin: '0',
        }}
      >
        {props.label}
        {props.underlineLabel ? (
          <div
            style={{
              display: 'flex',
              backgroundColor: backgroundInpera,
              margin: '0',
              height: '0.1rem',
            }}
          />
        ) : null}
      </label>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default GroupBoxComponent;
