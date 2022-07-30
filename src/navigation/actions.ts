import { CommonActions } from '@react-navigation/native';
import { MAIN_STACK_ROUTES } from './routes';

export const navigateToResultScreen = (params?: any) => {
  return CommonActions.navigate({
    name: MAIN_STACK_ROUTES.RESULT_SCREEN,
    params,
  });
};
