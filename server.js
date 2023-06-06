const express = require('express');
const cors = require('cors');
const useragent = require('express-useragent');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());

app.get('/api/me', (req, res) => {
    return res.status(200).json({
        status: true,
        serviceInstance: 1,
        info: {
            ipAddress: parseIp(req),
            os: req.useragent.os,
            platform: req.useragent.platform,
            browser: req.useragent.browser,
            version: req.useragent.version,
            isMobile: req.useragent.isMobile,
            isDesktop: req.useragent.isDesktop,
            geoIp: req.useragent.geoIp,
            reqIp: req.socket.remoteAddress,
            xIp: req.headers,
        }
    });
});


app.use((req, res) => {
    return res.status(404).json({
        status: false,
        serviceInstance: 1,
        error: {
            message: `No path found at ${req.path}`
        }
    });
});

const parseIp = (req) => req.headers['x-forwarded-for'] || req.socket?.remoteAddress

app.listen(process.env.PORT || 8000, () => console.log(`SERVER LISTENING ON http://localhost:${process.env.PORT || 8000}`));