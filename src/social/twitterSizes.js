class Twitter {
    constructor() {
        this.socialSizes = {
            0: [
                {key: "Profile", widthDefault: 400, widthWeb: 180, heightDefault: 400, heightWeb: 180}
            ],
            1: [
                {key: "Square", widthDefault: 1024, widthWeb: 512, heightDefault: 512, heightWeb: 256}
            ],
            2: [
                {key: "Cover", widthDefault: 1500, widthWeb: 1024, heightDefault: 500, heightWeb: 280}
            ]
        }
    }
}

export default Twitter;