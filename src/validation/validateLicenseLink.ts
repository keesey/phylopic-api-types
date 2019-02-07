import ALL_LICENSES from '../licenses/ALL_LICENSES';
import VALID_LICENSES from '../licenses/VALID_LICENSES';
import { Link } from '../models/Link';
import validateLink from './validateLink';
import { ValidationFault } from './ValidationFault';
export const validateLicenseLink = (
    link: Link | null,
    property = 'license',
    required = false,
    allowLegacyLicenses = false,
) => {
    let faults: ReadonlyArray<ValidationFault> = validateLink(link, property, required);
    const licenses = allowLegacyLicenses ? ALL_LICENSES : VALID_LICENSES;
    if (link && link.href && licenses.indexOf(link.href) < 0) {
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
