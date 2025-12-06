import { pool } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const signup = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const exists = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (exists.rows.length > 0) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1,$2,$3,$4,$5) RETURNING id,name,email,phone,role`,
    [name, email, hashedPassword, phone, role]
  );

  return result;
};

const signin = async (email: string, password: string) => {
  const userRes = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  if (userRes.rows.length === 0) throw new Error("Invalid email or password");

  const user = userRes.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    config.jwtSecret as string,
    { expiresIn: "7d" }
  );
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};
export const authServices = {
  signup,
  signin,
};
