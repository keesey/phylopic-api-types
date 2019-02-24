import { ListParameters } from '../queryParameters/ListParameters';
import validateSort from './validateSort';
const VALID_SORTS: Readonly<Record<string, true>> = {
    created: true,
    modified: true,
};
export const validateImageSort = (parameters: ListParameters) => {
    return validateSort(parameters, VALID_SORTS);
};
export default validateImageSort;
