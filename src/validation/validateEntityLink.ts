import { v4 } from 'is-uuid';
import { Link } from '../types/Link';
import validateLink from './validateLink';
import { ValidationFault } from './ValidationFault';
export const validateEntityLink = (
    link: Link | null,
    property: string,
    entityPath: string,
    entityLabel: string,
    required = false,
) => {
    let faults: ReadonlyArray<ValidationFault> = validateLink(link, property, required);
    if (link && link.href && typeof link.href === 'string') {
        const pathPrefix = `/${entityPath}/`;
        if (!link.href.startsWith(pathPrefix)) {
            faults = [
                ...faults,
                {
                    field: `_links.${property}.href`,
                    message: `Not a valid ${entityLabel} link: "${link.href}".`,
                },
            ];
        } else {
            const uuid = link.href.substr(pathPrefix.length);
            if (!v4(uuid)) {
                faults = [
                    ...faults,
                    {
                        field: `_links.${property}.href`,
                        message: `Not a valid UUID v4: "${uuid}".`,
                    },
                ];
            }
        }
    }
    return faults;
};
export default validateEntityLink;
