export type TextAlign =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent'
  | undefined;
export interface InterfaceSwithProps {
  id?: string;
  name: string;
  checked?: any;
  disabled?: any;
  tabIndex?: any;
  value?: any;
  alignFormGroup?: any;
  handleBlur?: (...args: any) => void;
  handleChange: (...args: any) => void;
  margin?: string;
  label?: string;
  fontSizeLabel?: string;
  alignLabel?: TextAlign;
  marginLabel?: string;
  showButton?: boolean;
  onButtonHandleClick?: () => void;
  mini?: boolean;
}
