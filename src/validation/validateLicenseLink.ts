import VALID_LICENSES from '../licenses/VALID_LICENSES';
import { Link } from '../types/Link';
import validateLink from './validateLink';
import { ValidationFault } from './ValidationFault';
export const validateLicenseLink = (link: Link | null, property = 'license', required = false) => {
    let faults: ReadonlyArray<ValidationFault> = validateLink(link, property, required);
    if (link && link.href && VALID_LICENSES.indexOf(link.href) < 0) {
        faults = [
            ...faults,
            {
                field: `_links.${property}.href`,
                message: 'The requested license is not available.',
            },
        ];
    }
    return faults;
};
export default validateLicenseLink;
