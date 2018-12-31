import { NodePost } from '../types/NodePost';
import { TitledLink } from '../types/TitledLink';
import validateEntityLink from './validateEntityLink';
import validateLink from './validateLink';
import validateLinks from './validateLinks';
import validateNodeName from './validateNodeName';
import { ValidationFault } from './ValidationFault';
export const validateNodePost = (payload: NodePost) => {
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
                            message: 'The list of external links must be an array.',
                        });
                    } else {
                        external.forEach((link: TitledLink, index) => {
                            const field = `external[${index}]`;
                            if (!link || typeof link !== 'object') {
                                faults.push({
                                    field: `_links.${field}`,
                                    message: 'Invalid entry in external links.',
                                });
                            } else {
                                const linkErrors = validateLink(link, field);
                                if (linkErrors.length) {
                                    faults.push(...linkErrors);
                                } else {
                                    if (typeof link.href && !/http:\/\/eol\.org\/\d+$/.test(link.href)) {
                                        faults.push({
                                            field: `_links.${field}.href`,
                                            message:
                                                'Currently PhyloPic only accepts external links to the'
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
                    faults.push(...validateEntityLink(parentNode, 'parentNode', 'nodes', 'phylogenetic node'));
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
        } else if (root) {
            faults.push({
                field: 'root',
                message: 'New phylogenetic nodes cannot be root nodes.',
            });
        }
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateNodePost;
