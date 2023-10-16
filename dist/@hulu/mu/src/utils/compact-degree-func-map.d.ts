import isFalsy from '../is-falsy.js';
import isNil from '../is-nil.js';
export declare const compactDegreeFuncMap: {
    undefined: (value: any) => boolean;
    null: (value: any) => boolean;
    nil: typeof isNil;
    withoutZero: (value: any) => any;
    not: (value: any) => boolean;
    falsy: typeof isFalsy;
};
