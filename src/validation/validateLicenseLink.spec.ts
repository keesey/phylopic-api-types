import { expect } from 'chai';
import { describe, it } from 'mocha';
import ALL_LICENSES from '../licenses/ALL_LICENSES';
import VALID_LICENSES from '../licenses/VALID_LICENSES';
import validateLicenseLink from './validateLicenseLink';
import { ValidationFault } from './ValidationFault';
describe('validation/validateLicenseLink', () => {
    const test = (link: any, required = false, errorField = '') => {
        describe(`when given ${JSON.stringify(link)}`, () => {
            let result: ReadonlyArray<ValidationFault> = [];
            beforeEach(() => {
                result = validateLicenseLink(link, 'license', required);
            });
            it('should yield an array', () => {
                /* tslint:disable:no-unused-expression */
                expect(Array.isArray(result)).to.be.true;
                /* tslint:enable:no-unused-expression */
            });
            it(`should${errorField ? '' : ' not'} yield an error`, () => {
                expect(result.length).to.equal(errorField ? 1 : 0);
            });
            if (errorField) {
                it(`should give the field as "_links.${errorField}"`, () => {
                    expect(result[0].field).to.equal(`_links.${errorField}`);
                });
            }
        });
    };
    test(null, false);
    test(null, true, 'license');
    test('', false, 'license');
    test({}, false, 'license.href');
    test({ href: null }, false, 'license.href');
    test({ href: '' }, false, 'license.href');
    test({ href: '/foo' }, false, 'license.href');
    test({ href: '#foo' }, false, 'license.href');
    VALID_LICENSES.forEach((href) => test({ href }));
    ALL_LICENSES.forEach((href) => {
        if (VALID_LICENSES.indexOf(href) < 0) {
            test({ href }, false, 'license.href');
        }
    });
});
