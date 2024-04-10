<template>
    <div class="test-area">
        <div class="droppable-area" id="dropId" v-on:ondrop="drop" v-on:ondragover="allowDrop">
            I'm a droppable area
        </div>
        <div class="draggable-item" id="dragId" draggable="true" v-on:ondragstart="drag">
            <i class="fas fa-ellipsis-h"></i>
            I am a draggable item
        </div>

    </div>
</template>
<script>
export default {
    methods: {
        allowDrop(event) {
            event.preventDefault()
        },
        drag(event) {
            console.log('drag', event.target.id)
            event.dataTransfer.setData("text", event.target.id);
        },
        drop(event) {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            var draggableElement = document.getElementById(data);
            var container = document.getElementById("dropId");
            container.appendChild(draggableElement);
        }
    }
}
</script>
<style scoped>

.test-area {
    margin: 0 auto;
    width: 40rem;
    padding: 40px;
    background: darkblue;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

}

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
}
.draggable-item:hover {
    cursor: grab;
}

.droppable-area {
    /* height: 2rem; */
    /* width: 2.4rem; */
    padding: 1.2rem;
    /* background: lightcoral; */
    border: 5px dotted white;
    border-radius: 8px;
}
    
</style>