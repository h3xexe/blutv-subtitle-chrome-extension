<template>
  <div class="content text-white ">
    <h2 class="mt-0 w-full text-center">BluTV Altyazı Ayarları</h2>
    <div class="grid grid-col- gap-4 justify-center mx-auto">
      <div class="flex justify-between">
        <div class="setting">
          <span>Yazı Boyutu</span>
          <number-input v-model="style.fontSize" :step="1" :min="1" :max="70"/>
        </div>
        <div class="setting line">
          <span class="ml-2">Renk</span>
          <color-input v-model="style.color" position="left bottom" disable-text-inputs/>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="setting">
          <div class="flex flex-col justify-center items-center">
            <span class="title mb-1">Dış Çizgi</span>
            <label class="switch">
              <input type="checkbox" value="border" v-model="style.borderEnabled">
              <span class="slider round"></span>
            </label>
            <color-input v-model="style.borderColor" disable-text-inputs/>
          </div>
        </div>
        <div class="setting">
          <div class="flex flex-col justify-center items-center">
            <span class="title mb-1">Arkaplan</span>
            <label class="switch">
              <input type="checkbox" value="background" v-model="style.backgroundEnabled">
              <span class="slider round"></span>
            </label>
            <color-input v-model="style.backgroundColor" disable-text-inputs/>
          </div>
        </div>
      </div>
      <a class="text-xs opacity-20 w-full text-center hover:opacity-100 no-underline text-white transition-all " href="https://github.com/h3xexe/blutv-subtitle-chrome-extension" target="_blank">@2023 by H3X</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      style: {
        color: 'rgba(255,255,255,1)',
        fontSize: 50,
        fontSizeUnit: 'px',
        borderWidth: 4,
        borderColor: 'rgba(0,0,0,1)',
        backgroundColor: 'rgba(0,0,0, .5)',
        backgroundEnabled: false,
        borderEnabled: false,
      }
    }
  },
  methods: {},
  mounted() {
    chrome.storage.local.get(["style"]).then((result) => {
      if (result.style){
        const data = JSON.parse(result.style);
        const keys = Object.keys(this.style);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (Object.keys(data).includes(key)) {
            this.style[key] = data[key]
          }
        }
      }
    });
  },
  watch: {
    style: {
      async handler(newStyle) {
        const jstring = JSON.stringify(newStyle);
        chrome.storage.local.set({
          style: jstring
        })
        const [tab] = await chrome.tabs.query({
          currentWindow: true,
          active: true
        });
        if (tab.url.startsWith('https://www.blutv.com')){
          await chrome.tabs.sendMessage(tab.id, {
            style: newStyle,
            type: 'subtitleUpdate'
          });
        }
      },
      deep: true
    }
  }
}
</script>NumberInput