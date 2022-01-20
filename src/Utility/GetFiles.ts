import { readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve } from 'path';

export default async function* GetFiles(dir: string): AsyncGenerator<string> | null {
    if (!existsSync(dir)) return null;

    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* GetFiles(res);
        } else {
            yield res;
        }
    }
}