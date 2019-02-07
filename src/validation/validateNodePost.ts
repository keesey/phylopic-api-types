import { Link } from '../models/Link';
import { NodePost } from '../models/NodePost';
import validateEntityLink from './validateEntityLink';
import validateExternalLink from './validateExternalLink';
import validateLinks from './validateLinks';
import validateNodeName from './validateNodeName';
import { ValidationFault } from './ValidationFault';
export const validateNodePost = (payload: NodePost, allowRoot = false) => {
    let faults: ValidationFault[] = [];
    if (!payload || typeof payload !== 'object') {
        faults.push({
            field: '',
            message: 'No payload object found.',
        });
    } else {
        const { _links, names, root } = payload;
        faults.push(...validateLinks(_links));
        if (_links) {
            if (_links && typeof _links === 'object') {
                const { external, parentNode } = _links;
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
                if (parentNode) {
                    // NOTE: `required` is `false` because it is already checked below.
                    faults.push(...validateEntityLink(parentNode, 'parentNode', 'nodes', 'phylogenetic node'));
                }
            }
        }
        if (
            _links
            && (!_links.parentNode || typeof _links.parentNode !== 'object')
            && !(allowRoot && _links.parentNode === null)
        ) {
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
        } else {
            names.forEach((name, i) => {
                faults = [...faults, ...validateNodeName(name, i)];
            });
        }
        if (root !== undefined && typeof root !== 'boolean') {
            faults.push({
                field: 'root',
                message: 'Invalid root flag.',
            });
        } else if (!allowRoot && root) {
            faults.push({
                field: 'root',
                message: 'New phylogenetic nodes cannot be root nodes.',
            });
        }
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateNodePost;
