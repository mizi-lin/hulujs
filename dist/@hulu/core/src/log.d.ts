export declare class Log {
    static Sign: string;
    t(message: string | string[]): any[];
    text(message: string | string[], isStep?: boolean, sign?: string): string;
    start(message: string | string[]): void;
    step(message: string | string[]): void;
    end(message: string | string[], exit?: boolean): false;
    info(message: string | string[]): void;
    message(message: string | string[]): void;
    success(message: string | string[]): void;
    warn(message: string | string[]): void;
    warning(message: string | string[]): void;
    error(message: string | string[]): void;
    emptyLine(lineNumber?: number): void;
}
declare const $log: Log;
export { $log };
