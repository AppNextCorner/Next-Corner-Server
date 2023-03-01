/**
 * NEED: seperate the three menu, announcement, etc and give them the business name, userid, to match with the business and UPLOAD FILES
 */
require('dotenv').config()
const express = require('express')
const businessRouter = express.Router()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
let path = require('path')
const Business = require('../models/businessModel')
const firebase = require('../util/firebase')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

let upload = multer({ storage, fileFilter })

async function decodeIDToken(req, res, next) {
  console.log('Token Request', req.token)
  if (req.token) {
    try {
      const decodedToken = await firebase.verifyToken(req.token)
      req['currentUser'] = decodedToken
      next()
    } catch (err) {
      console.log(err)
    }
  }
} //
const cpUpload = upload.any()
businessRouter.post('/', decodeIDToken,cpUpload, async (req, res) => {
  const auth = req.currentUser
  /**
   * Frontend makes sure that the user first uploads a business cover image so we could find the image of the menu item after the business cover image has been uploaded
   */
  let menuImageIndex = 0;
  let announcementImageIndex = 0;
  for (let n = 1; n < req.files.length; n++) {
     // adding the filename as an array due to files being an array of all files added
    if(req.files[n].fieldname.indexOf('menu') >= 0){
      req.body.menu[menuImageIndex].image = req.files[n].filename;
      menuImageIndex++;
    }
    else if(req.files[n].fieldname.indexOf('announcementCards') >= 0){
      req.body.announcementCards[announcementImageIndex].image = req.files[n].filename;
      announcementImageIndex++;
    }
    
  }
  if (auth) {
    try {
      const business = new Business({
        name: req.body.name,
        type: req.body.type,
        image: req.files[0].filename, // first element of files placed as the image of the business image
        announcementCards: req.body.announcementCards,
        location: req.body.location,
        open: req.body.open,
        close: req.body.close,
        categoriesForMenu: req.body.categoriesForMenu,
        menu: req.body.menu,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
        rating: req.body.rating,
        trendingCategory: req.body.trendingCategory,
      })

      const savedbusiness = await business.save()
     
      return res.status(201).json(savedbusiness)
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.status(403).send('Not authorized')
  }
})

businessRouter.get('/', decodeIDToken, async (req, res) => {
  const auth = req.currentUser
  console.log('Auth: ', req.currentUser)
  if (auth) {
    const business = await Business.find({})
    console.log('business', business)
    return res.json(business.map((business) => business.toJSON()))
  } else {
    return res.status(403).send('Not authorized')
  }
})

// deleting ONE item document from leaderboard from an ID
businessRouter.delete('/delete-item/:id', (req, res) => {
  async function deleteItem() {
    try {
      // find the document with the ID input on an API for it to perform the delete action with .findByIdAndDelete
      const deletedUserItem = await Business.findByIdAndDelete(
        // accessing the item's ID
        { _id: req.params.id },
      )
      // send back score data and status ok
      res.status(201).send({
        message: `Deleted Item`,
        payload: deletedUserItem,
      })
    } catch (e) {
      console.log(e)
      // send back error mesage
      res.status(400).send({
        message: 'error happened',
        data: e,
      })
    }
  }

  deleteItem()
})

module.exports = businessRouter
