"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDate = (query, field) => {
    const value = query[field];
    if (!/^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
        return [{
                field,
                message: `Not a valid ISO datetime: "${value}". Required format is: "YYYY-MM-DDTHH:MM:SS.sssZ".`,
            }];
    }
    if (isNaN(new Date(value).valueOf())) {
        return [{
                field,
                message: `Not a valid datetime: "${value}".`,
            }];
    }
    return [];
};
exports.default = exports.validateDate;
