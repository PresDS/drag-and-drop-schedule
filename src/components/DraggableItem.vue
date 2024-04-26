<template>
    <div class="draggable-item" :id="eventInfo.id" draggable="true" @dragstart="drag($event)">
        <p>{{ eventInfo.title }}</p>
            <!-- <i class="fas fa-ellipsis-h"></i> -->
    </div>
</template>
<script>


export default {
    name: 'DraggableItem',
    props: ['eventInfo'],
    data() {
        return {
            uid: null,
        }
    },
    methods: {
        drag(event) {
            // console.log('drag', event.target)
            event.dataTransfer.setData("text", event.target.id);
            this.$emit('eventMoved', event.target.id)
        },
    },
}
</script>
<style>

</style>