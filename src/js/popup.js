import {createApp} from 'vue'

import Popup from './components/Popup.vue';
import NumberInput from './components/NumberInput.vue'
import ColorInput from 'vue-color-input'

const app = createApp(Popup)
app.component('NumberInput', NumberInput);
app.component('ColorInput', ColorInput);

app.mount('#app')