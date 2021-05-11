import ReactDOM from "react-dom";
import { renderToApp } from "../index";

describe("test index", () => {
  const originalRender = ReactDOM.render;
  const originalGetElement = global.document.getElementById;
  beforeEach(() => {
    global.document.getElementById = () => true;
    ReactDOM.render = jest.fn();
  });
  afterAll(() => {
    global.document.getElementById = originalGetElement;
    ReactDOM.render = originalRender;
  });
  it("should call ReactDOM.render", () => {
    renderToApp(true);
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
