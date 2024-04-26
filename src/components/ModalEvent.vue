<template>
    <div class="modal-backdrop">
        <div class="modal-body">
            
            <input type="text" v-model="title" placeholder="Event Title"/>
    
            <input type="time" v-model="timeString">
            <input type="date" v-model="dateString">
            <div class="button-group">
                <button @click="closeModal">Cancel</button>
                <button @click="saveEvent">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
// ShortUniqueId - https://www.npmjs.com/package/short-unique-id?activeTab=readme
import ShortUniqueId from 'short-unique-id';

export default {
    name: 'ModalEvent',
    props: ['eventTime'],
    emits: ['closeModal', 'saveEvent'],
    data() {
        return {
            title: 'hello',
            dateString: '',
            timeString: '',
            uid: null,
        }
    },
    created() {
        this.dateString = this.eventTime.format("YYYY-MM-DD");
        this.timeString = this.eventTime.format("hh:mm:ss");
        const uid = new ShortUniqueId({ length: 10 });
        this.uid = uid.rnd();
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },
        saveEvent() {
            this.$emit('saveEvent', { id: this.uid, title: this.title, dateTime: this.eventTime })
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