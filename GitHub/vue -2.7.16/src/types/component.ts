import VNode from 'core/vdom/modules/vnode';
import { ComponentOptions } from './options';

export declare class Component {
  constructor(options?: any);

  static cid: number;
  static options: Record<string, any>;

  // extend
  static sealedOptions: Record<string, any>;

  // 公共属性
  $el: any;
  $data: Record<string, any>;
  $props: Record<string, any>;
  $options: ComponentOptions;
  $parent: Component | undefined;
  $root: Component;
  $children: Array<Component>;
  $refs: { [key: string]: Component | Element | Array<Component | Element> | undefined };
  $slots: { [key: string]: Array<VNode> };
  $scopedSlots: { [key: string]: () => VNode[] | undefined };
  $vnode: VNode;
  $attrs: { [key: string]: string };
  $listeners: Record<string, Function | Array<Function>>;
  $isServer: boolean;

  // 公共方法
  $mount: (el?: Element | string, hydrating?: boolean) => Component & { [key: string]: any };
  $forceUpdate: () => void;
  $destroy: () => void;
  $set: <T>(target: Record<string, any> | Array<T>, key: string | number, val: T) => T;

  // 私有属性
  _uid: number;
  _name: string; // 只存在于开发模式中
  _isVue: true;
  __v_skip: true;
  _self: Component;

  // 生命周期
  _init: Function;
}
