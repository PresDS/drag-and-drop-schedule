<template>
    <td :id="day+hour.format('ha')">
       <DroppableArea v-for="time in quartersOfTheHour" 
        :key="time.format('h:mma')" 
        :id="day+time.format('h:mma')" 
        :day="day"
        :time="time"
        :events="events" 
        @addEvent="addEvent"/>
    </td>
    <ModalEvent v-if="modalOpen === true" 
        :eventTime="eventTime"
        @closeModal="closeModal"
        @saveEvent="saveEvent"
    > </ModalEvent>

</template>
<script>
import DroppableArea from './DroppableArea'
import ModalEvent from './ModalEvent.vue';


export default {
    name: 'DayTimeRowItem',
    props: ['day', 'hour', 'events'],
    emits: ['addEvent', 'saveEvent'],
    data() {
        return {
            quartersOfTheHour: [],
            minutesToAdd: [0, 15, 30, 45],
            modalOpen: false,
            eventTime: null,

        }
    },
    created() {
        this.minutesToAdd.forEach( minutes => {
            this.quartersOfTheHour.push(this.hour.add(minutes, "minutes"))
        })
    },
    methods: {
        addEvent(time) {
            this.modalOpen = true;
            this.eventTime = time;
            // console.log('addEvent', time);

        },
        saveEvent(event) {
            console.log(event);
            this.modalOpen = false;
            this.$emit('saveEvent', event)
        },
        closeModal() {
            this.modalOpen = false;
        }
    },
    components: {
        DroppableArea,
        ModalEvent,
    },
}
</script>
<style> 
</style>