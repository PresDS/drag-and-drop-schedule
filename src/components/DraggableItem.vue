<template>
    <div class="draggable-item" :id="eventInfo.id" draggable="true" @dragstart="drag($event)" ref="dragItem">
        <div class="inner-wrapper">
            <div class="event-info">
                <span>{{ eventInfo.title }}</span>
                <span>{{ eventInfo.startTime.format("h:mma") }}</span>
                <span> - </span>
                <span>{{ eventInfo.endTime.format("h:mma") }}</span>
            </div>
            <div class="expandable-area"
                @mousedown="handleMouseDown($event)" 
            >
            </div>
        </div>
    </div>
</template>
<script>
import { useEventsStore } from '../store/store';

export default {
    name: 'DraggableItem',
    props: ['eventInfo', 'setIsResizing', 'isResizing'],
    data() {
        return {
            uid: null,
            // isResizing: false,
            initialHeight: null,
            initialMouseY: null,
        }
    },
    created() {
        this.store = useEventsStore();
    },
    mounted() {
        this.initialHeight = this.$refs.dragItem.clientHeight;
    },
    computed: {
        events() {
            return this.store?.events;
        },
    },
    methods: {
        drag(event) {
            // console.log('drag', event.target)
            event.dataTransfer.setData("text", event.target.id); 

        },
        handleMouseDown(e) {
            e.preventDefault();
            console.log('mousedown', e)
            this.setIsResizing(true);

            this.initialHeight = this.$refs.dragItem.clientHeight;
            this.initialMouseY = e.clientY;

            document.addEventListener('mouseup', this.stopResize)
            document.addEventListener('mousemove', this.resize)


        },
        resize(e) {
            if (!this.isResizing) return;
            e.preventDefault();

            const newHeight = this.initialHeight + (e.clientY - this.initialMouseY);
            this.$refs.dragItem.style.height = `${newHeight}px`;
            
            console.log('mousemove', e)
            
        },
        stopResize(e) {
            e.preventDefault();
            // e.stopPropagation();
            e.stopImmediatePropagation();
            console.log('mouseup', e)
            this.setIsResizing(false);
            
            document.removeEventListener('mousemove', this.resize);
            document.removeEventListener('mouseup', this.stopResize);

            this.$refs.dragItem.style.height = this.roundToClosest20(this.$refs.dragItem.clientHeight) + 'px';
            console.log('dragItem inner Height', this.$refs.dragItem.clientHeight)
            this.calculateEndTime();


        },
        roundToClosest20(num) {
            return Math.round(num / 20) * 20;
        },
        roundToClosest15(num) {
            return Math.round(num / 15) * 15;
        },
        calculateEndTime() {
            /**
             * This function will use the draggableClientHeight to calculate the end time of the event
             */

            // Default size of DraggableItem is 20px which represents a 15 minute interval
            const heightDivisor = 20;
            const timeInterval = 15;

            let newHeight = this.$refs.dragItem.clientHeight;

            let eventDurationMultiplier = (newHeight / heightDivisor);

            console.log('eventDurationMultiplier ', eventDurationMultiplier);

            let eventTimeInMinutes = this.roundToClosest15(eventDurationMultiplier * timeInterval);

            console.log('eventTimeInMinutes', eventTimeInMinutes);

            let updateEventEndTime = this.eventInfo.startTime.add(eventTimeInMinutes, 'minutes');
            console.log('updateEventEndTime', updateEventEndTime);

            this.store.updateEventEndTime(this.eventInfo.id, updateEventEndTime)

            
        },
    },
}
</script>
<style>
    .draggable-item .event-info {
        display: flex;
        justify-content: space-around;
    }

    .draggable-item .inner-wrapper {
        position: relative;
        height: 100%;
    }

    .draggable-item .expandable-area {
        position: absolute;
        bottom: 0;
        background: blue;
        height: 8px;
        width: 100%;
    }

    .draggable-item .expandable-area:hover {
        cursor: row-resize;
        /* cursor: s-resize; */
    }

</style>