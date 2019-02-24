import { ImageListParameters } from '../queryParameters/ImageListParameters';
import validateImageParameters from './validateImageParameters';
import validateImageSort from './validateImageSort';
import validateLicenseComponents from './validateLicenseComponents';
import { validateListParameters } from './validateListParameters';
export const validateImageListParameters = (parameters: ImageListParameters) => {
    let faults = validateListParameters(parameters, validateImageParameters, validateImageSort);
    if (parameters.licensecomponents) {
        faults = [...faults, ...validateLicenseComponents(parameters.licensecomponents)];
    }
    return faults;
};
export default validateImageListParameters;
