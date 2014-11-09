var express = require('express');
var router = express.Router();

var WishlistController = require('../../controllers/api/wishlist-controller');


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
 * 
 */
module.exports = router;