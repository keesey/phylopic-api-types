"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:object-literal-sort-keys */
const VALID_VALUES = {
    basic32: true,
    basic64: true,
    basic128: true,
    basic256: true,
    basic512: true,
    basic1024: true,
    social1200x630: true,
    social440x220: true,
    square32: true,
    square64: true,
    square128: true,
    square256: true,
    square512: true,
    square1024: true,
};
/* tslint:enable:object-literal-sort-keys */
exports.validateImageFileVariant = (variant) => {
    const faults = [];
    if (variant && !VALID_VALUES[variant]) {
        faults.push({
            field: 'variant',
            message: `Not a valid image file variant: "${variant}".`,
        });
    }
    return faults;
};
exports.default = exports.validateImageFileVariant;
