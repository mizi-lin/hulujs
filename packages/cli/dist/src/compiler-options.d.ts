export declare const compilerOptions: ({
    label: string;
    value: string;
    hint: string;
    version: string;
    dev: string;
    build: string;
    config: {
        path: string;
        target: string;
        omitKeys: never[];
    };
} | {
    label: string;
    value: string;
    version: string;
    config: {
        path: string;
        target?: undefined;
        omitKeys?: undefined;
    };
    hint?: undefined;
    dev?: undefined;
    build?: undefined;
} | {
    label: string;
    value: string;
    version: string;
    dev: string;
    build: string;
    config: {
        path: string;
        omitKeys: string[];
        target?: undefined;
    };
    hint?: undefined;
} | {
    label: string;
    value: string;
    config: {
        path: string;
        target?: undefined;
        omitKeys?: undefined;
    };
    hint?: undefined;
    version?: undefined;
    dev?: undefined;
    build?: undefined;
})[];
