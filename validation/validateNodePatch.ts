import { Link } from '../types/Link';
import { NodePatch } from '../types/NodePatch';
import { TitledLink } from '../types/TitledLink';
import validateEntityLink from './validateEntityLink';
import validateLink from './validateLink';
import validateLinks from './validateLinks';
import validateNodeName from './validateNodeName';
import { ValidationFault } from './ValidationFault';
const validateNodePatch = (payload: NodePatch) => {
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
                    external.forEach((link: Link & Partial<TitledLink>, index) => {
                        const field = `external[${index}]`;
                        if (!link || typeof link !== 'object') {
                            faults.push({
                                field,
                                message: 'Invalid entry in external links.',
                            });
                        } else {
                            const linkFaults = validateLink(link, field);
                            if (linkFaults.length) {
                                faults.push(...linkFaults);
                            } else {
                                if (typeof link.href && !/http:\/\/eol\.org\/\d+$/.test(link.href)) {
                                    faults.push({
                                        field: `${field}.href`,
                                        message:
                                            'Currently PhyloPic only accepts external links to the'
                                            + ' Encyclopedia of Life <http://eol.org/:taxonID>.',
                                    });
                                } else if (link.title !== undefined) {
                                    if (link.title !== 'Encyclopedia of Life') {
                                        faults.push({
                                            field: `${field}.title`,
                                            message:
                                                'External link must be titled "Encyclopedia of Life".',
                                        });
                                    }
                                }
                            }
                        }
                    });
                }
                if (parentNode !== undefined) {
                    faults.push(...validateEntityLink(parentNode, '_links.parentNode', 'nodes', 'phylogenetic node'));
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
        if (root !== undefined && typeof root !== 'boolean') {
            faults.push({
                field: 'root',
                message: `Invalid value for "root": ${root}.`,
            });
        }
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateNodePatch;
