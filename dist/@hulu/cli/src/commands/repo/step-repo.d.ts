/**
 * 创建 hulu repo
 */
declare const stepRepo: ({ compiler }: {
    compiler?: string | undefined;
}) => Promise<void>;
export default stepRepo;
