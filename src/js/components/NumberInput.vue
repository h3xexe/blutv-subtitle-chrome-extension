<template>
  <div class="num__wrapper">
    <button @click="addSafe(($props.step*-1))">-</button>
    <input type="number"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           :min="$props.min" :step="$props.step" :max="$props.max">
    <button @click="addSafe($props.step)">+</button>
  </div>
</template>
<script>
export default {
  name: 'NumberInput',
  props: {
    modelValue: Number,
    max: {
      default: 100,
      type: Number
    },
    min: {
      default: 0,
      type: Number
    },
    step: {
      default: 1,
      type: Number
    }
  },
  emits: ['update:modelValue'],
  methods: {
    addSafe(amount) {
      const newAmount = this.$props.modelValue + amount;
      if (newAmount < this.$props.min) this.$emit('update:modelValue', this.$props.min);
      else if (newAmount > this.$props.max) this.$emit('update:modelValue', this.$props.max);
      else this.$emit('update:modelValue', newAmount)
    }
  }
}
</script>
<style lang="scss">
input[type=number]:focus {
  outline: 0;
}

.num__wrapper {
  display: flex;
  padding: 5px 0;

  input {
    text-align: center;
    height: 50px;
    display: block;
    border: 0;
    font-size: 1.8em;
  }

  button {
    border: 0;
    font-size: 1.8em;
    background-color: #ffffff;
    width: 30px;
    height: 50px;
    text-align: center;
  }

  button:nth-of-type(1) {
    border-radius: 10px 0 0 10px;
  }

  /**
    button:nth-of-type(2) {
    border-radius: 0 10px 10px 0;
  }
   */
}
</style>