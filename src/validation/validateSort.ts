import { ListParameters } from '../queryParameters/ListParameters';
import { ValidationFault } from './ValidationFault';
export const validateSort = (parameters: ListParameters, validSorts: Readonly<Record<string, true>>) => {
    const faults: ValidationFault[] = [];
    if (parameters.sort) {
        const parts = parameters.sort
            .trim()
            .split(/\s+/g)
            .map((s) => s.replace(/^-/, ''));
        const invalidParts = parts.filter((part) => !validSorts[part]);
        if (invalidParts.length) {
            faults.push({
                field: 'sort',
                message: `Unrecognized propert${
                    invalidParts.length === 1 ? 'y' : 'ies'
                    }: "${
                    invalidParts.join('", "')
                    }".`,
            });
        }
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateSort;
