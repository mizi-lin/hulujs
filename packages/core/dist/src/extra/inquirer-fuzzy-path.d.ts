import InquirerAutocomplete from 'inquirer-autocomplete-prompt';
declare class InquirerFuzzyPath extends InquirerAutocomplete {
    [x: string]: any;
    constructor(question: any, rl: any, answers: any);
    search(searchTerm: any): any;
    onSubmit(line: any): void;
}
export default InquirerFuzzyPath;
