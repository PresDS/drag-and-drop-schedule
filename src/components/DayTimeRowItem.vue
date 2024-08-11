<template>
    <td :id="day+hour.format('ha')">
       <DroppableArea v-for="time in quartersOfTheHour" 
        :key="day+time.format('h:mma')" 
        :id="day+time.format('h:mma')" 
        :day="day"
        :time="time"
        :events="events" 
        @addEvent="addEvent"
        @updateEvent="updateEvent"/>
    </td>
</template>
<script>
import DroppableArea from './DroppableArea'

export default {
    name: 'DayTimeRowItem',
    props: ['day', 'hour', 'events'],
    emits: ['addEvent', 'updateEvent'],
    components: {
        DroppableArea,
    },
    data() {
        return {
            quartersOfTheHour: [],
            minutesToAdd: [0, 15, 30, 45],
        }
    },
    created() {
        // Add quarters of the hour to the hour prop so a droppable area can be rendered
        this.minutesToAdd.forEach( minutes => {
            this.quartersOfTheHour.push(this.hour.add(minutes, "minutes"))
        })
    },
    methods: {
        addEvent(time) {
            this.$emit('addEvent', time)
        },
        updateEvent(event) {
            this.$emit('updateEvent', event)
        },
    },
    
}
</script>
<style> 
</style>