import bcrypt from "bcrypt";

const hashedPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

const comparePassword = async (data: { password: string; hash: string }) => {
  const { hash, password } = data;

  return await bcrypt.compare(password, hash);
};

export { hashedPassword, comparePassword };
