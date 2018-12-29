import { expect } from 'chai';
import { describe, it } from 'mocha';
import PUBLIC_DOMAIN_LICENSES from '../licenses/PUBLIC_DOMAIN_LICENSES';
import VALID_LICENSES from '../licenses/VALID_LICENSES';
import { ImagePost } from '../types/ImagePost';
import validateImagePost from './validateImagePost';
import { ValidationFault } from './ValidationFault';
const UUIDV1 = 'f70ad9a4-0acb-11e9-ab14-d663bd873d93';
const UUIDV4 = 'e8f1852b-7ec4-4bb1-8252-5aecab430909';
describe('validation/validateImagePost', () => {
    const test = (payload: any, errorFields: string[] = []) => {
        describe(`when given ${JSON.stringify(payload)}`, () => {
            let result: ReadonlyArray<ValidationFault> = [];
            beforeEach(() => {
                result = validateImagePost(payload);
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
    test({}, ['_links']);
    test({ attribution: '' }, ['_links']);
    test({ attribution: null }, ['_links']);
    test({ attribution: {} }, ['_links', 'attribution']);
    test({ attribution: 'foo' }, ['_links']);
    test({ _links: null }, ['_links']);
    test({ _links: {} }, ['_links.generalNode', '_links.license', '_links.specificNode']);
    test({ _links: { generalNode: null } }, ['_links.license', '_links.specificNode']);
    test({ _links: { generalNode: '' } }, ['_links.generalNode', '_links.license', '_links.specificNode']);
    test({ _links: { generalNode: {} } }, ['_links.generalNode.href', '_links.license', '_links.specificNode']);
    test(
        { _links: { generalNode: { href: null } } },
        ['_links.generalNode.href', '_links.license', '_links.specificNode'],
    );
    test(
        { _links: { generalNode: { href: '/foo' } } },
        ['_links.generalNode.href', '_links.license', '_links.specificNode'],
    );
    test(
        { _links: { generalNode: { href: `/nodes/${UUIDV1}` } } },
        ['_links.generalNode.href', '_links.license', '_links.specificNode'],
    );
    test(
        { _links: { generalNode: { href: `/nodes/${UUIDV4}` } } },
        ['_links.license', '_links.specificNode'],
    );
    test({ _links: { license: null } }, ['_links.generalNode', '_links.license', '_links.specificNode']);
    test({ _links: { license: '' } }, ['_links.generalNode', '_links.license', '_links.specificNode']);
    test({ _links: { license: {} } }, ['_links.generalNode', '_links.license.href', '_links.specificNode']);
    test({ _links: { license: { href: null } } }, ['_links.generalNode', '_links.license.href', '_links.specificNode']);
    test(
        { _links: { license: { href: 'foo' } } },
        ['_links.generalNode', '_links.license.href', '_links.specificNode'],
    );
    VALID_LICENSES.forEach((href) => {
        const isPublicDomain = PUBLIC_DOMAIN_LICENSES[href];
        const errorFields = ['_links.generalNode', '_links.specificNode'];
        if (!isPublicDomain) {
            errorFields.push('attribution');
        }
        test({ _links: { license: { href } } }, errorFields);
        test({ _links: { license: { href } }, attribution: 'foo' }, ['_links.generalNode', '_links.specificNode']);
    });
    test({ _links: { specificNode: null } }, ['_links.generalNode', '_links.license', '_links.specificNode']);
    test({ _links: { specificNode: '' } }, ['_links.generalNode', '_links.license', '_links.specificNode']);
    test({ _links: { specificNode: {} } }, ['_links.generalNode', '_links.license', '_links.specificNode.href']);
    test(
        { _links: { specificNode: { href: null } } },
        ['_links.generalNode', '_links.license', '_links.specificNode.href'],
    );
    test(
        { _links: { specificNode: { href: '/foo' } } },
        ['_links.generalNode', '_links.license', '_links.specificNode.href'],
    );
    test(
        { _links: { specificNode: { href: `/nodes/${UUIDV1}` } } },
        ['_links.generalNode', '_links.license', '_links.specificNode.href'],
    );
    test(
        { _links: { specificNode: { href: `/nodes/${UUIDV4}` } } },
        ['_links.generalNode', '_links.license'],
    );
    VALID_LICENSES.forEach((href) => {
        const post: ImagePost = {
            _links: {
                generalNode: null,
                license: { href },
                specificNode: {
                    href: `/nodes/${UUIDV4}`,
                },
            },
            attribution: null,
        };
        const isPublicDomain = PUBLIC_DOMAIN_LICENSES[href];
        test(post, isPublicDomain ? [] : ['attribution']);
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
