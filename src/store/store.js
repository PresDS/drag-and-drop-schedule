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
        updateEventEndTime(eventId, updateEventEndTime) {
            let eventToModify = this.events.find(event => event.id === eventId);
            console.log(`updateEventEndTime`, eventToModify);
            eventToModify.endTime = updateEventEndTime;
        },
    },
})