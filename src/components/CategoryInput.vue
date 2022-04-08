<script>
import IconAdd from '@/components/icons/IconAdd.vue'

export default {
    props: {
        name: String
    },
    data() {
        return {
            inputVal: this.name
        }
    },
    methods: {
        save() {
            this.$emit('save', this.inputVal)
        },
        clear() {
            this.inputVal = "";
        }
    },
    emits: ['save'],
    components: {IconAdd}
}
</script>

<template>
    <input type="text" v-model="inputVal" v-on:keyup.enter="save"/><IconAdd @click="save"/>
</template>