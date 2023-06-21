/**
 * 创建 hulu repo
 */
declare const stepRepo: ({ compiler }: {
    compiler?: string | undefined;
}) => Promise<string>;
export default stepRepo;
