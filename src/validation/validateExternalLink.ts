import { Link } from '../models/Link';
import validateLink from './validateLink';
import { ValidationFault } from './ValidationFault';
const EXTERNAL_HREF_REGEXP_LIST = [
    /https:\/\/eol\.org\/pages\/\d+$/,
    /https:\/\/opentreeoflife.org\/taxonomy\/browse\?id=\d+$/,
    /http:\/\/ubio\.org\/browser\/details.php\?namebankID=\d+$/,
    /http:\/\/v1\.phylopic\.org\/name\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
];
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
    } else if (
        link.href
        && typeof link.href === 'string'
        && !EXTERNAL_HREF_REGEXP_LIST.some((re) => re.test(link.href))
    ) {
        faults = [
            ...faults,
            {
                field: `_links.${field}.href`,
                message: `The external resource for this link is not recognized: ${link.href}`,
            },
        ];
    }
    return faults;
};
export default validateExternalLink;
