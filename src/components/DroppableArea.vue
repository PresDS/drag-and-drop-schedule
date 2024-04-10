<template>
    <div class="droppable-area" 
        :id="id" 
        @drop="drop($event)" 
        @dragover.prevent
        @dragenter.prevent
        >
    </div>
</template>
<script>
export default {
    name: 'DroppableArea',
    props: ["id"],
    data() {
        return {
            offsetTop: null,
            droppableItemHeightOffset: 60, // The height of the droppable item is 60px
        }
    },
    mounted() {
        this.offsetTop = document?.getElementById(this.id)?.offsetTop
    },
    methods: {
        drop(event) {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            var draggableElement = document.getElementById(data);
            var container = document.getElementById(this.id);
            container.appendChild(draggableElement);
        },
        // drop(event) {
        //     // event.preventDefault();


        //     // Get the elements id from dataTransfer
        //     var data = event.dataTransfer.getData("text");
        //     var draggableElement = document.getElementById(data);


        //     var dropPosition = event.clientY - event.target.offsetTop //- this.droppableItemHeightOffset;
        //     console.log('event.clientY', event.clientY)
        //     console.log('event.target.offsetTop', event.target.offsetTop)
        //     console.log('event.clientY - event.target.offsetTop' ,event.clientY - event.target.offsetTop)
        //     console.log('dropPosition BEFORE', dropPosition)
        //     console.log('---------------------------------' )


        //     // Calculate the maximum drop position within the droppable area
        //     // var maxDropPosition = event.target.offsetHeight - draggableElement.offsetHeight;
        //     // var maxDropPosition = 180;
        //     // console.log('maxDropPosition', maxDropPosition)

        //     if(dropPosition >= 180) {
        //         dropPosition = 180;
        //     } 
        //     else if(dropPosition >= 120) {
        //         dropPosition = 120;
        //     }
        //     else if(dropPosition >= 60) {
        //         dropPosition = 60;
        //     } else {
        //         dropPosition = 0;
        //     }
        //     console.log('dropPosition AFTER', dropPosition)

        //     // Append the draggable element to the droppable area at the calculated drop position
        //     var container = document.getElementById(this.id);
        //     container.appendChild(draggableElement);

        //     // Set the position of the draggable element within the droppable area
        //     draggableElement.style.position = "absolute";
        //     draggableElement.style.top = dropPosition + "px";
        //     draggableElement.style.left = 0;
        // },

    }
    
}
</script>
<style>
/* .droppable-area {
    
    padding: 1.2rem;
    height: 240px;
    border: 5px dotted white;
    border-radius: 8px;
    position: relative;
} */

.droppable-area {
    position: relative;

    background: rgb(50, 50, 47);
    height: 25%;
    width: 100%;
}

.droppable-area:hover {
    background-color: yellow;
}
</style>