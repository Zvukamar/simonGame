import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MAIN_STACK_ROUTES } from './routes';

export type MainStackProps = {
  [MAIN_STACK_ROUTES.GAME_SCREEN]: undefined;
  [MAIN_STACK_ROUTES.RESULT_SCREEN]: { showModal?: boolean };
};

export type StackScreenProps = NativeStackScreenProps<any>;
