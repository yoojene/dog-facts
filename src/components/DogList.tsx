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
    fact: ""
  }]);

  async function fetchDogs() {

    Promise.all([
      fetch('https://random.dog/woof.json'),
      fetch('http://localhost:8010/proxy')  // Proxying to http://dog-api.kinduff.com//api/facts\?number\=1 
    ]).then(
      res => (Promise.all([res[0].json(), res[1].json()])).then(r => {
        console.log(r)
        const theDogs = Object.assign({}, ...r);
        theDogs.fact = theDogs.facts.toString();
        console.log(theDogs);
        setDogs([theDogs]);

      }).catch(err => setErrors(err))
    ).catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchDogs();
  }, [setDogs]);



  return (
    <React.Fragment>
    <IonList>
      {/* <IonListHeader>
        <IonLabel className="ion-text-center">Dog Factz</IonLabel>
    </IonListHeader> */}
  
    {dogs.map((dog) => (
      // console.log(dog.url.substr(dog.url.length - 3))
      <React.Fragment key={uuid()}>
        <IonLabel key={uuid()} className="ion-text-wrap">
          <div className="ion-padding ion-text-center">{dog.fact}</div>
        </IonLabel>
        <IonItem key={uuid()}>
          {(dog.url.substr(dog.url.length - 3) === 'mp4' || dog.url.substr(dog.url.length - 4) === 'webm') ? <video controls autoPlay key={dog.fileSizeByte}><source src={dog.url}></source></video> : <IonImg
            key={dog.fileSizeByte}
            src={dog.url}>
          </IonImg>}
          {/* <IonImg
            key={dog.fileSizeByte} 
            src={dog.url}> 
          </IonImg> */}
      </IonItem>
      </React.Fragment>
    ))}
   

    {/* {hasError} */}
      
    </IonList>
      <IonButton size="large" onClick={fetchDogs}> Get Me a Dog </IonButton>
    </React.Fragment>
  )
}
