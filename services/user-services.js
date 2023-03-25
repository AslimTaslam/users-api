import pool from '../database/db.js';

export const getUserById = async (id) => {
  const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return user;
};

export const createUser = async ({
  name,
  age,
  nationality,
  marriageStatus,
  children,
  fromAge,
  tillAge,
  telegram,
  phoneNumber,
  city,
  country,
  moreInfo,
  moderated = false,
}) => {
  const user = await pool.query(
    'INSERT INTO users(name, age, nationality, marriageStatus, children, fromAge, tillAge, telegram, phoneNumber, city, country, moreInfo, moderated) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
    [
      name,
      age,
      nationality,
      marriageStatus,
      children,
      fromAge,
      tillAge,
      telegram,
      phoneNumber,
      city,
      country,
      moreInfo,
      moderated,
    ]
  );
  return user;
};

export const toggleModeratedById = async (id, moderated) => {
  const user = pool.query(
    'UPDATE users SET moderated = $1 WHERE id = $2 RETURNING *',
    [moderated, id]
  );
  return user;
};
