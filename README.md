# GMDL: Give Me Direct Link

Get direct links to files in Google Drive by a Chrome extension (manifest v3)

Convert `{ID}` to `https://lh3.googleusercontent.com/d/{ID}` (or you can change to use `https://drive.google.com/uc?id={ID}` by yourself)

Created links may be deleted by Google Drive, you can move the pointer to regenerate (this is a hack by adding a listener to "pointermove" :stuck_out_tongue_winking_eye:)

## Screenshot

![screenshot](https://lh3.googleusercontent.com/d/1iyFzPODpFIgWUvICJVo4s_osAm1brPGF)

## Usage

Tested on Brave 1.50.119 (Chromium: 112.0.5615.121)

1. clone/download this repo; modify injected.js if you need
2. go to chrome://extensions (or brave://extensions)
3. toggle "Developer mode" on
4. click "Load unpacked" and select the folder of the repo
5. (optional) click "Details" of the extension and toggle "Allow in Private" on
6. Open your google drive, browse images, and enjoy the hack

## Known issues

If it shows "404. That’s an error.", it means that the file is not shared. Please share the image(s) first

1. Need to refresh page (F5) after uploading new images
2. Only support image files (see `postfix` in `injected.js`)
3. Language should be either English or 繁體中文 (see `postfix` in `injected.js`)
4. To copy the link directly, you need to use the Shift key + right click on the generated link

## Disclaimer

This project is not provided by Google (Alphabet Inc.)

## License

MIT
