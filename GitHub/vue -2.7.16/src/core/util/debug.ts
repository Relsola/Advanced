import { noop } from 'shared/util';
import type { Component } from 'types/component';

export let warn: (msg: string, vm?: Component | null) => void = noop;

if (__DEV__) {
}
