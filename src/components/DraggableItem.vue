<template>
    <div class="draggable-item" id="dragId" draggable="true" @dragstart="drag($event)">
            <i class="fas fa-ellipsis-h"></i>
            ClientY {{ clientY }}
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
            console.log('drag', event.target)
            event.dataTransfer.setData("text", event.target.id);
        },
    },
    
}
</script>
<style>
.draggable-item {
    /* height: 2rem; */
    /* width: 2.4rem; */
    padding: 1.2rem;
    background: lightcoral;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    max-height: 60px;
    position: absolute;
    z-index: 1;
}

.draggable-item:hover {
    cursor: pointer;
}
</style>