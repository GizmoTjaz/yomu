import axios from "axios";

const MANGADEX_ENDPOINT = "https://www.mangadex.org/api";

module.exports.getManga = function (id) {
    return new Promise((res, rej) => {
        axios.get(`${MANGADEX_ENDPOINT}/manga/${encodeURIComponent(id)}`).then(mangaRaw => {
            
            mangaRaw = mangaRaw.data;

            const filteredChapters = Object.entries(mangaRaw.chapter).filter(chapter => {
                return chapter[1].lang_name === "English";
            });

            const manga = {
                id,
                title: mangaRaw.manga.title,
                thumbnail: `https://www.mangadex.org/${mangaRaw.manga.cover_url}`,
                chapters: {}
            };

            filteredChapters.forEach(([ chapterId, chapterData ]) => {
                manga.chapters[parseInt(chapterData.chapter)] = {
                    id: chapterId,
                    title: chapterData.title,
                    chapter: parseInt(chapterData.chapter),
                    volume: parseInt(chapterData.volume)
                }
            });

            res(manga);

        }).catch(err => {
            rej(err);
        });
    })
};

module.exports.getChapter = function (id) {
    return new Promise((res, rej) => {
        axios.get(`${MANGADEX_ENDPOINT}/chapter/${encodeURIComponent(id)}`).then(chapterRaw => {

            chapterRaw = chapterRaw.data;

            const chapter = {
                id: chapterRaw.id,
                title: chapterRaw.title,
                chapter: parseInt(chapterRaw.chapter),
                volume: parseInt(chapterRaw.volume),
                pages: chapterRaw.page_array.map(page => encodeURI(`${chapterRaw.server}${chapterRaw.hash}/${page}`))
            };

            res(chapter);

        }).catch(err => {
            rej(err);
        })
    });
}