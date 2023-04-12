const UserModel = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CreateUser = async (req, res) => {
  const { name, email, password, age } = req.body;
  // check all the missing fields.
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: `Please enter all the required field.` });

  // name validation.
  if (name.length > 25)
    return res
      .status(400)
      .json({ error: "name can only be less than 25 characters" });

  // email validation.
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "please enter a valid email address." });

  // validation of password.
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "password must be atleast 6 characters long" });
  try {

    const doesUserAlreadyExist = await UserModel.findOne({ email });
    if (doesUserAlreadyExist)
      return res.status(400).json({
        error: `a user with that email [${email}] already exists so please try another one.`,
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ name, email, password: hashedPassword, age });

    // save the user.
    const result = await newUser.save();
    // result._doc.password = undefined;

    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

const CheckUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ error: "please enter all the required fields!" });

  // email validation.
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "please enter a valid email address." });

  try {
    const doesUserExits = await UserModel.findOne({ email });

    if (!doesUserExits)
      return res.status(400).json({ error: "Invalid email or password!" });

    // if there were any user present.
    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch)
      return res.status(400).json({ error: "Invalid email or password!" });

    const payload = { _id: doesUserExits._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const user = { ...doesUserExits._doc, password: undefined };
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}


const UpdateUser = async (req, res) => {
  const id = req.params.userId;

  if (!id) return res.status(400).json({ statusCode: 400, error: "no id specified." });

  try {

    const updatedData = { ...req.body, id: undefined };
    const result = await UserModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    const resultData = {
      statusCode: null,
      data: {

        data: result,

      }

    }

    return res.status(200).json({ ...resultData, statusCode: 200 });
  } catch (err) {

    console.log({ statusCode: 500, error: err.message });
  }
}


  module.exports = { CreateUser, CheckUser,UpdateUser };