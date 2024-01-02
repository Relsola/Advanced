import VNode from 'core/vdom/modules/vnode';
import { Component } from './component';

export type InternalComponentOptions = {
  _isComponent: true;
  parent: Component;
  _parentVnode: VNode;
  render?: Function;
  staticRenderFns?: Array<Function>;
};

export type ComponentOptions = {};
