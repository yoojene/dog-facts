import React, { useEffect, useState } from 'react'
import { IonList, IonListHeader, IonLabel, IonItem, IonImg, IonButton } from '@ionic/react';
// import { useGetDogPhotos } from '../hooks/useDogData';
import { uuid } from 'uuidv4';
import { getDogImage } from '../services/DogList'
import { DogPic } from '../model/DogPic';
// import { DogPic } from '../model/DogPic';
export default function DogList() {

  const [hasError, setErrors] = useState(false);
  const [dogs, setDogs] = useState([{
    fileSizeByte: 0,
    url: "",
    // facts: ""
  }]);

  // async function fetchDogs() {
  //   try {
  //     // const res = await Promise.all([
  //     //   fetch('https://random.dog/woof.json'),
  //     //   // fetch('http://localhost:8010/proxy')  // Proxying to http://dog-api.kinduff.com//api/facts\?number\=1 
  //     // ])

  //     const res = await (await fetch('https://random.dog/woof.json')).json();
  //     // const resJson = await Promise.all([res[0].json(), res[1].json()])
  //     // const resJson = await Promise.resolve(res);

  //     console.log(res);
    
  //     const theDogs: DogPic = Object.assign({}, ...res);
  //     console.log(theDogs);
  //     // theDogs.facts = theDogs.facts.toString();
  //     setDogs([{...theDogs}]);
  //   } catch (err) {
  //     setErrors(err)
  //   }

 const fetchDogs = async(): Promise<DogPic> => {
  return await getDogImage();
 }

  useEffect(() => {
    // fetchDogs();
    let mounted = true;

    fetchDogs().then((dogs: DogPic) => {
      console.log(dogs)
      if (mounted) {
        setDogs([{ ...dogs }]);
      }
    });
    
    return () => {mounted = false};
  }, []);


  const addDefaultSrc = (ev: any) => {
    ev.target.src = 'https://random.dog/42a98d03-5ed7-4b3b-af89-7c4876cb14c3.jpg'
  }

  // TODO need to update state (useState?) and fetchDogs again when get me a dog is pressed
  return (
    <>
    <IonList>
    {dogs.map((dog) => (
      <React.Fragment key={uuid()}>
        {<IonLabel key={uuid()} className="ion-text-wrap">
          {/* <div className="ion-padding ion-text-center">{dog.facts}</div> */}
        </IonLabel>}  
        <IonItem key={uuid()}>
          {(dog.url.substr(dog.url.length - 3) === 'mp4' || 
          dog.url.substr(dog.url.length - 4) === 'webm') ?
           <video controls autoPlay key={dog.fileSizeByte}>
             <source src={dog.url}></source>
             </video> : 
             <img
              alt=""
              key={dog.fileSizeByte}
              src={dog.url}
              onError={addDefaultSrc}>
          </img>
          }
      </IonItem>
      </React.Fragment>
    ))}
   

    {/* {hasError} */}
      
    </IonList>
      <IonButton 
      className="flex-display 
      ion-align-content-center
      ion-align-items-center
      ion-padding" 
      size="large" 
      onClick={fetchDogs}
      >
         Get Me a Dog! </IonButton>
    </>
  )
}
