type BranchioProviderOptions = {
    debug: boolean;
};
declare function BranchioProvider(this: any, options: BranchioProviderOptions): {
    exports: {
        sdk: () => any;
    };
};
export default BranchioProvider;
