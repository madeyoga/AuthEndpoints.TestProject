<template>
  <v-row class="my-0 mx-auto" style="max-width: 640px">
    <v-text-field ref="inp0" class="px-2" label="-" hide-details="auto"></v-text-field>
    <v-text-field ref="inp1" class="px-2" label="-" hide-details="auto"></v-text-field>
    <v-text-field ref="inp2" class="px-2" label="-" hide-details="auto"></v-text-field>
    <v-text-field ref="inp3" class="px-2" label="-" hide-details="auto"></v-text-field>
    <v-text-field ref="inp4" class="px-2" label="-" hide-details="auto"></v-text-field>
    <v-text-field ref="inp5" class="px-2" label="-" hide-details="auto"></v-text-field>
  </v-row>
</template>

<script>
import { ref } from '@vue/reactivity'
import { nextTick, onMounted } from '@vue/runtime-core'
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: -1,
    }
  },
  setup(props, { emit }) {
    const counter = ref(6)

    const inp0 = ref(null)
    const inp1 = ref(null)
    const inp2 = ref(null)
    const inp3 = ref(null)
    const inp4 = ref(null)
    const inp5 = ref(null)

    onMounted(() => {
      nextTick(() => {
        inp0.value.focus()
      })
    })

    const inputs = [
      inp0,
      inp1,
      inp2,
      inp3,
      inp4,
      inp5,
    ]

    const gainFocus = (index) => {
      if (index >= inputs.length) {
        return
      }
      inputs[index].value.focus()
    }

    return {
      counter,
      inp0,
      inp1,
      inp2,
      inp3,
      inp4,
      inp5,
      inputs,
      gainFocus
    }
  },
}
</script>