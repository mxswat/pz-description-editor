import { NEW_LINE, parseDescription, replaceDescription } from "./parser";

test('should parse only the description', () => {
    const original = [
        'version=1',
        'id=2768901065',
        'title=Fashionoid - Gear Transmog',
        'description=[h1] Header text 1 [/h1]',
        'description=[h1] Header text 2 [/h1]',
        'visibility=public',
    ].join(NEW_LINE)

    const output = [
        '[h1] Header text 1 [/h1]',
        '[h1] Header text 2 [/h1]',
    ].join(NEW_LINE)

    const result = parseDescription(original)
    console.log({
        result,
        output
    })
    expect(result).toEqual(output);
});


test('should replace only the description', () => {
    const original = [
        'version=1',
        'id=2768901065',
        'title=Fashionoid - Gear Transmog',
        'description=[h1] Header text [/h1]',
        'description=[h1] Header text [/h1]',
        'visibility=public',
    ].join(NEW_LINE)

    const newDesc = [
        '[h2] New Desc! [/h2]',
    ].join(NEW_LINE)

    const expected = [
        'version=1',
        'id=2768901065',
        'title=Fashionoid - Gear Transmog',
        'description=[h2] New Desc! [/h2]',
        'visibility=public',
    ].join(NEW_LINE)

    const result = replaceDescription(original, newDesc)
    expect(result).toEqual(expected);
});