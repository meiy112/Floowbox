export type InputProps = {
  label?: string | React.ReactElement;
  color?: string;
  value?: number | null;
  max?: number;
  min?: number;
  isWholeNumber?: boolean;
  updateValue: (value: number) => void;
  type: string;
};
