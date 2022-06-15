import React, { ChangeEvent, FC, useState } from 'react';
import { saleAnimalTokenContract, web3 } from '../contracts';
import AnimalCard from './AnimalCard';

export interface IMyAnimalCard {
    animalTokenId: string;
    animalType: string;
    animalPrice: string;
}

interface MyAnimalCardProps extends IMyAnimalCard {
    saleStatus: boolean;
    account: string;
}

const MyAnimalCard: FC<MyAnimalCardProps> = ({ animalType, animalTokenId, animalPrice, saleStatus, account }) => {
    const [sellPrice, setSellPrice] = useState<string>("");
    const [myAnimalPrice, setMyAnimalPrice] = useState<string>(animalPrice);

    const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
        setSellPrice(e.target.value);
    };

    const onClickSell = async () => {
        try {
            if (!account || !saleStatus) return;

            const response = await saleAnimalTokenContract.methods.setForSaleAnimalToken(animalTokenId, web3.utils.toWei(sellPrice, "ether")).send({ from: account });
            console.log(response)
            if (response.status) {
                setMyAnimalPrice(web3.utils.toWei(sellPrice, "ether"));
            }
        } catch (error) {
            console.error('error')
        }
    };
    return (
        <div>
            <AnimalCard animalType={animalType} />
            <div>
                {myAnimalPrice === "0" ? <>
                    <div>
                        <input type="number" onChange={onChangeSellPrice} /><input type={'addon'} value={'Matic'} />
                    </div>
                    <button onClick={onClickSell}>
                        Sell
                    </button>
                </> : <p>{web3.utils.fromWei(myAnimalPrice)} Matic</p>}
            </div>
        </div>
    );
}

export default MyAnimalCard;