declare class Load {
    json(path: string): void;
    ts(path: string): Promise<any>;
}
declare const $load: Load;
export { $load };
