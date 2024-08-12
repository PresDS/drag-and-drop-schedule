import { defineStore } from "pinia";

export const useEventsStore = defineStore('events', {
    state: () => ({ 
        events: [],
    }),
    getters: {
    //   doubleCount: (state) => state.count * 2,
    },
    actions: {
        saveEvent(eventObj) {
            this.events.push(eventObj);
        },
    },
})