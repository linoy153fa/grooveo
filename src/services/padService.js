import { storageService } from './asyncStorageService'
import padsData from '../assets/data/pads.json'

const KEY = 'MUSIC'

export const padService = {
    query,
    getById,
    remove,
    save
}


async function query() {
    try {
        return await storageService.query(KEY, padsData) || []
    } catch (err) {
        console.log(err, 'err')
        throw err
    }

}

async function getById(padId) {
    return await storageService.get(KEY, padId)
}

async function remove(padId) {
    await storageService.remove(KEY, padId)
    return Promise.resolve()
}

async function save(pad) {
    if (pad._id) {
        return await storageService.put(KEY, pad)
    }
    else {
        return await storageService.post(KEY, pad)
    }
}