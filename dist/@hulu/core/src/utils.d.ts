interface SomeCase {
    camel: string;
    kebab: string;
    pascal: string;
    constant: string;
}
export declare function someCase(name: string): SomeCase;
export declare function isCancelPrompt(prompt: any, message?: string | string[]): void;
export {};
