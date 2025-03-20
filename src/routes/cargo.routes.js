const {Router} = require('express');
const { getAllCargos, getCargo, createCargo, updateCargo, deleteCargo} = require('../controllers/cargo.controller');

const router = Router();

router.get      ('/cargo',        getAllCargos);
router.get      ('/cargo/:id',    getCargo);
router.post     ('/cargo',        createCargo);
router.put      ('/cargo',        updateCargo);
router.delete   ('/cargo/:id',    deleteCargo);

module.exports = router;