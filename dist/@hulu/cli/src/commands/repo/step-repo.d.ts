/**
 * 创建 hulu repo
 */
interface StepRepoArgs {
    compiler: 'vite' | string;
    dirname: string;
}
declare const stepRepo: ({ compiler, dirname }: StepRepoArgs) => Promise<string>;
export default stepRepo;
