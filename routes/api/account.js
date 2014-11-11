var express = require('express');
var router = express.Router();

var WishlistController = require('../../controllers/api/wishlist-controller');
var GiftIdeaController = require('../../controllers/api/gift-idea-controller');

/********** wishlist **********/

/**
 * get connected user whishlists
 */
router.get('/wishlists', WishlistController.userWishlistsAction);

/**
 * create wishlist for current user
 */
router.post('/wishlists', WishlistController.createUserWishlistAction);

/**
 * delete a wishlist of connected user (by id)
 */
router.delete('/wishlists/:id', WishlistController.deleteUserWishlistAction);

/**
 * update a wishlist of connected user (by id)
 */
router.put('/wishlists/:id', WishlistController.updateUserWishlistAction);

/**
 * update a wishlist of connected user (by id)
 */
router.get('/wishlists/:id', WishlistController.readUserWishlistAction);


/**
 * update  wishlist status of connected user (by id)
 */
router.put('/wishlists-status/:id', WishlistController.changeStatusAction);


/********** gift idea **********/

router.post('/gift-idea/', GiftIdeaController.createGiftIdeaAction);

router.delete('/gift-idea/:id', GiftIdeaController.deleteGiftIdeaAction);

router.put('/gift-idea/:id', GiftIdeaController.updateGiftIdeaAction);

router.get('/gift-idea/:id', GiftIdeaController.readGiftIdeaAction);



/**
 * 
 */
module.exports = router;