export declare class Log {
    t(message: string | string[]): any[];
    text(message: string | string[], isStep?: boolean): string;
    start(message: string | string[]): void;
    step(message: string | string[]): void;
    end(message: string | string[]): void;
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
