import { useState } from 'react';
import firebase from "../firebase";

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getGuestsList = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const querySnapshot = await firebase.firestore().collection('guestsList').get()
      const guestsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setIsLoading(false);
      return guestsList
    } catch (error) {
      console.log(error.message)
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { isLoading, error, getGuestsList };
};

export default useApi;
