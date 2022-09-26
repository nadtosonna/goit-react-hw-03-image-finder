import axios from "axios";

const URL = 'https://pixabay.com/api/';
const KEY = '29034983-efec06dd5286ef1d9795c8211';
const LIMIT = 12;
const TYPE = 'photo';
const ORIENTATION = 'horizontal';

const instance = axios.create({
    baseURL: URL,
    params: {
        key: KEY,
        image_type: TYPE,
        orientation: ORIENTATION,
        per_page: LIMIT,
    }
});

export const searchImages = async (query, page) => {
    const { data } = await instance.get('/', {
        params: {
            query,
            page,
        }
    });
    return data;
}