/* eslint-disable no-undef */
const { encrypt, decrypt } = require("./vig");

describe.each([
    ["excavation", "sunrise", "wrprdsxaia"],
    ["technology", "improvement", "bqrybjpakl"],
    ["intelligence", "interference", "qamicqmxiaei"],
    ["depression", "entitlement", "hrizxdwusa"],
    ["uncertainty", "constituency", "wbpwkbtcrga"],
])("encrypt(%s, %s)", (plainText, key, expected) => {
    test(`returns ${expected}`, () => {
        expect(encrypt(plainText, key)).toBe(expected);
    });
});

describe.each([
    ["wrprdsxaia", "sunrise", "excavation"],
    ["bqrybjpakl", "improvement", "technology"],
    ["qamicqmxiaei", "interference", "intelligence"],
    ["hrizxdwusa", "entitlement", "depression"],
    ["wbpwkbtcrga", "constituency", "uncertainty"],
])("decrypt(%s, %s)", (cipherText, key, expected) => {
    test(`returns ${expected}`, () => {
        expect(decrypt(cipherText, key)).toBe(expected);
    });
});
