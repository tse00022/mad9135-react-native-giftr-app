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
        updatedPeople.sort((a, b) => new Date(a.dob) - new Date(b.dob));
        setPeople(updatedPeople);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
    }

    const deletePerson = async (id) => {
        const updatedPeople = people.filter((person) => person.id !== id);
        setPeople(updatedPeople);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
    }

    const getIdeas = (personId) => {
        const person = people.find((person) => person.id === personId);
        return person ? person.ideas : [];
    }

    const setIdeas = async (personId, ideas) => {
        const updatedPeople = people.map((person) => {
            if (person.id === personId) {
                person.ideas = ideas;
            }
            return person;
        })
        setPeople(updatedPeople);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
    }

    const saveIdea = async (personId, text, photoPath , width, height) => {
        const idea = {
            id: Crypto.randomUUID(),
            text,
            img: photoPath,
            width: width,
            height: height
        }
        const ideas = [...getIdeas(personId), idea];
        setIdeas(personId, ideas);
    }

    return(
        <PeopleContext.Provider value={{people, addPerson, deletePerson, getIdeas, saveIdea}} >
            {children}
        </PeopleContext.Provider>
    )
}

export default PeopleContext;