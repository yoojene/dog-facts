import { useEffect, useState } from 'react'

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

export async function fetchDogs() {

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

  return {
    dogs
  }
}

useEffect(() => {
  fetchDogs();
}, [setDogs]);



