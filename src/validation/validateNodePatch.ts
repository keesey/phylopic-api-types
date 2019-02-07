import { Link } from '../models/Link';
import { NodePatch } from '../models/NodePatch';
import validateEntityLink from './validateEntityLink';
import validateExternalLink from './validateExternalLink';
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
                            message: 'External links must be an array.',
                        });
                    } else {
                        external.forEach((link: Link, index) => {
                            faults.push(...validateExternalLink(link, `external[${index}]`));
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
