import { v4 } from 'is-uuid';
import { EntityParameters } from '../queryParameters/EntityParameters';
import { ListParameters } from '../queryParameters/ListParameters';
import validateDate from './validateDate';
import { ValidationFault } from './ValidationFault';
const validateDateRange = (
    parameters: ListParameters,
    properties: Readonly<[keyof ListParameters, keyof ListParameters]>,
) => {
    const propertyFaults = properties
        .map((key) => parameters[key] === undefined ? undefined : validateDate(parameters[key]!, key));
    if (propertyFaults.every((faults) => faults === undefined)) {
        const dates = properties.map((key) => Date.parse(parameters[key]!));
        if (dates[0] > dates[1]) {
            return [{
                field: properties[0],
                message: `The "${properties[0]}" value cannot be later than the "${properties[1]}" value.`,
            }] as ReadonlyArray<ValidationFault>;
        }
    }
    return [] as ReadonlyArray<ValidationFault>;
};
export const validateListParameters = (
    parameters: ListParameters,
    entityValidator: (parameters: EntityParameters) => ReadonlyArray<ValidationFault>,
    sortValidator: (parameters: ListParameters) => ReadonlyArray<ValidationFault>,
) => {
    const faults: ValidationFault[] = [...entityValidator(parameters)];
    if (parameters.contributor) {
        if (!v4(parameters.contributor)) {
            faults.push({
                field: 'contributor',
                message: 'Not a valid UUID v4.',
            });
        }
    }
    faults.push(...validateDateRange(parameters, ['created_lt', 'created_gt']));
    faults.push(...validateDateRange(parameters, ['modified_lt', 'modified_gt']));
    faults.push(...sortValidator(parameters));
    return faults as ReadonlyArray<ValidationFault>;
};
