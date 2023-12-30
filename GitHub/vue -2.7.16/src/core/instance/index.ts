import { warn } from '../util/index';

function Vue(options) {
	if (__DEV__ && !(this instanceof Vue)) {
		warn('Vue is a constructor and should be called with the `new` keyword');
	}
	this._init(options);
}

