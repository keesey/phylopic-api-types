import { EntityParameters } from '../queryParameters/EntityParameters';
import validateEntityParameters from './validateEntityParameters';
const VALID_EMBEDS: Readonly<Record<string, true>> = {
    childNodes: true,
    contributor: true,
    parentNode: true,
    primaryImage: true,
};
export const validateNodeParameters = (parameters: EntityParameters) => {
    return validateEntityParameters(parameters, VALID_EMBEDS);
};
export default validateNodeParameters;
