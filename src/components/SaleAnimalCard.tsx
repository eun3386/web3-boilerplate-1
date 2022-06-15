import React, { FC, useEffect, useState } from 'react';
import { mintAnimalTokenContract, saleAnimalTokenContract, web3 } from '../contracts';
import AnimalCard from './AnimalCard';

interface SaleAnimalCardProps {
    animalType: string;
    animalPrice: string;
    animalTokenId: string;
    account: string;
    getOnSaleAnimalTokens: () => Promise<void>;
}

const SaleAnimalCard: FC<SaleAnimalCardProps> = ({ animalType, animalPrice, animalTokenId, account, getOnSaleAnimalTokens }) => {

    const [isBuyable, setIsBuyable] = useState<boolean>(false);

    const getAnimalTokenOwner = async () => {
        try {
            const response = await mintAnimalTokenContract.methods.ownerOf(animalTokenId).call();
            setIsBuyable(response.toLocaleLowerCase() === account.toLocaleLowerCase());
        } catch (error) {
            console.error(error)
        }
    }

    const onClickBuy = async () => {
        try {
            if (!account) return;
            const response = await saleAnimalTokenContract.methods.purchaseAnimalToken(animalTokenId).send({ from: account, value: animalPrice });

            if (response.status) {
                getOnSaleAnimalTokens();
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getAnimalTokenOwner();
    }, []);


    return <div>
        <AnimalCard animalType={animalType} />
        <div><p>
            {web3.utils.fromWei(animalPrice)} Matic
        </p>
            <button onClick={onClickBuy} disabled={isBuyable}>Buy</button>
        </div>
    </div>;
}

export default SaleAnimalCard;

