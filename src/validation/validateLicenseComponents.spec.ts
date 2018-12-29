import { expect } from 'chai';
import { describe, it } from 'mocha';
import validateLicenseComponents from './validateLicenseComponents';
import { ValidationFault } from './ValidationFault';
describe('validation/validateLicenseComponents', () => {
    const test = (value: string, isError = false) => {
        describe(`when given ${JSON.stringify(value)}`, () => {
            let result: ReadonlyArray<ValidationFault> = [];
            beforeEach(() => {
                result = validateLicenseComponents(value);
            });
            it('should yield an array', () => {
                /* tslint:disable:no-unused-expression */
                expect(Array.isArray(result)).to.be.true;
                /* tslint:enable:no-unused-expression */
            });
            it(`should${isError ? '' : ' not'} yield an error`, () => {
                expect(result.length).to.equal(isError ? 1 : 0);
            });
            if (isError) {
                it('should give the field as "license_components"', () => {
                    expect(result[0].field).to.equal('license_components');
                });
            }
        });
    };
    test('');
    test('by');
    test('   by   ');
    test('\tby\t');
    test('by nc');
    test('by  nc');
    test('by\tnc');
    test('by sa');
    test('by nc sa');
    test('nc');
    test('sa');
    test('-by');
    test('-nc');
    test('-sa');
    test('-by nc');
    test('-by nc sa');
    test('-by sa');
    test('-by -nc sa');
    test('-by -nc -sa');
    test('-nc -sa');
    test('-sa');
    test('foo', true);
    test('/by', true);
    test('+by', true);
    test('by nc ss', true);
});
