import { ResolveParameters } from '../queryParameters/ResolveParameters';
import validateExternalHRef from './validateExternalHRef';
import { ValidationFault } from './ValidationFault';
export const validateResolveParameters = (parameters: ResolveParameters) => {
    if (!parameters.uri) {
        return [{
            field: 'uri',
            message: 'The "uri" field is missing.',
        }] as ReadonlyArray<ValidationFault>;
    }
    return validateExternalHRef(parameters.uri, 'uri');
};
