import { expect } from 'chai';
import { describe, it } from 'mocha';
import PUBLIC_DOMAIN_LICENSES from '../licenses/PUBLIC_DOMAIN_LICENSES';
import VALID_LICENSES from '../licenses/VALID_LICENSES';
import { ImagePatch } from '../models/ImagePatch';
import validateImagePatch from './validateImagePatch';
import { ValidationFault } from './ValidationFault';
const UUIDV1 = 'f70ad9a4-0acb-11e9-ab14-d663bd873d93';
const UUIDV4 = 'e8f1852b-7ec4-4bb1-8252-5aecab430909';
describe('validation/validateImagePatch', () => {
    const test = (payload: any, errorFields: string[] = []) => {
        describe(`when given ${JSON.stringify(payload)}`, () => {
            let result: ReadonlyArray<ValidationFault> = [];
            beforeEach(() => {
                result = validateImagePatch(payload);
            });
            it('should yield an array', () => {
                /* tslint:disable:no-unused-expression */
                expect(Array.isArray(result)).to.be.true;
                /* tslint:enable:no-unused-expression */
            });
            it(`should yield ${errorFields.length} error${errorFields.length === 1 ? '' : 's'}`, () => {
                expect(result.length).to.equal(errorFields.length);
            });
            if (errorFields.length) {
                it('should yield the expected error fields', () => {
                    const actual = result.map((fault) => fault.field);
                    expect(actual).to.deep.equal(errorFields);
                });
            }
        });
    };
    test(null, ['']);
    test('', ['']);
    test({});
    test({ attribution: '' });
    test({ attribution: null });
    test({ attribution: {} }, ['attribution']);
    test({ attribution: 'foo' });
    test({ _links: null }, ['_links']);
    test({ _links: {} });
    test({ _links: { generalNode: null } });
    test({ _links: { generalNode: '' } }, ['_links.generalNode']);
    test({ _links: { generalNode: {} } }, ['_links.generalNode.href']);
    test({ _links: { generalNode: { href: null } } }, ['_links.generalNode.href']);
    test({ _links: { generalNode: { href: '/foo' } } }, ['_links.generalNode.href']);
    test({ _links: { generalNode: { href: `/nodes/${UUIDV1}` } } }, ['_links.generalNode.href']);
    test({ _links: { generalNode: { href: `/nodes/${UUIDV4}` } } });
    test({ _links: { license: null } }, ['_links.license']);
    test({ _links: { license: '' } }, ['_links.license']);
    test({ _links: { license: {} } }, ['_links.license.href']);
    test({ _links: { license: { href: null } } }, ['_links.license.href']);
    test({ _links: { license: { href: 'foo' } } }, ['_links.license.href']);
    VALID_LICENSES.forEach((href) => {
        test({ _links: { license: { href } } });
    });
    test({ _links: { specificNode: null } }, ['_links.specificNode']);
    test({ _links: { specificNode: '' } }, ['_links.specificNode']);
    test({ _links: { specificNode: {} } }, ['_links.specificNode.href']);
    test({ _links: { specificNode: { href: null } } }, ['_links.specificNode.href']);
    test({ _links: { specificNode: { href: '/foo' } } }, ['_links.specificNode.href']);
    test({ _links: { specificNode: { href: `/nodes/${UUIDV1}` } } }, ['_links.specificNode.href']);
    test({ _links: { specificNode: { href: `/nodes/${UUIDV4}` } } });
    VALID_LICENSES.forEach((href) => {
        const patch: ImagePatch = {
            _links: {
                license: { href },
            },
            attribution: null,
        };
        const isPublicDomain = PUBLIC_DOMAIN_LICENSES[href];
        test(patch, isPublicDomain ? [] : ['attribution']);
    });
    test({
        _links: {
            generalNode: '',
            license: {
                href: 'foo',
            },
            specificNode: {
                href: `/nodes/${UUIDV1}`,
            },
        },
    }, [
        '_links.generalNode',
        '_links.license.href',
        '_links.specificNode.href',
    ]);
});
