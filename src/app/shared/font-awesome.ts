import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export const initFontAwesomeLibrary = () => {
  library.add(faCircleNotch);
  library.add(faUserPlus);
};
