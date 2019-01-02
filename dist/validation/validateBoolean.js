"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBoolean = (value, field, fieldLabel) => {
    const faults = [];
    if (value && value !== 'true' && value !== 'false') {
        faults.push({
            field,
            message: `Not a valid ${fieldLabel}: "${value}".`,
        });
    }
    return faults;
};
exports.default = exports.validateBoolean;
