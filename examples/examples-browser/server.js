const express = require('express')
const path = require('path')
const { get } = require('request')
const expressApp = express()




expressApp.use(express.json())
expressApp.use(express.urlencoded({ extended: true }))

const viewsDir = path.join(__dirname, 'views')
expressApp.use(express.static(viewsDir))
expressApp.use(express.static(path.join(__dirname, './public')))
expressApp.use(express.static(path.join(__dirname, '../images')))
expressApp.use(express.static(path.join(__dirname, '../media')))
expressApp.use(express.static(path.join(__dirname, '../../weights')))
expressApp.use(express.static(path.join(__dirname, '../../dist')))

// expressApp.get('/', (req, res) => res.redirect('/face_detection'))
expressApp.get('/', (req, res) => res.sendFile(path.join(viewsDir, 'index.html')))
expressApp.get('/face_detection', (req, res) => res.sendFile(path.join(viewsDir, 'faceDetection.html')))
expressApp.get('/webcam_face_detection', (req, res) => res.sendFile(path.join(viewsDir, 'webcamFaceDetection.html')))

expressApp.post('/fetch_external_image', async (req, res) => {
  const { imageUrl } = req.body
  if (!imageUrl) {
    return res.status(400).send('imageUrl param required')
  }
  try {
    const externalResponse = await request(imageUrl)
    res.set('content-type', externalResponse.headers['content-type'])
    return res.status(202).send(Buffer.from(externalResponse.body))
  } catch (err) {
    return res.status(404).send(err.toString())
  }
})

expressApp.listen(3000, () => console.log('Listening on port 3000!'))

function request(url, returnBuffer = true, timeout = 10000) {
  return new Promise(function(resolve, reject) {
    const options = Object.assign(
      {},
      {
        url,
        isBuffer: true,
        timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
      },
      returnBuffer ? { encoding: null } : {}
    )

    get(options, function(err, res) {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}