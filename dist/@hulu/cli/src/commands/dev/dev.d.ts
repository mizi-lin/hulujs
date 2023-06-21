import { Arguments } from 'yargs';
export declare const command = "dev";
export declare const aliases: string[];
export declare const describe = "hulu dev \u542F\u52A8\u672C\u5730\u5F00\u53D1\u670D\u52A1";
export declare const builder: (yargs: any) => any;
export declare const handler: (argv: Arguments<Record<string, any>>) => Promise<void>;
