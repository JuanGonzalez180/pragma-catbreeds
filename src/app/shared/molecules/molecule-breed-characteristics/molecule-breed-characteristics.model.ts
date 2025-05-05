export interface IBreedCharacteristic {
  label: string;
  value?: string;
  valueNumber?: number;
  type: 'text' | 'stars' | 'bulbs';
  maxValue?: number;
}

export interface IMoleculeBreedCharacteristics {
    title: string;
    characteristics: IBreedCharacteristic[];
}