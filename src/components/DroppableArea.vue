<template>
    <div class="droppable-area" 
        ref="dropZone"
        :id="id" 
        @drop="drop($event)" 
        @dragover="handleDragOver($event)"
        @dragleave="handleDragLeave($event)"
        @dragenter.prevent
        @click="checkAndAddEvent" >
        
        <div class="date-time-wrapper">
            <div v-if="showDateTime" class="date-time"> {{ time.format('h:mma') }}</div>
        </div>

        <DraggableItem v-if="eventInfo" 
            :eventInfo="eventInfo" 
            :key="eventInfo.id" 
            :setIsResizing="handleSetIsResizing" 
            :isResizing="isResizing">
        </DraggableItem>

        <ModalEvent v-if="modalOpen === true" 
            :eventTime="eventTime" 
            @closeModal="closeModal" 
            @saveEvent="saveEvent">
        </ModalEvent>
    </div>
</template>
<script>
import DraggableItem from './DraggableItem.vue';
import ModalEvent from './ModalEvent.vue';
import { useEventsStore } from '../store/store';


export default {
    name: 'DroppableArea',
    props: ["id", "time", "day"],
    components: {
        DraggableItem,
        ModalEvent,
    },
    data() {
        return {
            showDateTime: false,
            eventInfo: null,
            eventTime: null,
            draggableElementId: null,
            isResizing: null,
            modalOpen: false,
            store: null,

        }
    },
    created() {
        this.store = useEventsStore();
    },
    mounted() {
        // Initially checks for any scheduled events
        // this.getEvent()
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
        events() {
            return this.store?.events;
        },
    },
    methods: {
        drop(e) {
            e.preventDefault();
            // Get the data from the draggable item - data will contain draggableItem's id
            var draggableItemId = e.dataTransfer.getData("text");
            var draggableElement = document.getElementById(draggableItemId);

            e.dataTransfer.setData("text", this.time.format('h:mma') );
            // console.log('draggableItemId', draggableItemId);
            // console.log('draggableElement', draggableElement);

            let event = this.events.find(event => event.id === draggableItemId)
            
            // TODO update the event time
            this.$emit('updateEvent', {...event, startTime: this.time})

            // // Select our current droppable area
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
        checkAndAddEvent(e) {
            if (this.isResizing !== false) {
                this.addEvent(e);
            }
        },
        addEvent(event) {
            console.log('add Event', event)
            this.eventTime = this.time;
            this.modalOpen = true;
        },
        saveEvent(event) {
            console.log(event);
            this.modalOpen = false;
            this.eventTime = null;

        },
        closeModal() {
            this.modalOpen = false;
        },
        getEvent() {
            for (let i = 0; i < this.events.length; i++) {
                if (this.events[i].startTime.isSame(this.time, 'minute')) {
                    console.log('EVENT FOUND FOR THIS SPACE!!!')
                    this.eventInfo = this.events[i]
                    return;
                }
            }
            this.eventInfo = null
        },
        handleSetIsResizing(isResizing) {
            this.isResizing = isResizing;
        }

    },
    
    
}
</script>
<style>


</style>