import * as React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { ChatInput } from '../../../pages/ChatView/components/ChatInput';
import { SocketContext } from '../../../contexts/socket';

configure({ adapter: new Adapter() });
describe('MyComponent', () => {
  
  it('should emit typing', () => {
    const socket = {
      on:jest.fn(),
      emit: jest.fn()
    };
    const emitSpy = jest.spyOn(socket, 'emit');
    const wrapper = mount(
      <SocketContext.Provider value={[socket, jest.fn()]}>
        <ChatInput  />
      </SocketContext.Provider>
    ); 
    wrapper.find('input:not([type])').simulate('change', {target: {value: 'val'}});
    expect(wrapper.find('input:not([type])').get(0).props.value).toBe('val');
    expect(emitSpy).toBeCalledWith('typing', true);
  });
  
  it('should emit typing false', () => {
    const socket = {
      on:jest.fn(),
      emit: jest.fn()
    };
    const emitSpy = jest.spyOn(socket, 'emit');
    const wrapper = mount(
      <SocketContext.Provider value={[socket, jest.fn()]}>
        <ChatInput  />
      </SocketContext.Provider>
    ); 
    wrapper.find('input:not([type])').simulate('change', {target: {value: ''}});
    expect(wrapper.find('input:not([type])').get(0).props.value).toBe('');
    expect(emitSpy).toBeCalledWith('typing', false);
  });
  
});
