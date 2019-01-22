import LICENSE_COMPONENTS from '../licenses/LICENSE_COMPONENTS';
import { ImagePatch } from '../models/ImagePatch';
import validateEntityLink from './validateEntityLink';
import validateImageFileLink from './validateImageFileLink';
import validateLicenseLink from './validateLicenseLink';
import validateLinks from './validateLinks';
import { ValidationFault } from './ValidationFault';
export const validateImagePatch = (payload: ImagePatch) => {
    const faults: ValidationFault[] = [];
    if (!payload || typeof payload !== 'object') {
        faults.push({
            field: '',
            message: 'No payload object found.',
        });
    } else {
        const { _links: links } = payload;
        const attribution =
            typeof payload.attribution === 'string'
                ? (payload.attribution.trim().replace(/\s+/g, ' ') || null)
                : payload.attribution;
        if (links !== undefined) {
            faults.push(...validateLinks(links));
            if (links && typeof links === 'object') {
                const { generalNode, license, sourceFile, specificNode } = links;
                if (generalNode !== undefined) {
                    faults.push(...validateEntityLink(generalNode, 'generalNode', 'nodes', 'phylogenetic node'));
                }
                if (license !== undefined) {
                    faults.push(...validateLicenseLink(license, 'license', true));
                }
                if (sourceFile !== undefined) {
                    faults.push(
                        ...validateImageFileLink(sourceFile, 'sourceFile', true),
                    );
                }
                if (specificNode !== undefined) {
                    faults.push(
                        ...validateEntityLink(specificNode, 'specificNode', 'nodes', 'phylogenetic node', true),
                    );
                }
                if (attribution === null
                    && links.license
                    && (LICENSE_COMPONENTS[links.license.href] || '').indexOf('by') >= 0
                ) {
                    faults.push({
                        field: 'attribution',
                        message: `License requires attribution: "${links.license.href}".`,
                    });
                }
            }
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
export default validateImagePatch;
