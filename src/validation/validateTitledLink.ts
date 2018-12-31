import { TitledLink } from '../types/TitledLink';
import validateLink from './validateLink';
import { ValidationFault } from './ValidationFault';
const validateTitledLink = (link: TitledLink | null, property: string, required = false) => {
    let faults: ReadonlyArray<ValidationFault> = validateLink(link, property, required);
    if (link) {
        if (!link.title || typeof link.title !== 'string') {
            faults = [
                ...faults,
                {
                    field: `_links.${property}.title`,
                    message: `No title for "${property}" link.`,
                },
            ];
        }
    }
    return faults;
};
export default validateTitledLink;
