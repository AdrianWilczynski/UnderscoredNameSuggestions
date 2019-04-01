import { assert } from 'chai';
import { getCompletionsTexts } from '../completionTextProvider';

suite('Extension should', function () {

	test('Be working ^^', function () {
		let completions = getCompletionsTexts('private ItemRepository ', '');

		assert.includeMembers(completions, ['_item', '_itemRepository']);
		assert.lengthOf(completions, 2);
	});

	test('Parse generic type', function () {
		const completions = getCompletionsTexts('private readonly ItemRepository<Item> ', '');

		assert.includeMembers(completions, ['_item', '_itemRepository']);
		assert.lengthOf(completions, 2);
	});

	test('Ignore keywords', function () {
		const completions = getCompletionsTexts('private readonly ', '');

		assert.lengthOf(completions, 0);
	});

	test('Provide hints despite multiple trailing spaces', function () {
		const completions = getCompletionsTexts('private ItemRepository     ', '');

		assert.isTrue(completions.length > 0);
	});


	test('Parse qualified types', function () {
		const completions = getCompletionsTexts('private Repositories.ItemRepository ', '');

		assert.includeMembers(completions, ['_item', '_itemRepository']);
		assert.lengthOf(completions, 2);
	});

	test('Parse qualified, generic types', function () {
		const completions = getCompletionsTexts('private Repositories<MyType>.ItemRepository<MyOtherType<string, AnotherType>> ', '');

		assert.includeMembers(completions, ['_item', '_itemRepository']);
		assert.lengthOf(completions, 2);
	});

	test('Provide hints for partial names', function () {
		const completions = getCompletionsTexts('private MyItemRepository ', '');

		assert.includeMembers(completions, ['_my', '_myItem', '_myItemRepository']);
	});

	test('Parse generic collection types and pluralize them', function () {
		const completions = getCompletionsTexts('private IEnumerable<MyCustomType> ', '');

		assert.lengthOf(completions, 4);
		assert.includeMembers(completions, ['_enumerable', '_mies', '_myCustoms', '_myCustomTypes']);
	});


	test('Parse array', function () {
		const completions = getCompletionsTexts('private ItemService[][,] ', '');

		assert.lengthOf(completions, 2);
		assert.includeMembers(completions, ['_items', '_itemServices']);
	});

	test('Parse array of generics', function () {
		const completions = getCompletionsTexts('private ItemService<IDictionary<string, int>>[][,] ', '');

		assert.lengthOf(completions, 2);
		assert.includeMembers(completions, ['_items', '_itemServices']);
	});

	test('Accept tabs as whitespace characters', function () {
		const completions = getCompletionsTexts('\tprivate\tItemService<IDictionary<string, \tint>>[][,]\t \t', '');

		assert.lengthOf(completions, 2);
		assert.includeMembers(completions, ['_items', '_itemServices']);
	});

	test('Still work after closing and reopening suggestion list', function () {
		const completions = getCompletionsTexts('private ItemRepository itemRe', '');

		assert.lengthOf(completions, 2);
	});

	test('Guard against invalid suffix', function () {
		assert.lengthOf(getCompletionsTexts('private ItemRepository itemRe', ' { get; set; }'), 0);
		assert.lengthOf(getCompletionsTexts('private ItemRepository ', ' _itemRepository;'), 0);
	});

	test('Work for a valid suffix', function () {
		assert.lengthOf(getCompletionsTexts('private ItemRepository itemRe', ';'), 2);
		assert.lengthOf(getCompletionsTexts('private ItemRepository itemRe', '	; '), 2);
		assert.lengthOf(getCompletionsTexts('private ItemRepository itemRe', ';	'), 2);
		assert.lengthOf(getCompletionsTexts('private ItemRepository itemRe', '		     	'), 2);
		assert.lengthOf(getCompletionsTexts('private ItemRepository itemRe', ''), 2);
	});

	test('Correctly pluralize words ending with a consonant and "y"', function () {
		const completions = getCompletionsTexts('private ItemRepository[] ', '');

		assert.includeMembers(completions, ['_itemRepositories', '_items']);
	});

	test('Work if line suffix consists of a field assignment', function () {
		assert.includeMembers(getCompletionsTexts('private int ', '= 6;'), [, '_int']);
		assert.includeMembers(getCompletionsTexts('private IItemRepository ', '= new ItemRepository<Item>();'), [, '_item', '_itemRepository']);
	});

	test("Ignore this nonsense", function () {
		assert.lengthOf(getCompletionsTexts('private My<Ty>pe ', ''), 0);
		assert.lengthOf(getCompletionsTexts('private MyType{} ', ''), 0);
		assert.lengthOf(getCompletionsTexts('private 7Type254)&^(#)89 ', ''), 0);
		assert.lengthOf(getCompletionsTexts('private [MyType] ', ''), 0);
		assert.lengthOf(getCompletionsTexts('private MyType[]] ', ''), 0);
		assert.lengthOf(getCompletionsTexts('public void MethodName(string value) ', ''), 0);
		assert.lengthOf(getCompletionsTexts('public void MethodName(string ) ', ''), 0);
		assert.lengthOf(getCompletionsTexts('public void PropertyName => ', ''), 0);
		assert.lengthOf(getCompletionsTexts('if (couldItBeTrue == ', ''), 0);
		assert.lengthOf(getCompletionsTexts('if (value < ', ''), 0);
		assert.lengthOf(getCompletionsTexts('if (value< ', ''), 0);
		assert.lengthOf(getCompletionsTexts('public class ', ''), 0);
		assert.lengthOf(getCompletionsTexts('class ', ''), 0);
		assert.lengthOf(getCompletionsTexts('namespace ', ''), 0);
	});
});