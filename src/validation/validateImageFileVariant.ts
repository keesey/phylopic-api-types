import { ValidationFault } from './ValidationFault';
/* tslint:disable:object-literal-sort-keys */
const VALID_VALUES: { [variant: string]: boolean; } = {
    basic32: true,
    basic64: true,
    basic128: true,
    basic256: true,
    basic512: true,
    basic1024: true,
    social1200x630: true,
    social440x220: true,
    square32: true,
    square64: true,
    square128: true,
    square256: true,
    square512: true,
    square1024: true,
};
/* tslint:enable:object-literal-sort-keys */
export const validateImageFileVariant = (variant: string | undefined) => {
    const faults: ValidationFault[] = [];
    if (variant && !VALID_VALUES[variant]) {
        faults.push({
            field: 'variant',
            message: `Not a valid image file variant: "${variant}".`,
        });
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateImageFileVariant;
