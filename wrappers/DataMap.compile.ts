import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/data_map.tact',
    options: {
        debug: true,
    },
};
