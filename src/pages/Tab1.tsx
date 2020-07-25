import React, { useCallback } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import DogList from '../components/DogList';
import './Tab1.css';
// import { useDogs } from '../hooks/useDogData';


// const fetchDogs = useDogs()



const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dog Factz</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle 
              size="large" 
              className="ion-text-center">
                Dog Factz
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
        <DogList></DogList>
        {/* <IonButton onClick={fetchDogs}></IonButton> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
