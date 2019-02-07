import LICENSE_COMPONENTS from '../licenses/LICENSE_COMPONENTS';
import { ImagePost } from '../models/ImagePost';
import validateEntityLink from './validateEntityLink';
import validateLicenseLink from './validateLicenseLink';
import validateRasterImageFileLink from './validateRasterImageFileLink';
import validateVectorImageFileLink from './validateVectorImageFileLink';
import { ValidationFault } from './ValidationFault';
const createMissingFieldError = (field: string) => ({
    field,
    message: `The "${field}" field is missing.`,
} as ValidationFault);
export const validateImagePost = (payload: ImagePost, allowLegacyLicenses = false) => {
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
            faults.push(...validateEntityLink(links.generalNode, 'generalNode', 'nodes', 'phylogenetic node'));
            faults.push(...validateLicenseLink(links.license, 'license', true, allowLegacyLicenses));
            faults.push(...validateRasterImageFileLink(links.sourceFile, 'sourceFile', true));
            faults.push(
                ...validateEntityLink(links.specificNode, 'specificNode', 'nodes', 'phylogenetic node', true),
            );
            if (links.vectorFile) {
                faults.push(...validateVectorImageFileLink(links.vectorFile, 'vectorFile', true));
            }
            if (!attribution && links.license && (LICENSE_COMPONENTS[links.license.href] || '').indexOf('by') >= 0) {
                faults.push({
                    field: 'attribution',
                    message: `License requires attribution: "${links.license.href}".`,
                });
            }
        } else {
            faults.push(createMissingFieldError('_links'));
        }
        if (typeof payload.attribution !== 'undefined'
            && payload.attribution !== null
            && typeof payload.attribution !== 'string'
        ) {
            faults.push({
                field: 'attribution',
                message: 'Attribution must be a string or null.',
            });
        }
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateImagePost;
