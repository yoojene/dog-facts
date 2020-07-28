import React, { useEffect, useState } from 'react'
import { IonList, IonListHeader, IonLabel, IonItem, IonImg, IonButton } from '@ionic/react';
// import { useGetDogPhotos } from '../hooks/useDogData';
import { uuid } from 'uuidv4';

export default function DogList() {

  interface DogPic {
    fileSizeByte: number,
    url: string
    facts: string
  }

  const [hasError, setErrors] = useState(false);
  const [dogs, setDogs] = useState([{
    fileSizeByte: 0,
    url: "",
    facts: ""
  }]);

  async function fetchDogs() {

    try {
      const res = await Promise.all([
        fetch('https://random.dog/woof.json'),
        fetch('http://localhost:8010/proxy')  // Proxying to http://dog-api.kinduff.com//api/facts\?number\=1 
      ])
      const resJson = await Promise.all([res[0].json(), res[1].json()])

      const theDogs: DogPic = Object.assign({}, ...resJson);
      theDogs.facts = theDogs.facts.toString();
      setDogs([theDogs]);
    } catch (err) {
      setErrors(err)
    }
   

  }

  useEffect(() => {
    fetchDogs();
  }, [setDogs]);



  return (
    <>
    <IonList>
    {dogs.map((dog) => (
      <React.Fragment key={uuid()}>
        <IonLabel key={uuid()} className="ion-text-wrap">
          <div className="ion-padding ion-text-center">{dog.facts}</div>
        </IonLabel>
        <IonItem key={uuid()}>
          {(dog.url.substr(dog.url.length - 3) === 'mp4' || 
          dog.url.substr(dog.url.length - 4) === 'webm') ?
           <video controls autoPlay key={dog.fileSizeByte}>
             <source src={dog.url}></source>
             </video> : 
             <IonImg
            key={dog.fileSizeByte}
            src={dog.url}>
          </IonImg>}
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
      onClick={fetchDogs}>
         Get Me a Dog! </IonButton>
    </>
  )
}
