import LICENSE_COMPONENTS from '../licenses/LICENSE_COMPONENTS';
import { ImagePost } from '../types/ImagePost';
import validateEntityLink from './validateEntityLink';
import validateLicenseLink from './validateLicenseLink';
import { ValidationFault } from './ValidationFault';
const createMissingFieldError = (field: string) => ({
    field,
    message: `The "${field}" field is missing.`,
} as ValidationFault);
const validateImagePost = (payload: ImagePost) => {
    const faults: ValidationFault[] = [];
    if (!payload || typeof payload !== 'object') {
        faults.push({
            field: '',
            message: 'No payload object found.',
        });
    } else {
        const attribution =
            typeof payload.attribution === 'string' ? (payload.attribution.trim().replace(/\s+/g, ' ') || null) : null;
        const { _links: links } = payload;
        if (links) {
            faults.push(...validateEntityLink(links.generalNode, '_links.generalNode', 'nodes', 'phylogenetic node'));
            faults.push(...validateLicenseLink(links.license, '_links.license', true));
            faults.push(
                ...validateEntityLink(links.specificNode, '_links.specificNode', 'nodes', 'phylogenetic node', true),
            );
            if (!attribution && links.license && LICENSE_COMPONENTS[links.license.href].indexOf('by') >= 0) {
                faults.push({
                    field: 'attribution',
                    message: `License requires attribution: "${links.license.href}".`,
                });
            }
        } else {
            faults.push(createMissingFieldError('_links'));
        }
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateImagePost;
