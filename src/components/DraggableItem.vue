<template>
    <div class="draggable-item" :id="eventInfo.id" draggable="true" @dragstart="drag($event)" ref="dragItem">
        <div class="inner-wrapper">
            <div class="event-info">
                <span>{{ eventInfo.title }}</span>
                <span>{{ eventInfo.startTime.format("h:mm") }}</span>
            </div>
            <div class="expandable-area"
                @mousedown="handleMouseDown($event)" 
            >
            </div>
        </div>
    </div>
</template>
<script>

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
    mounted() {
        this.initialHeight = this.$refs.dragItem.clientHeight;
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
            
            console.log('mouseup', e)
            
        },
        stopResize(e) {
            e.preventDefault();
            // e.stopPropagation();
            e.stopImmediatePropagation();
            this.setIsResizing(false);
            console.log('mousemove', e)
            console.log('dragItem inner Height', this.$refs.dragItem.clientHeight)
            document.removeEventListener('mousemove', this.resize);
            document.removeEventListener('mouseup', this.stopResize);

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