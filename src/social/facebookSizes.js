class Facebook {
    constructor() {
        this.socialSizes = {
            Profile:  [
              {widthDefault: 180, widthWeb: 160, heightDefault: 180, heightWeb: 160}
            ],
            Square: [
              {widthDefault: 1200, widthWeb: 470, heightDefault: 1200, heightWeb: 470}
            ],
            Cover: [
              {widthDefault: 815, widthWeb: 815, heightDefault: 315, heightWeb: 315},
            ]
        }
    }

    getSocialSizes() {
        console.log(this.socialSizes);
        return this.socialSize;
    }
}
export default Facebook;