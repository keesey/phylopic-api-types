import VALID_LICENSE_COMPONENTS from '../licenses/VALID_LICENSE_COMPONENTS';
import { ValidationFault } from './ValidationFault';
export const validateLicenseComponent = (s: string) => {
    const isValid = (c: string) => VALID_LICENSE_COMPONENTS.indexOf(c.replace(/^\-/, '')) >= 0;
    const faults: ValidationFault[] = [];
    if (!s.trim().split(/\s+/g).filter(Boolean).every(isValid)) {
        faults.push({
            field: 'license_components',
            message: `Invalid license component provided in "${s}".`,
        });
    }
    return faults as ReadonlyArray<ValidationFault>;
};
export default validateLicenseComponent;
