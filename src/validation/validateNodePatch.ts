import { Link } from '../models/Link';
import { NodePatch } from '../models/NodePatch';
import { TitledLink } from '../models/TitledLink';
import validateEntityLink from './validateEntityLink';
import validateLink from './validateLink';
import validateLinks from './validateLinks';
import validateNodeName from './validateNodeName';
import { ValidationFault } from './ValidationFault';
export const validateNodePatch = (payload: NodePatch) => {
    let faults: ValidationFault[] = [];
    if (!payload || typeof payload !== 'object') {
        faults.push({
            field: '',
            message: 'No payload object found.',
        });
    } else {
        const { _links: links, names, root } = payload;
        if (links !== undefined) {
            faults.push(...validateLinks(links));
            if (links && typeof links === 'object') {
                const { external, parentNode } = links;
                if (external !== undefined) {
                    if (!Array.isArray(external)) {
                        faults.push({
                            field: '_links.external',
                            message: 'Invalid entry in external links.',
                        });
                    } else {
                        external.forEach((link: Link & Partial<TitledLink>, index) => {
                            const field = `external[${index}]`;
                            if (!link || typeof link !== 'object') {
                                faults.push({
                                    field: `_links.${field}`,
                                    message: 'Invalid entry in external links.',
                                });
                            } else {
                                const linkFaults = validateLink(link, field);
                                if (linkFaults.length) {
                                    faults.push(...linkFaults);
                                } else if (typeof link.href && !/http:\/\/eol\.org\/\d+$/.test(link.href)) {
                                    faults.push({
                                        field: `_links.${field}.href`,
                                        message:
                                            'Currently PhyloPic only accepts external links to the'
                                            + ' Encyclopedia of Life (format: <http://eol.org/:taxonID>).',
                                    });
                                }
                                if (link.title !== undefined && link.title !== 'Encyclopedia of Life') {
                                    faults.push({
                                        field: `_links.${field}.title`,
                                        message:
                                            'External link must be titled "Encyclopedia of Life".',
                                    });
                                }
                            }
                        });
                    }
                }
                if (parentNode !== undefined) {
                    faults.push(...validateEntityLink(parentNode, 'parentNode', 'nodes', 'phylogenetic node'));
                }
            }
        }
        if (names !== undefined) {
            if (!Array.isArray(names) || !names.length) {
                faults.push({
                    field: 'names',
                    message: 'Invalid list of names.',
                });
            } else {
                names.forEach((name, i) => {
                    faults = [...faults, ...validateNodeName(name, i)];
                });
            }
        }
        if (root !== undefined) {
            if (typeof root !== 'boolean') {
                faults.push({
                    field: 'root',
                    message: `Invalid value for "root": ${root}.`,
                });
            } else if (root && links && links.parentNode) {
                faults.push({
                    field: 'root',
                    message: 'Cannot be a root node if it has a parent.',
                });
            }
         }
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateNodePatch;
