// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// IntersectionObserver can't be actually tested but throws an error with Jest
window.IntersectionObserver = function () {
  this.observe = () => {};
  this.unobserve = () => {};
};
