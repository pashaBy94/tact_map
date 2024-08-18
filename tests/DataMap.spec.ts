import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { DataMap } from '../wrappers/DataMap';
import '@ton/test-utils';

describe('DataMap', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let dataMap: SandboxContract<DataMap>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        dataMap = blockchain.openContract(await DataMap.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await dataMap.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: dataMap.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and dataMap are ready to use
    });
});
