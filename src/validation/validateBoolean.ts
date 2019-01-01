import { ValidationFault } from './ValidationFault';
export const validateBoolean = (value: string | undefined, field: string, fieldLabel: string) => {
    const faults: ValidationFault[] = [];
    if (value && value !== 'true' && value !== 'false') {
        faults.push({
            field,
            message: `Not a valid ${fieldLabel}: "${value}".`,
        });
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateBoolean;
