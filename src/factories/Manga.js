/**
 * Constructed manga husk object
 * @typedef {Object} MangaHusk
 * @property {Number} id Manga ID
 * @property {String} title Manga title
 * @property {String} artwork Cover artwork URL
 */

/**
 * Constructed manga object
 * @typedef {Object} Manga
 * @augments MangaHusk
 * @property {String} author Manga author
 * @property {MangaStatus} status Manga status
 * @property {String} url Manga URL
 * @property {Number} chapterCount Amount of volumes
 * @property {Number} volumeCount Amount of volumes
 * @property {Object<String, Volume[]>} volumes Manga volumes
 * @property {ChapterHusk[]} chapters Manga chapters
 * @property {Function} getHusk Returns MangaHusk
 */

/**
 * Manga status enum
 * @typedef { "Ongoing" | "Completed" | "Cancelled" | "Hiatus" } MangaStatus
 */
const MangaStatus = {
    1: "Ongoing",
    2: "Completed",
    3: "Cancelled",
    4: "Hiatus"
};

/**
 * Constructed volume object
 * @typedef {Number} Volume
 */

/**
 * Constructs Manga object from raw data
 * @param {Object} [rawManga] Raw manga object
 * @returns {MangaHusk|Manga} Manga husk if no parameters are specified
 */
export default function constructManga (rawManga) {

    // MangaHusk
    const manga = {
        id: 0,
        title: "",
        artwork: ""
    };

    // Create Manga object if rawManga is provided
    if (typeof rawManga === "object") {

        function huskGetter () {
            return {
                id: this.id,
                title: this.title,
                artwork: this.artwork
            }
        }

        Object.assign(manga, {
            id: parseInt(rawManga.id),
            title: rawManga.title || "No Title",
            artwork: rawManga.mainCover,
            author: rawManga.author[0],
            status: MangaStatus[rawManga.publication.status] || "Unknown",
            url: `https://mangadex.org/title/${rawManga.id}`,
            chapterCount: parseInt(rawManga.lastChapter),
            volumeCount: parseInt(rawManga.lastVolume),
            chapters: [],
            volumes: {},
            getHusk: huskGetter.bind(manga)
        });

        rawManga.chapters.forEach(chapter => {
            if (chapter.language === "gb") {

                const chapterNumber = Number(chapter.chapter);

                // Prevent duplicates
                if (manga.chapters.every(({ chapter }) => chapter !== chapterNumber)) {

                    manga.chapters.push({
                        index: manga.chapters.length,
                        id: chapter.id,
                        title: chapter.title || "No Title",
                        chapter: chapterNumber,
                        volume: chapter.volume ? Number(chapter.volume) : null
                    });
                    

                    if (chapter.volume) {

                        const { volume } = chapter;

                        if (!manga.volumes.hasOwnProperty(volume)) {
                            manga.volumes[volume] = [];
                        }

                        manga.volumes[volume].push(chapterNumber);
                    }

                }
            }
        });

        // Sort chapters
        manga.chapters.sort(({ chapter: chapter1 }, { chapter: chapter2 }) => chapter1 - chapter2);

        // Fix NaN chapterCount & volumeCount
        if (isNaN(manga.chapterCount)) manga.chapterCount = manga.chapters.filter(({ chapter }) => Number.isInteger(chapter)).length;
        if (isNaN(manga.volumeCount)) manga.volumeCount = Object.keys(manga.volumes).length;

        /*
        const filteredChapters = rawManga.chapters.filter(chapter => {
            return chapter.language === "gb";
        });

        // Create husk chapters with only metadata
        filteredChapters.forEach(([ chapterId, chapterData ], index) => {

            const chapterNumber = Number(chapterData.chapter);

            if (manga.chapters.every(({ chapter }) => chapter !== chapterNumber)) {

                manga.chapters.push({
                    index: manga.chapters.length,
                    id: Number(chapterId),
                    title: chapterData.title || "No Title",
                    chapter: chapterNumber,
                    volume: Number(chapterData.volume) || null
                });

                // Separately counted to prevent .5 chapters from increasing the chapter count
                if (Number.isInteger(chapterNumber)) {
                    manga.chapterCount += 1;
                }
    
                if (chapterData.volume) {
    
                    if (!manga.volumes.hasOwnProperty(chapterData.volume)) {
                        manga.volumes[chapterData.volume] = [];
                    }
    
                    manga.volumes[chapterData.volume].push(parseInt(chapterData.chapter));
                }

            }
        });

        manga.chapters.sort(({ chapter: chapter1 }, { chapter: chapter2 }) => chapter1 - chapter2);

        manga.volumeCount = Object.keys(manga.volumes).length;
        */

    }

    return manga;
};