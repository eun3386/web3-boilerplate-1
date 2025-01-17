import React, { FC, useEffect, useState } from 'react';
import { IMyAnimalCard } from '../components/MyAnimalCard';
import SaleAnimalCard from '../components/SaleAnimalCard';
import { mintAnimalTokenContract, saleAnimalTokenContract } from '../contracts';

interface SaleAnimalProps {
    account: string;
}

const SaleAnimal: FC<SaleAnimalProps> = ({ account }) => {
    const [saleAnimalCardArray, setSaleAnimalCardArray] = useState<IMyAnimalCard[]>();

    const getOnSaleAnimalTokens = async () => {
        try {
            const onSaleAnimalTokenArrayLength = await saleAnimalTokenContract.methods.getOnSaleAnimalTokenArrayLength().call();

            const tempOnSaleArray: IMyAnimalCard[] = [];

            for (let i = 0; i < parseInt(onSaleAnimalTokenArrayLength, 10); i++) {
                const animalTokenId = await saleAnimalTokenContract.methods.onSaleAnimalTokenArray(i).call();

                const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();

                const animalPrice = await saleAnimalTokenContract.methods.animalTokenPrices(animalTokenId).call();

                tempOnSaleArray.push({ animalTokenId, animalType, animalPrice });
            }
            setSaleAnimalCardArray(tempOnSaleArray);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getOnSaleAnimalTokens();
    }, []);

    useEffect(() => {
        console.log(saleAnimalCardArray)
    }, [saleAnimalCardArray]);

    return (
        <div>
            {saleAnimalCardArray && saleAnimalCardArray.map((v, i) => {
                return <SaleAnimalCard key={i} animalType={v.animalType} animalPrice={v.animalPrice} animalTokenId={v.animalTokenId} account={account} getOnSaleAnimalTokens={getOnSaleAnimalTokens} />
            })}
        </div>
    );
}

export default SaleAnimal;