const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const {
  joiSchema,
  favoriteJoiSchema,
} = require("../../models/contacts/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.remove));

router.put("/:contactId", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
