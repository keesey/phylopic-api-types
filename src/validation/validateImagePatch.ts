import LICENSE_COMPONENTS from '../licenses/LICENSE_COMPONENTS';
import { ImagePatch } from '../models/ImagePatch';
import validateEntityLink from './validateEntityLink';
import validateLicenseLink from './validateLicenseLink';
import validateLinks from './validateLinks';
import validateRasterImageFileLink from './validateRasterImageFileLink';
import validateVectorImageFileLink from './validateVectorImageFileLink';
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
                const { generalNode, license, sourceFile, specificNode, vectorFile } = links;
                if (generalNode !== undefined) {
                    faults.push(...validateEntityLink(generalNode, 'generalNode', 'nodes', 'phylogenetic node'));
                }
                if (license !== undefined) {
                    faults.push(...validateLicenseLink(license, 'license', true));
                }
                if (sourceFile !== undefined) {
                    faults.push(
                        ...validateRasterImageFileLink(sourceFile, 'sourceFile', true),
                    );
                }
                if (specificNode !== undefined) {
                    faults.push(
                        ...validateEntityLink(specificNode, 'specificNode', 'nodes', 'phylogenetic node', true),
                    );
                }
                if (vectorFile !== undefined) {
                    if (!sourceFile) {
                        faults.push({
                            field: '_links.sourceFile',
                            message: 'The "sourceFile" link must be included if there is a "vectorFile" link.',
                        });
                    }
                    faults.push(
                        ...validateVectorImageFileLink(vectorFile, 'vectorFile', true),
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
