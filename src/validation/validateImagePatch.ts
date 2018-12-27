import LICENSE_COMPONENTS from '../licenses/LICENSE_COMPONENTS';
import { ImagePatch } from '../types/ImagePatch';
import validateEntityLink from './validateEntityLink';
import validateLicenseLink from './validateLicenseLink';
import validateLinks from './validateLinks';
import { ValidationFault } from './ValidationFault';
const validateImagePatch = (payload: ImagePatch) => {
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
                const { generalNode, license, specificNode } = links;
                if (generalNode !== undefined) {
                    faults.push(...validateEntityLink(generalNode, '_links.generalNode', 'nodes', 'phylogenetic node'));
                }
                if (license !== undefined) {
                    faults.push(...validateLicenseLink(license, '_links.license', true));
                }
                if (specificNode !== undefined) {
                    faults.push(
                        ...validateEntityLink(specificNode, '_links.specificNode', 'nodes', 'phylogenetic node', true),
                    );
                }
                if (attribution !== undefined) {
                    if (
                        typeof attribution !== 'string'
                        && links.license && LICENSE_COMPONENTS[links.license.href].indexOf('by') >= 0
                    ) {
                        faults.push({
                            field: 'attribution',
                            message: `License requires attribution: "${links.license.href}".`,
                        });
                    }
                }
            }
        }
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateImagePatch;
