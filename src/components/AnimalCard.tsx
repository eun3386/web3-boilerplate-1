import React, { FC } from 'react';

interface AnimalCardProps {
    animalType: string;
}
const AnimalCard: FC<AnimalCardProps> = ({ animalType }) => {
    return (<img width='150' height='150' src={`images/${animalType}.png`} alt="AnimalCard" />);
}

export default AnimalCard;