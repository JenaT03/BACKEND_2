const config = {
    app: {
        port: process.env.PORT || 3000, // Kết nối cổng của env hoặc 3000
    },

    db: {
        //đường dẫn connect db mongo sử dụng biến của env hoặc đường dẫn mặc định
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/contactbook"
    }

};
module.exports = config; // xuất config