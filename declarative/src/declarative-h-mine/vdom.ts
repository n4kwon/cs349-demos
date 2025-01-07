/**
 * adapted from JavaScript version in "O" by Serge Zaitsev
 * https://github.com/zserge/o
 */

// Define types for the virtual node structure
export type EventListener = (event?: Event) => void;

export type VNodeProps = {
  [key: string]: string | EventListener;
};

export type VNodeChildren = (VNode | string)[];

export type VNode = {
  type: string;
  props: VNodeProps;
  children: VNodeChildren;
};

// /**
//  * hyperscript virtual node function
//  * @param type - Element type, e.g. "div", "button"
//  * @param props - Object containing attribute key-value pairs
//  * @param children - Array of child nodes or text
//  * @returns VNode - Virtual node structure
//  */
export function h(
  type: string,
  props: VNodeProps = {},
  children: string | VNodeChildren = []
): VNode {
  // convert single string child to an array
  if (typeof children === "string") {
    children = [children];
  }
  return { type, props, children };
}

/**
 * Render hyperscript virtual node tree into a DOM element tree
 * @param vnode - Root of virtual node tree
 * @param dom - DOM element to render into
 */
export function render(vNode: VNode, dom: HTMLElement): void {
  dom.replaceChildren(_render(vNode));
}

/**
 * Render hyperscript virtual node to a DOM element
 * (recursive calls produce a DOM tree fragment)
 * @param vnode - Hyperscript virtual node
 * @returns Root element with children
 */
function _render(vnode: VNode | string): Node {
  // If vnode is a string, create a text node
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

  // vnode is a tag, so create the corresponding DOM element
  const el = document.createElement(vnode.type);

  // Copy vnode attributes into new DOM element
  const attributes = vnode.props || {};
  for (const key in attributes) {
    const value = attributes[key];
    if (typeof value === "string") {
      // Set standard attribute
      el.setAttribute(key, value as string);
    } else if (key.startsWith("on")) {
      // Handle event listener attributes
      const type = key.substring(2).toLowerCase();
      el.addEventListener(type, value as EventListener);
    } else {
      console.warn(`Can't render attribute ${key}`);
    }
  }

  // Recursively render child nodes
  vnode.children.forEach((c) => el.appendChild(_render(c)));

  return el;
}
