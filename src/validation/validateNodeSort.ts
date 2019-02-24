import { ListParameters } from '../queryParameters/ListParameters';
import validateSort from './validateSort';
const VALID_SORTS: Readonly<Record<string, true>> = {
    created: true,
    modified: true,
    names: true,
};
export const validateNodeSort = (parameters: ListParameters) => {
    return validateSort(parameters, VALID_SORTS);
};
export default validateNodeSort;
