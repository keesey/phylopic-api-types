"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ALL_LICENSES_1 = require("./ALL_LICENSES");
const LICENSE_COMPONENTS_1 = require("./LICENSE_COMPONENTS");
exports.getValidLicensesForComponents = (components) => {
    let licenses = [...ALL_LICENSES_1.default];
    components.forEach((component) => {
        if (!licenses.length) {
            return;
        }
        if (component.charAt(0) === '-') {
            const actualComponent = component.substr(1);
            licenses = licenses.filter((license) => LICENSE_COMPONENTS_1.default[license].indexOf(actualComponent) < 0);
        }
        else {
            licenses = licenses.filter((license) => LICENSE_COMPONENTS_1.default[license].indexOf(component) >= 0);
        }
    });
    return licenses;
};
exports.default = exports.getValidLicensesForComponents;
