import { Link } from '../models/Link';
import validateLink from './validateLink';
import { ValidationFault } from './ValidationFault';
const VALID_MEDIA_TYPES = [
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/png',
];
export const validateRasterImageFileLink = (link: Link | null, property: string, required = false) => {
    let faults: ReadonlyArray<ValidationFault> = validateLink(link, property, required);
    if (link) {
        const match = link.href.match(/^data:([^\/]+\/[^;,]+)?;base64,/);
        if (!match) {
            faults = [
                ...faults,
                {
                    field: `_links.${property}.href`,
                    message: `The "${property}" link must use the "data:" scheme and base-64 encoding.`,
                },
            ];
        } else if (VALID_MEDIA_TYPES.indexOf(match[1]) < 0) {
            faults = [
                ...faults,
                {
                    field: `_links.${property}.href`,
                    message: `The "${
                        property
                        }" link must use one of the following MIME types: "${
                        VALID_MEDIA_TYPES.join('", "')
                        }".`,
                },
            ];
        }
    }
    return faults;
};
export default validateRasterImageFileLink;
