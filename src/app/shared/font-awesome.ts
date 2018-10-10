import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleNotch,
  faHome,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

export const initFontAwesomeLibrary = () => {
  library.add(faCircleNotch);
  library.add(faHome);
  library.add(faUserPlus);
};
