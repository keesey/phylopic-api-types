import { expect } from 'chai';
import { describe, it } from 'mocha';
import { NomenPartClass } from 'parse-nomen';
import validateNodePatch from './validateNodePatch';
import { ValidationFault } from './ValidationFault';
const UUIDV1 = 'f70ad9a4-0acb-11e9-ab14-d663bd873d93';
const UUIDV4 = 'e8f1852b-7ec4-4bb1-8252-5aecab430909';
describe('validation/validateImagePatch', () => {
    const test = (payload: any, errorFields: string[] = []) => {
        describe(`when given ${JSON.stringify(payload)}`, () => {
            let result: ReadonlyArray<ValidationFault> = [];
            beforeEach(() => {
                result = validateNodePatch(payload);
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
    test({});
    test({ _links: null }, ['_links']);
    test({ _links: {} });
    test({ _links: { external: null } }, ['_links.external']);
    test({ _links: { external: [] } });
    test({ _links: { external: [null] } }, ['_links.external[0]']);
    test({ _links: { external: [{}] } }, ['_links.external[0].href']);
    test(
        { _links: { external: [{ href: 'foo', title: 'bar'}] } },
        ['_links.external[0].href', '_links.external[0].title'],
    );
    test(
        { _links: { external: [{ href: 'http://eol.org/1', title: 'bar'}] } },
        ['_links.external[0].title'],
    );
    test(
        { _links: { external: [{ href: 'foo', title: 'Encyclopedia of Life'}] } },
        ['_links.external[0].href'],
    );
    test({ _links: { external: [{ href: 'http://eol.org/1', title: 'Encyclopedia of Life'}] } });
    test(
        { _links: { external: [
            { href: 'http://eol.org/1', title: 'Encyclopedia of Life'},
            { href: 'foo', title: 'bar'},
        ] } },
        ['_links.external[1].href', '_links.external[1].title'],
    );
    test({ _links: { parentNode: null } });
    test({ _links: { parentNode: {} } }, ['_links.parentNode.href']);
    test({ _links: { parentNode: { href: 'foo' } } }, ['_links.parentNode.href']);
    test({ _links: { parentNode: { href: `/nodes/${UUIDV1}` } } }, ['_links.parentNode.href']);
    test({ _links: { parentNode: { href: `/nodes/${UUIDV4}` } } });
    test({ names: null }, ['names']);
    test({ names: {} }, ['names']);
    test({ names: [] }, ['names']);
    test({ names: [null] }, ['names[0]']);
    test({ names: [{}] }, ['names[0]']);
    test({ names: [[{}]] }, ['names[0][0].class', 'names[0][0].text']);
    test(
        {
            names: [
                [
                    { class: NomenPartClass.SCIENTIFIC, text: 'Homo sapiens' },
                    { class: NomenPartClass.CITATION, text: 'Linnaeus 1758' },
                ],
                [
                    { class: NomenPartClass.VERNACULAR, text: 'humans' },
                ],
            ],
        },
    );
    test(
        {
            names: [
                [
                    { class: NomenPartClass.SCIENTIFIC, text: 'Homo sapiens' },
                    { class: NomenPartClass.CITATION, text: 'Linnaeus 1758' },
                ],
                [
                    { class: NomenPartClass.VERNACULAR, text: 'humans' },
                ],
                [
                    { class: 'foo', text: '' },
                ],
            ],
        },
        [
            'names[2][0].class',
            'names[2][0].text',
        ],
    );
    test({ root: null }, ['root']);
    test({ root: false });
    test({ root: true });
    test({ _links: { parentNode: null }, root: true });
    test({ _links: { parentNode: { href: `/nodes/${UUIDV4}`} }, root: true }, ['root']);
    test({ _links: { parentNode: null }, root: true });
    test(
        {
            _links: {
                external: [
                    { href: 'http://eol.org/1' },
                    { href: 'http://eol.org/2', title: 'Encyclopedia of Life' },
                ],
                parentNode: {
                    href: `/nodes/${UUIDV4}`,
                },
            },
            names: [
                [
                    { class: NomenPartClass.SCIENTIFIC, text: 'Homo sapiens' },
                    { class: NomenPartClass.CITATION, text: 'Linnaeus 1758' },
                ],
                [
                    { class: NomenPartClass.VERNACULAR, text: 'humans' },
                ],
            ],
            root: false,
        },
    );
});
