import { SearchParameters } from '../queryParameters/SearchParameters';
import { ValidationFault } from './ValidationFault';
export const validateSearchParameters = (parameters: SearchParameters) => {
    if (!parameters.query || typeof parameters.query !== 'string' || parameters.query.length < 2) {
        return [{
            field: 'query',
            message: 'Search query must be text, two or more characters in length.',
        }] as ReadonlyArray<ValidationFault>;
    }
    return [] as ReadonlyArray<ValidationFault>;
};
