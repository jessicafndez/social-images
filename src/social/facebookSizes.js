class Facebook {
    constructor() {
        this.socialSizes = {
            0:  [
              {key: "Perfil", widthDefault: 180, widthWeb: 180, heightDefault: 180, heightWeb: 180}
            ],
            1: [
              {key: "Cuadrada", widthDefault: 1200, widthWeb: 470, heightDefault: 1200, heightWeb: 470}
            ],
            2: [
              {key: "Portada", widthDefault: 815, widthWeb: 815, heightDefault: 315, heightWeb: 315},
            ]
        }
    }

    getSocialSizes() {
        console.log(this.socialSizes);
        return this.socialSize;
    }
}
export default Facebook;