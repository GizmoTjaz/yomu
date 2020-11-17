/**
 * Constructed chapter husk object
 * @typedef {Object} ChapterHusk
 * @property {Number} id Chapter ID
 * @property {Number} index Index of chapter in chapter list
 * @property {String} title Chapter title
 * @property {Number} chapter Chapter number
 * @property {Number} volume Chapter volume
 */

/**
 * Constructed chapter object
 * @typedef {Object} Chapter
 * @augments {ChapterHusk}
 * @property {Array} pages Array of chapter page URLs
 */

/**
 * Constructs Chapter object from raw data
 * @param {Object} [rawChapter] Raw chapter object
 * @returns {ChapterHusk|Chapter} Chapter husk if no parameters are specified
 */
export default function constructChapter (rawChapter) {

    // ChapterHusk
    const chapter = {
        id: 0,
        title: "No Title",
        chapter: 0,
        volume: 0
    };

    // Create Chapter object if rawChapter is provided
    if (typeof rawChapter === "object") {
        Object.assign(chapter, {
            id: rawChapter.id,
            title: rawChapter.title || "No Title",
            chapter: parseInt(rawChapter.chapter),
            volume: rawChapter.volume ? parseInt(rawChapter.volume) : null,
            pages: rawChapter.pages.map(page => {
                return encodeURI(`${rawChapter.server}${rawChapter.hash}/${page}`);
            })
        });
    }

    return chapter;
};