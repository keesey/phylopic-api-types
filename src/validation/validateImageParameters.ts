import { EntityParameters } from '../queryParameters/EntityParameters';
import validateEntityParameters from './validateEntityParameters';
const VALID_EMBEDS: Readonly<Record<string, true>> = {
    contributor: true,
    generalNode: true,
    nodes: true,
    specificNode: true,
};
export const validateImageParameters = (parameters: EntityParameters) => {
    return validateEntityParameters(parameters, VALID_EMBEDS);
};
export default validateImageParameters;
