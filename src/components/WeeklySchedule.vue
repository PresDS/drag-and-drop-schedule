<template>
    <table id="weekly-schedule">
        <tr class="calendar-x-axis">
            <th></th>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
        </tr>
        <tr v-for="hour in hoursArray" :key="hour" class="calendar-y-axis">
            <td class="hour y-axis-label">{{ hour.format('h:mma') }}</td>
            <DayTimeRowItem v-for="day in days" 
                :hour="getDateTime(day, hour)" 
                :day="day.format('ddd')" 
                :key="day.format('ddd') + hour.format('h:mma')"
                :events="events"
                @saveEvent="saveEvent"
            />
            <!-- <DroppableArea v-for="day in days" :id="time+day" :key="time+day" />  -->
        </tr>

    </table>
</template>
<script>
// import DroppableArea from './DroppableArea'
import DayTimeRowItem from './DayTimeRowItem'
import dayjs from 'dayjs'
export default {
    name: 'WeeklySchedule',
    components: {
        // DroppableArea,
        DayTimeRowItem,
    },
    data() {
        return {
            // days: ['Monday', 'Tuesday' ,'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            days: [],
            // hoursArray: ['08:00am', '09:00am', '10:00am', '11:00am', '12:00pm', '01:00pm', '02:00pm', '03:00pm', '04:00pm', '05:00pm'],
            hoursArray: [],
            dayjs: dayjs(),
            startingTime: dayjs().startOf('week').hour(5).second(0), // 6am
            endingTime: dayjs().startOf('week').hour(22).second(0), // 10pm

            events: [ ],

        }
    },
    created() {

        for(let i=0; i<7; i++) {
            let day = dayjs().day(i)

            this.days.push(day)
        }

        this.generateTimesArray()

        this.days.forEach( day => {
            this.hoursArray.forEach( hour => {
                this.getDateTime(day, hour);

            })
        })

        // this.events.push({title: 'Gym', dateTime: this.hoursArray[0] })

    },
    methods: {
        generateTimesArray() {
            var timeToIncrement = this.startingTime
            // console.log('timeToIncrement ',timeToIncrement);
    
            while(timeToIncrement.unix() < this.endingTime.unix()) {
                timeToIncrement = timeToIncrement.add(1, "hour")
                this.hoursArray.push(timeToIncrement)
            }

        },
        getDateTime(day, hour) {
        
            let hourStr = hour.hour()
            let minuteStr = hour.minute()
            
            // // Parse the new time and set it to the existing date
            const modifiedDateTime = day.hour(hourStr)
                                     .minute(minuteStr)
                                     .second(0)

            return modifiedDateTime
        },
        saveEvent(event) {
            this.events.push(event)
            console.log('new Event Saved', this.events);
        },
        


    },

}
</script>
<style>




</style>