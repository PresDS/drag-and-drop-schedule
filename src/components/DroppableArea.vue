<template>
    <div class="droppable-area" 
        ref="dropZone"
        :id="id" 
        @drop="drop($event)" 
        @dragover="handleDragOver($event)"
        @dragleave="handleDragLeave($event)"
        @dragenter.prevent
        @click="addEvent" >
        
        <div class="date-time-wrapper">
            <div v-if="showDateTime" class="date-time"> {{ time.format('h:mma') }}</div>
        </div>

        <DraggableItem v-if="eventInfo" :eventInfo="eventInfo" :key="eventInfo.id" @eventMoved="eventMoved"></DraggableItem>


        
    </div>
</template>
<script>
import DraggableItem from './DraggableItem.vue';
export default {
    name: 'DroppableArea',
    props: ["id", "time", "day", "events"],
    emits: ['addEvent'],
    data() {
        return {
            showDateTime: false,
            eventInfo: null,
            draggableElementId: null,
        }
    },
    mounted() {
        // Initially checks for any scheduled events
        this.getEvent()
    },
    watch: {
        events: {
            handler(newValue, oldValue) {
                console.log("EVENTS WATCH HAS BEEN FIRED", newValue, oldValue)

                this.getEvent()
                
            },
            deep: true,
        }
    },
    computed: {
        
    },
    methods: {
        drop(e) {
            e.preventDefault();
            
            // Get the data from the draggable item - data will contain draggableItem's id
            var draggableItemId = e.dataTransfer.getData("text");
            var draggableElement = document.getElementById(draggableItemId);

            e.dataTransfer.setData("text", this.time.format('h:mma') );
            // console.log('draggableElement', e.dataTransfer.getData("text"));

            /***
             * 
                TODO: WHEN THE DRAGGABLE ITEM IS DROPPED, UPDATE THE EVENTS ARRAY SO THAT THE WATCH IS TRIGGERED
                - This may fix the issue where when the draggable item is moved to another droppable area, it is still a child of the previous drop area
                - When we add a new event we should assign that event with a specific id, instead of assigning the id in the draggableItem component
             * 
             */

            let event = this.events.find(event => event.id === draggableItemId)
            if(event) {
                event.dateTime = this.time
            }
            

            // Select our current droppable area
            var container = document.getElementById(this.id);
            container.appendChild(draggableElement);

            // reset the showDateTime tool tip 
            this.showDateTime = false;

        },
        handleDragOver(e) {
            e.preventDefault();
            this.draggableElementId = e.dataTransfer.getData("text");
            this.showDateTime = true;
        },
        handleDragLeave(e) {
            e.preventDefault();
            this.$refs.dropZone.style.backgroundColor = "var(--calendar-bg-color)";
            this.showDateTime = false;
        },
        addEvent() {
            this.modalOpen = true;
            this.$emit('addEvent', this.time)
        },
        getEvent() {
            for (let i = 0; i < this.events.length; i++) {
                if (this.events[i].dateTime.isSame(this.time, 'minute')) {
                    console.log('EVENT FOUND FOR THIS SPACE!!!')
                    this.eventInfo = this.events[i]
                    return;
                }
            }
            console.log('NO EVENT FOR THIS SPACE')
            this.eventInfo = null
        },
        eventMoved(e) {
            console.log('event has been moved', e);

        },



    },
    components: {
        DraggableItem,
    },
    
}
</script>
<style>


</style>