/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export default function MyAppContext(props) {
    // utilizamos el Hook de useState para darle un estado y asignarla a una variable
    const [pokemon20, setPokemon20] = useState([])
    // tambien uno para indicar desde que pokemon necesitamos la informacion
    const [offset, setOffset] = useState(0)
    // tambien un estado para darle tiempo que haga la peticion
    const [loading, setLoading] = useState(true)

    // creamos la peticion para capturar 20 pokemon podemos utilizar FETCH o AXIOS
    const get20Pokemons = async (limit = 200)=>{
        const url ='https://pokeapi.co/api/v2/'
        const res = await fetch(`${url}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json()
    //    console.log(data) 
    const promise = data.results.map(async(pokemon)=>{
        const res = await fetch(pokemon.url)
        const data = await res.json()
        return data
        // console.log(data)
    });
    const results = await Promise.all(promise)  
    //aseginando los valores a mis estados
    setPokemon20([...pokemon20,...results])
    setLoading(false)
    }

    useEffect(() => {
     get20Pokemons()
    }, [offset])


    /**METODO PARA FILTRADO DE POKEMONS */
    //defenimos una variable para el color

    const typeColors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
      };
      //variables de estado para que capture la informacion
      const [pokemonList, setPokemonList] = useState([]);
      const [pokemonTypes, setPokemonTypes] = useState([]);
      const [selectedType, setSelectedType] = useState([]);
    
      useEffect(() => {
        const apiUrl = 'https://pokeapi.co/api/v2/type';
        axios.get(apiUrl)
          .then(response => {
            const types = response.data.results.map(type => {
              const typeName = type.name;
              const typeColor = typeColors[typeName] || '#fff';
              return { name: typeName, url: type.url, color: typeColor };
            });
            setPokemonTypes([{ name: '', url: '', color: '#fff' }, ...types]);
          })
          .catch(error => console.log(error));
      }, []);

      //una variable para que selecciones el tipo y lo asigne por categoria
      const handleTypeClick = (type) => {
        setSelectedType(type);
        
      };

      const filteredPokemon = selectedType ? pokemon20.filter(pokemon => pokemon.types[0].type.name === selectedType) : pokemon20;



  return (
    <PokemonContext.Provider 
    value={{
        pokemon20,
        setPokemon20,
        loading,
        setOffset ,
        
        //Variables para filtrado
        pokemonList,
        setPokemonList,
        pokemonTypes,
        selectedType,
        handleTypeClick,
        filteredPokemon  
    }}>
        {props.children}
    </PokemonContext.Provider>
  )
}
 export const PokemonContext = createContext()