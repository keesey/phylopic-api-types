"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLinks = (links) => {
    const faults = [];
    if (!links || typeof links !== 'object') {
        faults.push({
            field: '_links',
            message: 'Invalid "_links" object.',
        });
    }
    return faults;
};
exports.default = exports.validateLinks;
