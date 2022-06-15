import React, { FC, useState } from "react";
import AnimalCard from "../components/AnimalCard";
import { mintAnimalTokenContract } from "../contracts";

interface MainProps {
  account: string;
}
const Main: FC<MainProps> = ({ account }) => {
  const [newAnimalType, setNewAnimalType] = useState<string>();

  const onclickMint = async () => {
    try {
      if (!account) return;
      const response = await mintAnimalTokenContract.methods
        .mintAnimalToken()
        .send({ from: account });

      //   console.log(response);
      if (response.status) {
        const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();

        const animalTokenId = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLength.length, 10) - 1).call();

        const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();

        setNewAnimalType(animalType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {newAnimalType ? (<AnimalCard animalType={newAnimalType} />) : (<p>Let's mint Animal Card!!</p>)}
      <button onClick={onclickMint}>Mint</button>
    </div>
  );
};

export default Main;
