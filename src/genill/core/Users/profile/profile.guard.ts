import { ORDER_GET_USER_PROFILE } from '@/genill/core/Users/profile/profile.types';
import store from '@/store/store';

export function ProfileGuard() {
  store.dispatch(ORDER_GET_USER_PROFILE);
}
