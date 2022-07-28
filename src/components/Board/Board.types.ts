import { ColorValue } from 'react-native';

export interface BoardProps {
  isGameStarted: boolean;
}

export interface SquareDataType {
  color: ColorValue;
  sound: string;
}
