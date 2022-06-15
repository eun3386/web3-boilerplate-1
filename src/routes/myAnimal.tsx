import React, { FC, useEffect, useState } from 'react';
import MyAnimalCard, { IMyAnimalCard } from '../components/MyAnimalCard';
import { mintAnimalTokenContract, saleAnimalTokenAddress, saleAnimalTokenContract } from '../contracts';

interface MyAnimalProps {
    account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
    const [animalCardArray, setAnimalCardArray] = useState<IMyAnimalCard[]>();
    const [saleStatus, setSaleStatus] = useState<boolean>(false);

    const getAnimalTokens = async () => {
        try {
            const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();

            if (balanceLength === 0) return;

            const tempAnimalCardArray: IMyAnimalCard[] = [];

            const response = await mintAnimalTokenContract.methods.getAnimalTokens(account).call();
            console.log(response);
            response.map((v: IMyAnimalCard) => {
                tempAnimalCardArray.push({ animalTokenId: v.animalTokenId, animalType: v.animalType, animalPrice: v.animalPrice })
            });

            setAnimalCardArray(tempAnimalCardArray);

        } catch (error) {
            console.error(error);
        }
    }

    const getIsApprovedForAll = async () => {
        try {
            const response = await mintAnimalTokenContract.methods.isApprovedForAll(account, saleAnimalTokenAddress).call();

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const onClickApproveToggle = async () => {
        try {
            if (!account) return;
            const response = await mintAnimalTokenContract.methods.setApprovalForAll(saleAnimalTokenAddress, !saleStatus).send({ from: account });

            if (response.status) {
                setSaleStatus(!saleStatus);
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        if (!account) return;

        getIsApprovedForAll();
        getAnimalTokens();
    }, [account]);


    return (
        <div>
            <div>
                <p>Sale Status:{saleStatus ? 'True' : 'False'}</p>
                <button onClick={onClickApproveToggle}>{saleStatus ? 'Cancel' : 'Approve'}</button>
            </div>
            <div>
                {animalCardArray && animalCardArray.map((v, i) => {
                    return <MyAnimalCard key={i} animalTokenId={v.animalTokenId} animalPrice={v.animalPrice} animalType={v.animalType} saleStatus={saleStatus} account={account} />;
                })}
            </div>
        </div>
    );
}

export default MyAnimal;