import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';

import Adpter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adpter() });
