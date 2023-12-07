import { Arguments } from 'yargs';
export declare const command = "prod";
export declare const aliases: string[];
export declare const describe = "hulu prod \u6784\u5EFA\u751F\u4EA7\u7248\u672C";
export declare const builder: (yargs: any) => any;
export declare const handler: (argv: Arguments<Record<string, any>>) => Promise<void>;
