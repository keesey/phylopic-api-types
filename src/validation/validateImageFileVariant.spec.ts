import { expect } from 'chai';
import { describe, it } from 'mocha';
import validateImageFileVariant from './validateImageFileVariant';
import { ValidationFault } from './ValidationFault';
describe('validation/validateImageFileVariant', () => {
    const test = (variant: string | undefined, isError = false) => {
        describe(`when given ${typeof variant === 'string' ? `"${variant}"` : variant}`, () => {
            let result: ReadonlyArray<ValidationFault> = [];
            beforeEach(() => {
                result = validateImageFileVariant(variant);
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
                it('should give the field as "variant"', () => {
                    expect(result[0].field).to.equal('variant');
                });
            }
        });
    };
    test(undefined);
    test('');
    test('basic32');
    test('basic64');
    test('basic128');
    test('basic256');
    test('basic512');
    test('basic1024');
    test('social1200x630');
    test('social440x220');
    test('square32');
    test('square64');
    test('square128');
    test('square256');
    test('square512');
    test('square1024');
    test('basic', true);
    test('basic33', true);
    test('social', true);
    test('social1200', true);
    test('square', true);
    test('square2048', true);
});
