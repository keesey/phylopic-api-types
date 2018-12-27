import ALL_LICENSES from './ALL_LICENSES';
import LICENSE_COMPONENTS from './LICENSE_COMPONENTS';
export default (components: string[]) => {
    let licenses = [...ALL_LICENSES];
    components.forEach((component) => {
        if (!licenses.length) {
            return;
        }
        if (component.charAt(0) === '-') {
            const actualComponent = component.substr(1);
            licenses = licenses.filter((license) =>
                LICENSE_COMPONENTS[license].indexOf(actualComponent) < 0);
        } else {
            licenses = licenses.filter((license) =>
                LICENSE_COMPONENTS[license].indexOf(component) >= 0);
        }
    });
    return licenses;
};
