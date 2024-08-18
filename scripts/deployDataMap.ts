import { toNano } from '@ton/core';
import { DataMap } from '../wrappers/DataMap';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const dataMap = provider.open(await DataMap.fromInit());

    await dataMap.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(dataMap.address);

    // run methods on `dataMap`
}
