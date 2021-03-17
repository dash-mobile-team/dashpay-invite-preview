const functions = require('firebase-functions');
const express = require('express');
const url = require('url');

const {createCanvas, loadImage} = require('canvas');
const width = 600;
const height = 600;

const app = express();
exports.app = functions.https.onRequest(app);

app.get('/fun/invite-preview', (request, response) => {

    canvas = createCanvas(width, height);
    ctx = canvas.getContext("2d");

    var avatarUrl = request.query['avatar-url'];
    var displayName = request.query['display-name'];

    if (avatarUrl && avatarUrl !== '') {

        loadImage(avatarUrl).then(avatar => {

            var q = url.parse(avatarUrl, true);
            var zoom = q.query['dashpay-profile-pic-zoom'];

            var dstX = width * 0.31;
            var dstY = height * 0.367;
            var dstW = width * 0.367;
            var dstH = height * 0.367;

            if (zoom !== undefined) {

                var zoomParts = zoom.split(",");
                var zoomLeft = zoomParts[0];
                var zoomTop = zoomParts[1];
                var zoomRight = zoomParts[2];
                var zoomBottom = zoomParts[3];

                var srcX = zoomLeft * avatar.width;
                var srcY = zoomTop * avatar.height;
                var srcW = (zoomRight - zoomLeft) * avatar.width;
                var srcH = (zoomBottom - zoomTop) * avatar.height;

                ctx.drawImage(avatar, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);

            } else {

                ctx.drawImage(avatar, 0, 0, avatar.width, avatar.height, dstX, dstY, dstW, dstH);
            }

            displayFrameAndExit(ctx, canvas, response);

        }).catch(function () {

            exitWithError(response, 404, 'Unable to download avatar ' + avatarUrl);
        });

    } else if (displayName) {

        ctx.font = '140px Impact';
        var firstLetter = displayName.charAt(0);
        var textMeasure = ctx.measureText(firstLetter);
        var x = width / 2 - textMeasure.width / 2;
        var y = height / 1.55;
        ctx.fillText(firstLetter, x, y);

        displayFrameAndExit(ctx, canvas, response);

    } else {

        exitWithError(response, 400, 'Missing parameters avatar-url and/or display-name');
    }

});

function displayFrameAndExit(ctx, canvas, response) {
    loadImage('./img/frame.png').then(image => {
        ctx.drawImage(image, 0, 0, width, height);

        response.set({
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=300, s-maxage=600'
        });
        canvas.createPNGStream().pipe(response);
    });
}

function exitWithError(response, code, message) {
    response.writeHeader(code, {'Content-Type': 'text/plain'});
    response.write('Error ' + code + ': ' + message);
    response.end();
}
