const { mongoose, Schema, model } = require("mongoose");

const { createHash, randomBytes } = require("node:crypto");
const { createToken } = require("../services/authentication");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      default: "/images/default.jpeg",
    },
  },
  {
    timestamp: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHash("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.hashedPassword = hashedPassword;

  next()
});

userSchema.static("genarateAndMatchPassword", async function(email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("user not found");
  
  const salt = user.salt;
  const hashedPassword = user.Password;

  const userProvidedHash = createHash("sha256", salt)
  .update(password)
  .digest("hex");

  if(hashedPassword == userProvidedHash)
    throw new Error("incorrect password")

  const token = createToken(user)

  return token;

});
const User = model("user", userSchema);

module.exports = User;
