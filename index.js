const server = require('./api/server');

const port = process.env.PORT || 6001;

server.listen(port, () => console.log(`Server is running on ${port}`));
