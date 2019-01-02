"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VALID_LICENSES_1 = require("./VALID_LICENSES");
exports.ALL_LICENSES = [
    ...VALID_LICENSES_1.default,
    // Legacy licenses:
    'https://creativecommons.org/licenses/by/3.0/',
    'https://creativecommons.org/licenses/by-nc/3.0/',
    'https://creativecommons.org/licenses/by-nc-sa/3.0/',
    'https://creativecommons.org/licenses/by-sa/3.0/',
];
exports.default = exports.ALL_LICENSES;
