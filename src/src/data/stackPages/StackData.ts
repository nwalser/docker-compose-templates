import { readable, writable, type Readable } from "svelte/store";
import type { StackPage } from "./StackPageModel";
import stackPages from "./stackPages.json";
import Fuse from 'fuse.js'


export function getStackPage(stackId: string): StackPage | undefined {
    return getStackPages().find(s => s.id == stackId);
}


export function getStackPagesUsingImage(image: string) {
    return getStackPages().filter(s => s.compose.services.some(s => s.image == image));
}

export function getStackPages(): StackPage[] {
    return stackPages;
}

export function searchStackPages(search: string) {
    if(search == "") return getStackPages();

    const options = {
        includeScore: true,
        keys: ['name', 'description']
    }

    const fuse = new Fuse(getStackPages(), options)

    const result = fuse.search(search)

    return result
        .sort((n1, n2) => n1.score! - n2.score!)
        .map(r => r.item);
}