<template>
    <td :id="day+hour.format('ha')">
       <DroppableArea v-for="q in quartersOfTheHour" :key="q.format('h:mma')" :id="day+q.format('h:mma')"/>
    </td>
</template>
<script>
import DroppableArea from './DroppableArea'

export default {
    name: 'DayTimeRowItem',
    props: ['day', 'hour'],
    data() {
        return {
            quartersOfTheHour: [],
            minutesToAdd: [0, 15, 30, 45],
        }
    },
    created() {
        this.minutesToAdd.forEach( minutes => {
            this.quartersOfTheHour.push(this.hour.add(minutes, "minutes"))
        })
    },
    components: {
        DroppableArea,
    },
}
</script>
<style> 
</style>