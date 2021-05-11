import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { mount } from "enzyme";
import { ChatView } from "../../pages/ChatView";
import { Router } from 'react-router-dom';
import { SocketContext } from "../../contexts/socket";

Enzyme.configure({ adapter: new Adapter() });
let historyMock;
beforeEach(() => {
  React.useState = jest.fn().mockReturnValue([{}, {}]);
  historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
});
window.HTMLElement.prototype.scrollIntoView = function() {};
it("renders correctly", () => {
  const socket = {
    on:jest.fn()
  };
  const onSpy = jest.spyOn(socket, 'on');
  mount(
    <SocketContext.Provider value={[socket, jest.fn()]}>
       <Router history={historyMock}>
        <ChatView location={{username:"test"}}/>
      </Router>
    </SocketContext.Provider>
  );
  expect(onSpy).toHaveBeenCalled();
});

it("rendirects the user", () => {
  const socket = null;
  mount(
    <SocketContext.Provider value={[socket, jest.fn()]}>
       <Router history={historyMock}>
        <ChatView location={{username:"test"}}/>
      </Router>
    </SocketContext.Provider>
  );
  expect(historyMock.push).toBeCalled();
});