import React from "react";
import { shallow, render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import SearchRadius from "./components/SearchRadius.js";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  // container *must* be attached to document so events work correctly.
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("changes value when clicked", () => {
  const onSelect = jest.fn();
  act(() => {
    shallow(<SearchRadius parentCallback={onSelect} />, container);
  });

  //const input = wrapper.find('input');
  //input.simulate('change', { target: { value: 'abcdefg'} });
  //input.simulate('keydown', { keyCode: 13 });
  
  // get ahold of the select element, and trigger some clicks on it
  const select = document.querySelector("[labelId=select-radius-label]");
  expect(select.innerHTML).toBe("-1");

  act(() => {
    select.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(select.innerHTML).toBe("Turn off");

  act(() => {
    for (let i = 0; i < 5; i++) {
        select.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  expect(onSelect).toHaveBeenCalledTimes(6);
  expect(select.innerHTML).toBe("Turn on");
});