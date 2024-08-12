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
            />
        </tr>
    </table>
</template>
<script>
import DayTimeRowItem from './DayTimeRowItem'
import dayjs from 'dayjs'
export default {
    name: 'WeeklySchedule',
    components: {
        DayTimeRowItem,
    },
    data() {
        return {
            days: [],
            hoursArray: [],
            dayjs: dayjs(),
            startingTime: dayjs().startOf('week').hour(5).second(0), // 6am
            endingTime: dayjs().startOf('week').hour(22).second(0), // 10pm

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

    },

}
</script>
<style>




</style>