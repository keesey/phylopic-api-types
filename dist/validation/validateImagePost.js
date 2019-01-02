"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LICENSE_COMPONENTS_1 = require("../licenses/LICENSE_COMPONENTS");
const validateEntityLink_1 = require("./validateEntityLink");
const validateLicenseLink_1 = require("./validateLicenseLink");
const createMissingFieldError = (field) => ({
    field,
    message: `The "${field}" field is missing.`,
});
exports.validateImagePost = (payload) => {
    const faults = [];
    if (!payload || typeof payload !== 'object') {
        faults.push({
            field: '',
            message: 'No payload object found.',
        });
    }
    else {
        const attribution = typeof payload.attribution === 'string' ? (payload.attribution.trim().replace(/\s+/g, ' ') || null) : null;
        const { _links: links } = payload;
        if (links) {
            faults.push(...validateEntityLink_1.default(links.generalNode, 'generalNode', 'nodes', 'phylogenetic node'));
            faults.push(...validateLicenseLink_1.default(links.license, 'license', true));
            faults.push(...validateEntityLink_1.default(links.specificNode, 'specificNode', 'nodes', 'phylogenetic node', true));
            if (!attribution && links.license && (LICENSE_COMPONENTS_1.default[links.license.href] || '').indexOf('by') >= 0) {
                faults.push({
                    field: 'attribution',
                    message: `License requires attribution: "${links.license.href}".`,
                });
            }
        }
        else {
            faults.push(createMissingFieldError('_links'));
        }
        if (typeof payload.attribution !== 'undefined'
            && payload.attribution !== null
            && typeof payload.attribution !== 'string') {
            faults.push({
                field: 'attribution',
                message: 'Attribution must be a string or null.',
            });
        }
    }
    return faults;
};
exports.default = exports.validateImagePost;
