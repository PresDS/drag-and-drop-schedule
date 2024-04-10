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
            <DayTimeRowItem v-for="day in days" :hour="hour" :day="day" :key="day+hour.format('h:mma')"/>
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
            startingTime: dayjs().startOf('week').hour(5), // 6am
            endingTime: dayjs().startOf('week').hour(22), // 10pm

        }
    },
    created() {

        this.generateTimesArray()

        console.log(this.dayjs);

        for(let i=0; i<7; i++) {
            let day = dayjs().day(i)

            this.days.push(day.format('ddd'))
            // this.days.forEach( day => {
            //     console.log(day.format('dddd'));
            // })
        }

    },
    methods: {
        generateTimesArray() {
            var timeToIncrement = this.startingTime
            console.log('timeToIncrement ',timeToIncrement);
    
            while(timeToIncrement.unix() < this.endingTime.unix()) {
                timeToIncrement = timeToIncrement.add(1, "hour")
                console.log('timeToIncrement ', timeToIncrement);
                this.hoursArray.push(timeToIncrement)
            }
           
        },


    },

}
</script>
<style>


table, td, th {
    border-collapse: collapse;
}

th {
    /* background: darkmagenta; */
    padding: 12px;
}

td {
    /* height: 240px; */
    height: 80px;
    border: 1px solid white;
    min-width: 120px;
}

.y-axis-label {
    text-align: right;
    padding-right: 16px;
}

</style>