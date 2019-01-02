"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LICENSE_COMPONENTS_1 = require("../licenses/LICENSE_COMPONENTS");
const validateEntityLink_1 = require("./validateEntityLink");
const validateLicenseLink_1 = require("./validateLicenseLink");
const validateLinks_1 = require("./validateLinks");
exports.validateImagePatch = (payload) => {
    const faults = [];
    if (!payload || typeof payload !== 'object') {
        faults.push({
            field: '',
            message: 'No payload object found.',
        });
    }
    else {
        const { _links: links } = payload;
        const attribution = typeof payload.attribution === 'string'
            ? (payload.attribution.trim().replace(/\s+/g, ' ') || null)
            : payload.attribution;
        if (links !== undefined) {
            faults.push(...validateLinks_1.default(links));
            if (links && typeof links === 'object') {
                const { generalNode, license, specificNode } = links;
                if (generalNode !== undefined) {
                    faults.push(...validateEntityLink_1.default(generalNode, 'generalNode', 'nodes', 'phylogenetic node'));
                }
                if (license !== undefined) {
                    faults.push(...validateLicenseLink_1.default(license, 'license', true));
                }
                if (specificNode !== undefined) {
                    faults.push(...validateEntityLink_1.default(specificNode, 'specificNode', 'nodes', 'phylogenetic node', true));
                }
                if (attribution === null
                    && links.license
                    && (LICENSE_COMPONENTS_1.default[links.license.href] || '').indexOf('by') >= 0) {
                    faults.push({
                        field: 'attribution',
                        message: `License requires attribution: "${links.license.href}".`,
                    });
                }
            }
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
exports.default = exports.validateImagePatch;
