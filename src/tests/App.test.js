import * as React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import App from '../App';

configure({adapter: new Adapter()});
describe('App', () => {
  it('should render login', () => {
    const wrapper = mount(<App />);
    expect(wrapper.text().includes('Join Chat')).toBe(true);
  });
});