const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--use-fake-ui-for-media-stream',   // Auto-accept camera/mic permission dialogs
      '--use-fake-device-for-media-stream' // Use a fake webcam and mic stream
    ]
  });

  const context = browser.defaultBrowserContext();

  // Grant permissions for camera and microphone
  await context.overridePermissions('https://webrtc.github.io', [
    'camera',
    'microphone'
  ]);

  const page = await browser.newPage();
  await page.goto('https://webrtc.github.io/samples/src/content/getusermedia/gum/');

  // Now the website will think camera and mic are granted
})();
