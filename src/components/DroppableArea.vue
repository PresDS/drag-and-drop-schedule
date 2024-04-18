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

        <DraggableItem v-if="eventScheduled"></DraggableItem>


        
    </div>
</template>
<script>
import DraggableItem from './DraggableItem.vue';
// import ModalEvent from './ModalEvent.vue';
export default {
    name: 'DroppableArea',
    props: ["id", "time", "day", "events"],
    emits: ['addEvent'],
    data() {
        return {
            showDateTime: false,
            // modalOpen: false,
        }
    },
    mounted() {
    },
    computed: {
        eventScheduled() {
            // this.events.forEach( event => {
            //     console.log('event',event.dateTime.format('h:mma'));
            //     console.log('time',this.time.format('h:mma'));
            //     console.log(event.dateTime.format('h:mma') == this.time.format('h:mma'));
            //     if(event.dateTime.format('h:mma') == this.time.format('h:mma')) {
            //         return true
            //     }
            // })

            // if(this.events[0].dateTime.format('h:mma') == this.time.format('h:mma')) {
            //         return true
            // }
            console.log('this.events[0].dateTime', this.events[0].dateTime.format('MM-DD-YYYY hh:mm:ss'));
            console.log('this.time', this.time.format('MM-DD-YYYY hh:mm:ss'));
            
            // checks if its the same dateTime down to the minute
            if(this.events[0].dateTime.isSame(this.time, 'minute')) {
                    return true
            }

            return false
        },
    },
    methods: {
        drop(event) {
            event.preventDefault();
            
            // Get the data from the draggable item - data will contain draggableItem's id
            var draggableItemId = event.dataTransfer.getData("text");
            var draggableElement = document.getElementById(draggableItemId);


            event.dataTransfer.setData("text", this.time.format('h:mma') );
            console.log('draggableElement', event.dataTransfer.getData("text"));

            // Select our current droppable area
            var container = document.getElementById(this.id);
            container.appendChild(draggableElement);

            // reset the showDateTime tool tip 
            this.showDateTime = false;

        },
        handleDragOver(e) {
            e.preventDefault();
            console.log('DRAGOVER',e.target);
            // this.$refs.dropZone.style.backgroundColor = "red";
            this.showDateTime = true;
        },
        handleDragLeave(e) {
            e.preventDefault();
            console.log('DRAGLeave',e);
            this.$refs.dropZone.style.backgroundColor = "var(--calendar-bg-color)";
            this.showDateTime = false;

        },
        addEvent() {
            this.modalOpen = true;
            this.$emit('addEvent', this.time)
        },
        // closeModal() {
        //     this.modalOpen = false;

        //     // setTimeout( () => {
        //     //     this.modalOpen = false;

        //     // }, 200)
        //     console.log('closeModal', this.modalOpen);
        // }


    },
    components: {
        DraggableItem,
        // ModalEvent,
    },
    
}
</script>
<style>


</style>