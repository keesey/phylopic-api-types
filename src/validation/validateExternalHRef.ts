import { ValidationFault } from './ValidationFault';
const EXTERNAL_HREF_REGEXP_LIST = [
    /https:\/\/eol\.org\/pages\/\d+$/,
    /https:\/\/opentreeoflife.org\/taxonomy\/browse\?id=\d+$/,
    /http:\/\/ubio\.org\/browser\/details.php\?namebankID=\d+$/,
    /http:\/\/v1\.phylopic\.org\/name\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
];
export const validateExternalHRef = (hRef: string, field: string) => {
    let faults = [] as ReadonlyArray<ValidationFault>;
    if (hRef && !EXTERNAL_HREF_REGEXP_LIST.some((re) => re.test(hRef))) {
        faults = [
            ...faults,
            {
                field,
                message: `The external resource for this link is not recognized: "${hRef}".`,
            },
        ];
    }
    return faults;
};
export default validateExternalHRef;
