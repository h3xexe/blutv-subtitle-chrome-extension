class SubtitleManager {
    constructor() {
        this.style = {
            color: 'rgba(255,255,255,1)',
            borderWidth: 2,
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0, .5)',
            lineHeight: 1.14,
            lineHeightUnit: 'em',
            fontSize: 50,
            fontSizeUnit: 'px',
            backgroundEnabled: false,
            borderEnabled: false,
        }
        chrome.storage.local.get(["style"]).then((result) => {
            if (result.style) this.updateStyle(JSON.parse(result.style));
        });
        const element = document.createElement('style');
        element.id = 'subtitle__manager';
        document.head.append(element);
        this.styleElement = document.getElementById('subtitle__manager');
        this.updateElement()
        console.log('Subtitle Manager initiated!');
    }

    getTextShadow() {
        if (!this.style.borderEnabled) return 'text-shadow: none !important';
        return `text-shadow: 0.000em 0.075em ${this.style.borderColor}, 0.029em 0.069em ${this.style.borderColor}, 0.053em 0.053em ${this.style.borderColor}, 0.069em 0.029em ${this.style.borderColor}, 0.075em 0.000em ${this.style.borderColor}, 0.069em -0.029em ${this.style.borderColor}, 0.053em -0.053em ${this.style.borderColor}, 0.029em -0.069em ${this.style.borderColor}, 0.000em -0.075em ${this.style.borderColor}, -0.029em -0.069em ${this.style.borderColor}, -0.053em -0.053em ${this.style.borderColor}, -0.069em -0.029em ${this.style.borderColor}, -0.075em -0.000em ${this.style.borderColor}, -0.069em 0.029em ${this.style.borderColor}, -0.053em 0.053em ${this.style.borderColor}, -0.029em 0.069em ${this.style.borderColor} !important;`
        // return `
        // text-shadow:
        //             -${this.style.borderWidth}px -${this.style.borderWidth}px 0 ${this.style.borderColor},
        //             0   -${this.style.borderWidth}px 0 ${this.style.borderColor},
        //             ${this.style.borderWidth}px -${this.style.borderWidth}px 0 ${this.style.borderColor},
        //             ${this.style.borderWidth}px  0   0 ${this.style.borderColor},
        //             ${this.style.borderWidth}px  ${this.style.borderWidth}px 0 ${this.style.borderColor},
        //             0    ${this.style.borderWidth}px 0 ${this.style.borderColor},
        //             -${this.style.borderWidth}px  ${this.style.borderWidth}px 0 ${this.style.borderColor},
        //             -${this.style.borderWidth}px  0   0 ${this.style.borderColor} !important;
        // ` 
    }

    getBackgroundStyle() {
        if (!this.style.backgroundEnabled) return 'background: none !important;';
        // const bgrgb = this.style.backgroundColor.convertToRGB()
        // return `background: rgba(${bgrgb[0]}, ${bgrgb[1]}, ${bgrgb[2]}, ${this.style.backgroundOpacity/100}) !important;`
        return `background: ${this.style.backgroundColor} !important;`
    }

    getStyleText() {
        // const rgb = this.style.color.convertToRGB()
        return `
            .theoplayer-texttracks span{
                color: ${this.style.color} !important;
                font-size: ${this.style.fontSize}${this.style.fontSizeUnit} !important;
                ${this.getBackgroundStyle()}
                line-height: ${this.style.lineHeight}${this.style.lineHeightUnit} !important;
                ${this.getTextShadow()}
            }
        `;
    }

    updateStyle(data) {
        const keys = Object.keys(this.style);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (Object.keys(data).includes(key)) {
                this.style[key] = data[key]
            }
        }
        this.updateElement()
    }

    updateElement() {
        this.styleElement.textContent = this.getStyleText();
    }
}

const manager = new SubtitleManager();

chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        if (request.type !== "subtitleUpdate") return;
        await manager.updateStyle(request.style)
        sendResponse(true);
    }
);