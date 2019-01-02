"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_uuid_1 = require("is-uuid");
const validateLink_1 = require("./validateLink");
exports.validateEntityLink = (link, property, entityPath, entityLabel, required = false) => {
    let faults = validateLink_1.default(link, property, required);
    if (link && link.href && typeof link.href === 'string') {
        const pathPrefix = `/${entityPath}/`;
        if (!link.href.startsWith(pathPrefix)) {
            faults = [
                ...faults,
                {
                    field: `_links.${property}.href`,
                    message: `Not a valid ${entityLabel} link: "${link.href}".`,
                },
            ];
        }
        else {
            const uuid = link.href.substr(pathPrefix.length);
            if (!is_uuid_1.v4(uuid)) {
                faults = [
                    ...faults,
                    {
                        field: `_links.${property}.href`,
                        message: `Not a valid UUID v4: "${uuid}".`,
                    },
                ];
            }
        }
    }
    return faults;
};
exports.default = exports.validateEntityLink;
