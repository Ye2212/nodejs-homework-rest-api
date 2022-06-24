const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: `Contact with id=${contactId}`,
    data: {
      contact,
    },
  });
};

module.exports = getById;
