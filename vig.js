"use strict";

const startUnicode = "a".charCodeAt();
const alphabetLength = 26;

const shiftMode = Object.freeze({
    FORWARD: "forward",
    BACKWARD: "backward",
});

function substitute(text, key, mode = shiftMode.FORWARD) {
    return [...text]
        .map((textChar, index) => {
            // corresponding character from the key
            const keyChar = [...key][index % key.length];
            // keychar unicode alphabet index
            const keyCharAlphabetIndex = keyChar.charCodeAt() - startUnicode;
            // plain text unicode alphabet index
            const plainTextCharAlphabetIndex =
                textChar.charCodeAt() - startUnicode;

            // I reject your text and substitute my own
            const substitutedCharAlphabetIndex = mod(
                plainTextCharAlphabetIndex +
                    keyCharAlphabetIndex *
                        (mode === shiftMode.FORWARD ? 1 : -1),
                alphabetLength
            );

            const substitutedCharUnicode =
                substitutedCharAlphabetIndex + startUnicode;

            return String.fromCharCode(substitutedCharUnicode);
        })
        .join("");
}

//https://stackoverflow.com/q/4467539
// the '%' operator is actually remainder, but we need mod
function mod(p, q) {
    return ((p % q) + q) % q;
}

/**
 *
 * @param {string} plainText - The plain text to encrypt
 * @param {string} key - The key to use for encryption
 * @returns
 */
function encrypt(plainText, key) {
    return substitute(plainText, key, shiftMode.FORWARD);
}

/**
 *
 * @param {string} cipherText - The cipher text to decrypt
 * @param {string} key - The key to use for decryption
 * @returns
 */
function decrypt(cipherText, key) {
    return substitute(cipherText, key, shiftMode.BACKWARD);
}

module.exports = {
    encrypt,
    decrypt,
};
