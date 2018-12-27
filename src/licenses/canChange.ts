import PERMITTED_LICENSE_CHANGES from './PERMITTED_LICENSE_CHANGES';
export default (a: string, b: string) => {
    if (a === b) {
        return true;
    }
    return PERMITTED_LICENSE_CHANGES[a].indexOf(b) >= 0;
};
