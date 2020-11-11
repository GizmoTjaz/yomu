// Modules
import axios from "axios";

// Factories
import constructManga from "../factories/Manga";
import constructChapter from "../factories/Chapter";

// Variables
import { ENDPOINTS } from "./constants";

/**
 * Fetches manga from MangaDex
 * @param {Number} id Manga ID
 * @returns {Promise<import("../factories/Manga").Manga>} Manga object
 */
export function getManga (id) {
    return new Promise((res, rej) => {

        const
            mangaEndpoint = `${ENDPOINTS.MANGADEX_ENDPOINT}/manga/${encodeURIComponent(id)}`,
            rawManga = {};

        axios.get(mangaEndpoint).then(({ data }) => {

            const { data: _rawManga } = data;

            Object.assign(rawManga, _rawManga);

            axios.get(`${mangaEndpoint}/chapters`).then(({ data }) => { 

                const { data: _chapters } = data;

                rawManga.chapters = _chapters.chapters;
                res(constructManga(rawManga));

            });
            
        }).catch(err => {
            rej(err);
        });
    })
};

/**
 * Fetches chapter from MangaDex
 * @param {Number} id Chapter ID
 * @returns {Promise<import("../factories/Chapter").Chapter>} Chapter object
 */
export function getChapter (id) {
    return new Promise((res, rej) => {
        axios.get(`${ENDPOINTS.MANGADEX_ENDPOINT}/chapter/${encodeURIComponent(id)}`).then(({ data }) => {
            const { data: rawChapter } = data;
            res(constructChapter(rawChapter));
        }).catch(err => {
            rej(err);
        })
    });
}