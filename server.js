const app = require("./app");
const config = require("./app/config");

const PORT = config.app.port; // truy cập giá trị port
app.listen(PORT, () => {
    console.log(`Server is running on post ${PORT}.`);
});