"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLink = (link, property, required = false) => {
    const faults = [];
    if (link === null) {
        if (required) {
            faults.push({
                field: `_links.${property}`,
                message: `A "${property}" link is required.`,
            });
        }
    }
    else {
        if (typeof link !== 'object') {
            faults.push({
                field: `_links.${property}`,
                message: `The "${property}" link is not an object.`,
            });
        }
        else if (!link.href || typeof link.href !== 'string') {
            faults.push({
                field: `_links.${property}.href`,
                message: `The "${property}" link has an invalid hypertext reference.`,
            });
        }
    }
    return faults;
};
exports.default = exports.validateLink;
