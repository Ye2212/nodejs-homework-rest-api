const getCurrent = (req, res) => {
  console.log(req.user);
  const { email, password } = req.user;

  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        password,
      },
    },
  });
};

module.exports = getCurrent;
