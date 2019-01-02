"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VALID_LICENSE_COMPONENTS_1 = require("../licenses/VALID_LICENSE_COMPONENTS");
exports.validateLicenseComponents = (s) => {
    const isValid = (c) => VALID_LICENSE_COMPONENTS_1.default.indexOf(c.replace(/^\-/, '')) >= 0;
    const faults = [];
    if (!s.trim().split(/\s+/g).filter(Boolean).every(isValid)) {
        faults.push({
            field: 'license_components',
            message: `Invalid license component provided in "${s}".`,
        });
    }
    return faults;
};
exports.default = exports.validateLicenseComponents;
