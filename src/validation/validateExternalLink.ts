import { Link } from '../models/Link';
import validateExternalHRef from './validateExternalHRef';
import validateLink from './validateLink';
import { ValidationFault } from './ValidationFault';
export const validateExternalLink = (link: Link, field: string) => {
    let faults: ReadonlyArray<ValidationFault> = validateLink(link, field);
    if (!link) {
        faults = [
            ...faults,
            {
                field: `_links.${field}`,
                message: 'Null entry in external links.',
            },
        ];
    } else if (link.href && typeof link.href === 'string') {
        faults = [
            ...faults,
            ...validateExternalHRef(link.href, `_links.${field}.href`),
        ];
    }
    return faults;
};
export default validateExternalLink;
