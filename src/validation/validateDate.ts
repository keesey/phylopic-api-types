import { ValidationFault } from './ValidationFault';
const validateDate = (query: { [name: string]: string; }, field: string) => {
    const value = query[field];
    if (!/^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
        return [{
            field,
            message: `Not a valid ISO datetime: "${value}". Required format is: "YYYY-MM-DDTHH:MM:SS.sssZ".`,
        }] as ReadonlyArray<ValidationFault>;
    }
    if (isNaN(new Date(value).valueOf())) {
        return [{
            field,
            message: `Not a valid datetime: "${value}".`,
        }] as ReadonlyArray<ValidationFault>;
    }
    return [] as ReadonlyArray<ValidationFault>;
};
export default validateDate;
