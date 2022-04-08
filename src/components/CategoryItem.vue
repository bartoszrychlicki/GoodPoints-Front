<script>
import IconTrash from '@/components/icons/IconTrash.vue'
import CategoryInput from "./CategoryInput.vue"

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
    components: { CategoryInput, IconTrash },
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
        <CategoryInput @save="save" :name="this.name" />
    </div>
    <div v-else>
        <span @click="isEdit = true">{{ this.name }}</span><IconTrash @click="$emit('remove')" />
    </div>    
</template>