import { ValidationFault } from './ValidationFault';
export default (links: any) => {
    const faults: ValidationFault[] = [];
    if (!links || typeof links !== 'object') {
        faults.push({
            field: '_links',
            message: 'Invalid "_links" object.',
        });
    }
    return faults as ReadonlyArray<ValidationFault>;
};
