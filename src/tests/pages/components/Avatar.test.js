import * as React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount, shallow } from 'enzyme';
import { Avatar } from '../../../pages/ChatView/components/Avatar';
import { AvatarContext } from '../../../contexts/avatar';

configure({ adapter: new Adapter() });
describe('MyComponent', () => {
  afterAll(() => {
    global.fetch.mockClear();
  });

  it('should fetch new avatar', () => {
    const mockFn = jest.spyOn(global, "fetch")
    mount(
      <AvatarContext.Provider value={[{}, jest.fn()]}>
        <Avatar username="test" />
      </AvatarContext.Provider>
    ); 
    expect(mockFn).toBeCalled();
  });
  
  
});
