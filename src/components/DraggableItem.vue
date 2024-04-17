<template>
    <div class="draggable-item" id="dragId" draggable="true" @dragstart="drag($event)">
            <i class="fas fa-ellipsis-h"></i>
    </div>
</template>
<script>
export default {
    name: 'DraggableItem',
    props: [],
    data() {
        return {
            clientY: null
        }
    },
    methods: {
        drag(event) {
            this.clientY = event.clientY
            // console.log('drag', event.target)
            event.dataTransfer.setData("text", event.target.id);
        },
    },
    
}
</script>
<style>

</style>