<template>
    <div class="sandbox">
        <!-- <h2>Sandbox</h2> -->

        <!-- <SimpleDragAndDropTest /> -->
        <DraggableItem />
        <WeeklySchedule />

        <!-- <DroppableArea :id="1" :key="id"/>
        <DroppableArea :id="2" :key="id"/>
        <DroppableArea :id="3" :key="id"/>
        <DroppableArea :id="4" :key="id"/> -->
        
    </div>
</template>
<script>
// import SimpleDragAndDropTest from './SimpleDragAndDropTest.vue';
import DraggableItem from '../src/components/DraggableItem.vue';
// import DroppableArea from './DroppableArea.vue';
import WeeklySchedule from '../src/components/WeeklySchedule.vue'; 
export default {
    name: "Sandbox",
    components: {
        // SimpleDragAndDropTest,
        DraggableItem,
        // DroppableArea
        WeeklySchedule
    }

    
}
</script>
<style>
    .sandbox {
        /* background: teal; */
    }
    
</style>