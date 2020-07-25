import React, { useEffect, useState } from 'react'
import { IonList, IonListHeader, IonLabel, IonItem, IonImg } from '@ionic/react';
// import { useGetDogPhotos } from '../hooks/useDogData';

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
      fetch('http://localhost:8010/proxy')
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
    <IonList>
      {/* <IonListHeader>
        <IonLabel className="ion-text-center">Dog Factz</IonLabel>
    </IonListHeader> */}
  
    {dogs.map((dog) => (
      <React.Fragment>
        <IonLabel className="ion-text-wrap">
          <div className="ion-padding ion-text-center">{dog.fact}</div>
        </IonLabel>
        <IonItem>
   
        <IonImg 
          key={dog.fileSizeByte} 
          src={dog.url}> 
          </IonImg>
      </IonItem>
      </React.Fragment>
    ))}
   

    {/* {hasError} */}
      
    </IonList>
  )
}
