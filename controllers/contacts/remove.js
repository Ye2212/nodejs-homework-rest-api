const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");
const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: `Contact  with id=${contactId} deleted`,
    data: {
      result,
    },
  });
};
module.exports = remove;
