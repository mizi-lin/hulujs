import { ExecOptions } from 'shelljs';
interface BachExecOptions extends ExecOptions {
    type?: 'none' | 'line' | 'parse';
}
export declare class Bash {
    live(command: string | string[], config?: BachExecOptions): void;
    exec(commands: string | string[], config?: BachExecOptions): any;
}
export declare const $bash: Bash;
export {};
