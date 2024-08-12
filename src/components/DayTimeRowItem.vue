<template>
    <td :id="day+hour.format('ha')">
       <DroppableArea v-for="time in quartersOfTheHour" 
            :key="day+time.format('h:mma')" 
            :id="day+time.format('h:mma')" 
            :day="day"
            :time="time"
        />
    </td>
</template>
<script>
import DroppableArea from './DroppableArea'

export default {
    name: 'DayTimeRowItem',
    props: ['day', 'hour'],
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

    },
    
}
</script>
<style> 
</style>