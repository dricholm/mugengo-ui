import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleNotch,
  faCog,
  faComments,
  faHome,
  faMinus,
  faPlus,
  faUsers,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

export const initFontAwesomeLibrary = () => {
  library.add(faCircleNotch);
  library.add(faCog);
  library.add(faComments);
  library.add(faHome);
  library.add(faMinus);
  library.add(faPlus);
  library.add(faUsers);
  library.add(faUserPlus);
};
