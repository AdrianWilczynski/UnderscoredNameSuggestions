import { assert } from 'chai';
import * as extension from '../extension';

suite('Extension should', function () {

    test('Be working ^^', function () {
        const line = 'private ItemRepository ';

        let completions = extension.getCompletionsTexts(line);

        assert.includeMembers(completions, ['_item', '_itemRepository']);
        assert.lengthOf(completions, 2);
    });

    test('Parse generic type', function () {
        const line = 'private readonly ItemRepository<Item> ';

        const completions = extension.getCompletionsTexts(line);

        assert.includeMembers(completions, ['_item', '_itemRepository']);
        assert.lengthOf(completions, 2);
    });

    test('Ignore keywords', function () {
        const line = 'private readonly ';

        const completions = extension.getCompletionsTexts(line);

        assert.lengthOf(completions, 0);
    });

    test('Provide hints despite multiple trailing spaces', function () {
        const line = 'private ItemRepository     ';

        const completions = extension.getCompletionsTexts(line);

        assert.isTrue(completions.length > 0);
    });


    test('Parse qualified types', function () {
        const line = 'private Repositories.ItemRepository ';

        const completions = extension.getCompletionsTexts(line);

        assert.includeMembers(completions, ['_item', '_itemRepository']);
        assert.lengthOf(completions, 2);
    });

    test('Parse qualified, generic types', function () {
        const line = 'private Repositories<MyType>.ItemRepository<MyOtherType<string, AnotherType>> ';

        const completions = extension.getCompletionsTexts(line);

        assert.includeMembers(completions, ['_item', '_itemRepository']);
        assert.lengthOf(completions, 2);
    });

    test('Provide hints for partial names', function () {
        const line = 'private MyItemRepository ';

        const completions = extension.getCompletionsTexts(line);

        assert.includeMembers(completions, ['_my', '_myItem', '_myItemRepository']);
    });

    test('Parse generic collection types and pluralize them', function () {
        const line = 'private IEnumerable<MyCustomType> ';

        const completions = extension.getCompletionsTexts(line);

        assert.lengthOf(completions, 4);
        assert.includeMembers(completions, ['_enumerable', '_mys', '_myCustoms', '_myCustomTypes']);
    });


    test("Parse array", function () {
        const line = 'private ItemService[][,] ';

        const completions = extension.getCompletionsTexts(line);

        assert.lengthOf(completions, 2);
        assert.includeMembers(completions, ['_items', '_itemServices']);
    });

    test("Parse array of generics", function () {
        const line = 'private ItemService<IDictionary<string, int>>[][,] ';

        const completions = extension.getCompletionsTexts(line);

        assert.lengthOf(completions, 2);
        assert.includeMembers(completions, ['_items', '_itemServices']);
    });

    test("Ignore this nonsense", function () {
        assert.lengthOf(extension.getCompletionsTexts('private My<Ty>pe '), 0);
        assert.lengthOf(extension.getCompletionsTexts('private MyType{} '), 0);
        assert.lengthOf(extension.getCompletionsTexts('private 7Type254)&^(#)89 '), 0);
        assert.lengthOf(extension.getCompletionsTexts('private [MyType] '), 0);
        assert.lengthOf(extension.getCompletionsTexts('private MyType[]] '), 0);
        assert.lengthOf(extension.getCompletionsTexts('public void MethodName(string value) '), 0);
        assert.lengthOf(extension.getCompletionsTexts('public void MethodName(string ) '), 0);
        assert.lengthOf(extension.getCompletionsTexts('public void PropertyName => '), 0);
        assert.lengthOf(extension.getCompletionsTexts('if (couldItBeTrue == '), 0);
        assert.lengthOf(extension.getCompletionsTexts('if (value < '), 0);
        assert.lengthOf(extension.getCompletionsTexts('if (value< '), 0);
        assert.lengthOf(extension.getCompletionsTexts('public class '), 0);
        assert.lengthOf(extension.getCompletionsTexts('class '), 0);
        assert.lengthOf(extension.getCompletionsTexts('namespace '), 0);
    });
});