"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateEntityLink_1 = require("./validateEntityLink");
const validateLink_1 = require("./validateLink");
const validateLinks_1 = require("./validateLinks");
const validateNodeName_1 = require("./validateNodeName");
exports.validateNodePost = (payload) => {
    let faults = [];
    if (!payload || typeof payload !== 'object') {
        faults.push({
            field: '',
            message: 'No payload object found.',
        });
    }
    else {
        const { _links, names, root } = payload;
        faults.push(...validateLinks_1.default(_links));
        if (_links) {
            if (_links && typeof _links === 'object') {
                const { external, parentNode } = _links;
                if (external !== undefined) {
                    if (!Array.isArray(external)) {
                        faults.push({
                            field: '_links.external',
                            message: 'The list of external links must be an array.',
                        });
                    }
                    else {
                        external.forEach((link, index) => {
                            const field = `external[${index}]`;
                            if (!link || typeof link !== 'object') {
                                faults.push({
                                    field: `_links.${field}`,
                                    message: 'Invalid entry in external links.',
                                });
                            }
                            else {
                                const linkErrors = validateLink_1.default(link, field);
                                if (linkErrors.length) {
                                    faults.push(...linkErrors);
                                }
                                else {
                                    if (typeof link.href && !/http:\/\/eol\.org\/\d+$/.test(link.href)) {
                                        faults.push({
                                            field: `_links.${field}.href`,
                                            message: 'Currently PhyloPic only accepts external links to the'
                                                + ' Encyclopedia of Life (format: <http://eol.org/:taxonID>).',
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
                if (parentNode) {
                    // NOTE: `required` is `false` because it is already checked below.
                    faults.push(...validateEntityLink_1.default(parentNode, 'parentNode', 'nodes', 'phylogenetic node'));
                }
            }
        }
        if (_links && (!_links.parentNode || typeof _links.parentNode !== 'object')) {
            faults.push({
                field: '_links.parentNode',
                message: 'This phylogenetic node requires a parent node.',
            });
        }
        if (!Array.isArray(names) || !names.length) {
            faults.push({
                field: 'names',
                message: 'Invalid list of names.',
            });
        }
        else {
            names.forEach((name, i) => {
                faults = [...faults, ...validateNodeName_1.default(name, i)];
            });
        }
        if (root !== undefined && typeof root !== 'boolean') {
            faults.push({
                field: 'root',
                message: 'Invalid root flag.',
            });
        }
        else if (root) {
            faults.push({
                field: 'root',
                message: 'New phylogenetic nodes cannot be root nodes.',
            });
        }
    }
    return faults;
};
exports.default = exports.validateNodePost;
