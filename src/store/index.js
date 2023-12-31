import { createStore } from "vuex";

export default createStore({
    state: {
        characters: [],
        charactersFilter: [],
    },
    getters: {},
    mutations: {
        setCharacters(state, payLoad) {
            state.characters = payLoad;
        },
        setCharactersFilter(state, payLoad) {
            state.charactersFilter = payLoad;
        },
    },
    actions: {
        async getCharacters({ commit }) {
            try {
                // Lo que debería pasar (lógica del programa)
                const response = await fetch("https://rickandmortyapi.com/api/character");
                const data = await response.json();
                commit("setCharacters", data.results);
                commit("setCharactersFilter", data.results);
            } catch (error) {
                console.error(error);
            }
        },
        filterByStatus({ commit, state }, status) {
            const filter = state.characters.filter((character) => {
                return character.status.includes(status);
            });
            commit("setCharactersFilter", filter);
        },
        filterByName({ commit, state }, name) {
            const formatName = name.toLowerCase();
            const filter = state.characters.filter((character) => {
                const characterName = character.name.toLowerCase();

                if (characterName.includes(formatName)) {
                    return character;
                }
            });
            commit("setCharactersFilter", filter);
        },
    },
    modules: {},
});
