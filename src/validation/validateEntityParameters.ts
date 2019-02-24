import { EntityParameters } from '../queryParameters/EntityParameters';
import { ValidationFault } from './ValidationFault';
export const validateEntityParameters = (parameters: EntityParameters, validEmbeds: Readonly<Record<string, true>>) => {
    const faults: ValidationFault[] = [];
    if (parameters.embed) {
        const parts = parameters.embed.trim().split(/\s+/g);
        const invalidParts = parts.filter((part) => !validEmbeds[part]);
        if (invalidParts.length) {
            faults.push({
                field: 'embed',
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
export default validateEntityParameters;
