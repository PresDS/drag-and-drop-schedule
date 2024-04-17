<template>
    <div class="modal-backdrop">
        <div class="modal-body">
            
            <input type="text" v-model="title" />
    
            <button @click="closeModal">Cancel</button>
            <button @click="saveEvent">Save</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ModalEvent',
    props: ['eventTime'],
    emits: ['closeModal', 'saveEvent'],
    data() {
        return {
            title: '',

        }
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },
        saveEvent() {
            this.$emit('saveEvent', { title: this.title, dateTime: this.eventTime })
        }
    },
    
}
</script>
<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background: rgba(0,0,0,0.5);
        z-index: 9;

    }

    .modal-body {
        position: fixed;
        right: 100px;
        left: 100px;
        height: 300px;
        width: 200px;
        padding: 2rem;
        border-radius: 5px;
        background: #ffff;
        z-index: 10;
    }
    
</style>