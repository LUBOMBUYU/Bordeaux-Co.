import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

/**
 * A generic, type-safe navigation function.
 * @param navigation The navigation prop from a component.
 * @param screen The name of the screen to navigate to.
 * @param params Optional parameters for the screen.
 */
export function navigateTo<T extends keyof RootStackParamList>(
  navigation: NavigationProp<RootStackParamList>,
  screen: T,
  params?: RootStackParamList[T]
) {
  // Use type assertion to fix TypeScript error
  navigation.navigate(screen as any, params as any);
}

export function goBack(navigation: NavigationProp<RootStackParamList>) {
  navigation.goBack();
}
