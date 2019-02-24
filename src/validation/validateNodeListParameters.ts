import { ListParameters } from '../queryParameters/ListParameters';
import { validateListParameters } from './validateListParameters';
import validateNodeParameters from './validateNodeParameters';
import validateNodeSort from './validateNodeSort';
export const validateNodeListParameters = (parameters: ListParameters) => {
    return validateListParameters(parameters, validateNodeParameters, validateNodeSort);
};
export default validateNodeListParameters;
