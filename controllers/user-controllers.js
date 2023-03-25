import {
  getUserById,
  createUser,
  toggleModeratedById,
} from '../services/user-services.js';

export const getUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user.rows[0].moderated) {
      res.status(405).json({
        message: 'User data is hidden',
      });

      return;
    }
    res.status(200).json({
      user: user.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const createUserController = async (req, res) => {
  try {
    const {
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
    } = req.body;

    const requiredFields = [
      { title: 'name', value: name },
      { title: 'age', value: age },
      { title: 'nationality', value: nationality },
      { title: 'marriageStatus', value: marriageStatus },
      { title: 'children', value: children },
      { title: 'fromAge', value: fromAge },
      { title: 'tillAge', value: tillAge },
      { title: 'city', value: city },
      { title: 'country', value: country },
      { title: 'moreInfo', value: moreInfo },
    ];

    const emptyFields = requiredFields.filter((field) => field.value == null);

    if (emptyFields.length > 0) {
      res.status(400).json({
        message: 'Required fields missing',
        emptyFields,
      });

      return;
    }

    const newUser = await createUser({
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
    });

    if (newUser.rowCount === 0) {
      res.status(400).json({
        message: 'User not created',
      });

      return;
    }

    res.status(201).json({
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const toggleModeratedController = async (req, res) => {
  try {
    const { id, moderated } = req.body;

    if (!id) {
      res.status(400).json({ message: "ID doesn't exist" });

      return;
    }
    await toggleModeratedById(id, moderated);

    const message = moderated ? 'User moderated off' : 'User moderated on';

    res.status(201).json({
      message,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
