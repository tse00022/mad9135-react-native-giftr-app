// asyncStorage 
// context provider

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import * as Crypto from 'expo-crypto';

import { createContext } from "react";


const PeopleContext = createContext();

export const PeopleProvider = ({children}) => {

    const STORAGE_KEY = "people";
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const loadPeople = async () => {
            const savedPeople = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedPeople) {
                setPeople(JSON.parse(savedPeople));
            }
        }
        loadPeople();
    }, [])

    const addPerson = async (name, dob) => {
        const newPerson = {
            id: Crypto.randomUUID(),
            name, 
            dob,
            ideas: [],
        };
        const updatedPeople = [...people, newPerson];
        setPeople(updatedPeople);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
    }

    return(
        <PeopleContext.Provider value={{people, addPerson}} >
            {children}
        </PeopleContext.Provider>
    )
}

export default PeopleContext;