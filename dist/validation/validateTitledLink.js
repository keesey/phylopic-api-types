"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateLink_1 = require("./validateLink");
exports.validateTitledLink = (link, property, required = false) => {
    let faults = validateLink_1.default(link, property, required);
    if (link) {
        if (!link.title || typeof link.title !== 'string') {
            faults = [
                ...faults,
                {
                    field: `_links.${property}.title`,
                    message: `No title for "${property}" link.`,
                },
            ];
        }
    }
    return faults;
};
exports.default = exports.validateTitledLink;
