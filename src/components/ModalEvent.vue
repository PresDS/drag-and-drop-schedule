<template>
    <Teleport to="body">
        <div class="modal-backdrop">
            <div class="modal-body">
                <div class="event-form">
                    <input type="text" v-model="title" placeholder="Event Title"/>
                    <input type="time" v-model="startTime">
                    <input type="time" v-model="endTime">
                    <input type="date" v-model="dateString">
                    <div class="button-group">
                        <button @click="closeModal">Cancel</button>
                        <button @click="saveEvent">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>
<script>
// ShortUniqueId - https://www.npmjs.com/package/short-unique-id?activeTab=readme
import ShortUniqueId from 'short-unique-id';
import dayjs from 'dayjs'
export default {
    name: 'ModalEvent',
    props: ['eventTime'],
    emits: ['closeModal', 'saveEvent'],
    data() {
        return {
            title: '',
            dateString: '',
            startTime: '',
            endTime: '',
            uid: null,
        }
    },
    created() {
        this.dateString = this.eventTime.format("YYYY-MM-DD");
        this.startTime = this.eventTime.format("hh:mm:ss");
        this.endTime = this.eventTime.add(15, 'minute').format("hh:mm:ss");
        const uid = new ShortUniqueId({ length: 10 });
        this.uid = uid.rnd();
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },
        saveEvent() {
            debugger;
            this.$emit('saveEvent', {
                id: this.uid,
                title: this.title,
                startTime: dayjs(this.dateString + this.startTime),
                endTime: dayjs(this.dateString + this.endTime),
            })
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

    .modal-body .event-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 24px;
        height: 100%;
    }

    .button-group {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex: 1;
    }

    .button-group button {
        padding: 6px 8px;
        background: hsla(246, 79%, 81%, 0.893);
        border: 0;
        border-radius: 4px;
        color: #2f2041;
    }
    
</style>