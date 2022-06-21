import fetcher from './fetcher';
import RoosterRecordType from "../types/RoosterRecordType";

export function syncRoosters(roosters:RoosterRecordType[]) {
    return fetcher.post(`/syncRoosters`, {roosters});
}

export function fetchRoosters() {
    return fetcher.get(`/fetchRoosters`);
}
