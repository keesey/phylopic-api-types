"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VALID_LICENSES_1 = require("../licenses/VALID_LICENSES");
const validateLink_1 = require("./validateLink");
exports.validateLicenseLink = (link, property = 'license', required = false) => {
    let faults = validateLink_1.default(link, property, required);
    if (link && link.href && VALID_LICENSES_1.default.indexOf(link.href) < 0) {
        faults = [
            ...faults,
            {
                field: `_links.${property}.href`,
                message: 'The requested license is not available.',
            },
        ];
    }
    return faults;
};
exports.default = exports.validateLicenseLink;
