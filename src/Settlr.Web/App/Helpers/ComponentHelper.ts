export function bindAllThis<T>(component: T): T {
  "use strict";

  for (var x in component) {
    if (typeof component[x] === "function") {
      component[x] = component[x].bind(component);
    }
  }
  return component;
}