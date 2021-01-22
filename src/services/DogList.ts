import { DogPic } from '../model/DogPic';

export const getDogImage = async (): Promise<DogPic> => {
  const res = await(await fetch('https://random.dog/woof.json')).json();
  return res;
} 