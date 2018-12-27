import { NodePost } from '../types/NodePost';
import { TitledLink } from '../types/TitledLink';
import validateEntityLink from './validateEntityLink';
import validateLinks from './validateLinks';
import validateNodeName from './validateNodeName';
import validateTitledLink from './validateTitledLink';
import { ValidationFault } from './ValidationFault';
const validateNodePost = (payload: NodePost) => {
    let faults: ValidationFault[] = [];
    if (!payload || typeof payload !== 'object') {
        faults.push({
            field: '',
            message: 'No payload object found.',
        });
    } else {
        const { _links, names, root } = payload;
        if (root) {
            faults.push({
                field: 'root',
                message: 'New phylogenetic nodes cannot be root nodes.',
            });
        } else if (!_links || !_links.parentNode) {
            faults.push({
                field: '_links.parentNode',
                message: 'This phylogenetic node requires a parent node.',
            });
        }
        if (_links !== undefined) {
            faults = [...faults, ...validateLinks(_links)];
            if (_links && typeof _links === 'object') {
                const { parentNode, external } = _links;
                if (parentNode !== undefined) {
                    // NOTE: `required` is `false` because it is already checked above.
                    faults = [
                        ...faults,
                        ...validateEntityLink(parentNode, 'parentNode', 'nodes', 'phylogenetic node'),
                    ];
                }
                if (external !== undefined) {
                    if (!Array.isArray(external)) {
                        faults.push({
                            field: '_links.parentNode',
                            message: 'This phylogenetic node requires a parent node.',
                        });
                    } else {
                        external.forEach((link: TitledLink, index) => {
                            const field = `external[${index}]`;
                            if (!link || typeof link !== 'object') {
                                faults.push({
                                    field,
                                    message: 'Invalid entry in external links.',
                                });
                            } else {
                                const linkErrors = validateTitledLink(link, field);
                                if (linkErrors.length) {
                                    faults = [...faults, ...linkErrors];
                                } else {
                                    if (typeof link.href && !/http:\/\/eol\.org\/\d+$/.test(link.href)) {
                                        faults.push({
                                            field: `${field}.href`,
                                            message:
                                                'Currently PhyloPic only accepts external links to the'
                                                + ' Encyclopedia of Life <http://eol.org/:taxonID>.',
                                        });
                                    } else {
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
                }
            }
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
        }
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateNodePost;
