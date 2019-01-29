import { Link } from '../models/Link';
import validateLink from './validateLink';
import { ValidationFault } from './ValidationFault';
export const validateImageFileLink = (link: Link | null, property: string, required = false) => {
    let faults: ReadonlyArray<ValidationFault> = validateLink(link, property, required);
    if (link) {
        const match = link.href.match(/^data:image\/svg\+xml(;base64)?,/);
        if (!match) {
            faults = [
                ...faults,
                {
                    field: `_links.${property}.href`,
                    message: `The "${property}" link must use the "data:" scheme with the "image/svg+xml" media type.`,
                },
            ];
        }
    }
    return faults;
};
export default validateImageFileLink;
