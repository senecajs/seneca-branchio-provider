type BranchProviderOptions = {
    code: string;
    alias: string;
    stage: string;
    channel: string;
    feature: string;
    campaign: string;
    appId: string;
    tags: any;
    debug: boolean;
};
declare function BranchProvider(this: any, options: BranchProviderOptions): void;
export default BranchProvider;
