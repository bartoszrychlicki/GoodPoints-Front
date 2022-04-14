<script>
import IconTrash from '@/components/icons/IconTrash.vue'
import Input from "./Input.vue"

export default {
    props: {
        name: String
    },
    data() {
        return {
            isEdit: false
        };
    },
    emits: ["remove", "save"],
    components: { Input, IconTrash },
    methods: {
        save(name) {
            this.$emit('save', name)
            this.isEdit = false
        }
    }
}
</script>

<template>
    <div v-if="isEdit">
        <Input @save="save" :name="this.name" />
    </div>
    <div v-else>
        <span @click="isEdit = true">{{ this.name }}</span><span style="float:right;"><IconTrash @click="$emit('remove')" /></span>
    </div>    
</template>