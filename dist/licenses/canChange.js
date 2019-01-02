"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PERMITTED_LICENSE_CHANGES_1 = require("./PERMITTED_LICENSE_CHANGES");
exports.canChange = (a, b) => {
    if (a === b) {
        return true;
    }
    return PERMITTED_LICENSE_CHANGES_1.default[a].indexOf(b) >= 0;
};
exports.default = exports.canChange;
