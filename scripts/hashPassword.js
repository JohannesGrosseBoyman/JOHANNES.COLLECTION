import bcrypt from "bcrypt";

async function hashPassword(password) {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  console.log("Hashed password:", hashed);
}

hashPassword("josh123"); // Replace with your actual password
