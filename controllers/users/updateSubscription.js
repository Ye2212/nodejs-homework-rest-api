const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`User ${_id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "subscription updated",
    data: { result },
  });
};

module.exports = updateSubscription;
