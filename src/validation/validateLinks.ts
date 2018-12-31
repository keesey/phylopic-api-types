import { ValidationFault } from './ValidationFault';
export const validateLinks = (links: any) => {
    const faults: ValidationFault[] = [];
    if (!links || typeof links !== 'object') {
        faults.push({
            field: '_links',
            message: 'Invalid "_links" object.',
        });
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateLinks;
