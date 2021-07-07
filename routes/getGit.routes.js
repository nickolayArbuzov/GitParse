const Router = require("express");
const getGitController = require('../controllers/getGitController')

const router = new Router();

router.get('/contributions', getGitController.getGit)

module.exports = router;