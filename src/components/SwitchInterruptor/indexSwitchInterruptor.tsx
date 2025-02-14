import React from 'react';

import {
  Switch,
  FormControlLabel,
  SwitchProps,
  SwitchClassKey,
  FormGroup,
} from '@material-ui/core';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

import { colorText, greenInpera, redInpera } from '../../utils/colorsInpera';
import { InterfaceSwithProps } from './interfaceSwitchInterruptor';
import { BiSliderAlt } from 'react-icons/bi';
import { Button } from './stylesSwitchInterruptor';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 62,
      height: 25,
      padding: 0,
      margin: 0,
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(3.6rem)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: `${greenInpera}`,
          opacity: 1,
          border: `0.1rem solid ${theme.palette.grey[600]}`,
        },
      },
    },
    thumb: {
      width: 24,
      height: 23,
    },
    track: {
      borderRadius: 26 / 2,
      border: `0.1rem solid ${theme.palette.grey[600]}`,
      backgroundColor: `${redInpera}`,
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const SwitchInterruptor: React.FC<InterfaceSwithProps> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: props.margin ? props.margin : '0.7rem 0 0 0',
        height: 'inherit',
      }}
    >
      <label
        style={{
          color: colorText,
          fontSize: props.fontSizeLabel ? props.fontSizeLabel : '1.4rem',
          fontWeight: 600,
          margin: props.marginLabel ? props.marginLabel : '0',
          textAlign: props.alignLabel ? props.alignLabel : 'start',
          width: '100%',
        }}
      >
        {props.label}
        {props.showButton && (
          <Button onClick={props.onButtonHandleClick} type="button">
            <BiSliderAlt />
          </Button>
        )}
      </label>
      <FormGroup
        style={{
          display: 'flex',
          alignSelf: props.alignFormGroup || 'flex-start',
        }}
      >
        <FormControlLabel
          style={{
            padding: 0,
            margin: 0,
          }}
          control={
            <IOSSwitch
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              name={props.name}
              id={props.id}
              value={
                props.value && props.value !== undefined ? props.value : false
              }
              checked={
                props.checked && props.checked !== undefined
                  ? props.checked
                  : false
              }
              disabled={props.disabled}
              tabIndex={props.tabIndex}
            />
          }
          label=""
        />
      </FormGroup>
    </div>
  );
};

export default SwitchInterruptor;
