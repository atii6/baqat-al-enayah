import bcrypt from "bcrypt";
import sequelize from "@config/sequelize";
import db from "@/models";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utilities/helpers/emailService";
import { EmailRequestTemplate } from "../../utilities/helpers/emailRequestsTemplate";
import { Op } from "sequelize";
import { USER_ROLES } from "@/constants";
import sanitizeUser from "../../utils/sanitizeUsers";

const getRoleByName = (roles, name) => roles.find((role) => role.name === name);

const sendVerificationEmail = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const verifyUrl = `${process.env.NEXT_PUBLIC_URL}/verify?token=${token}`;
  await sendEmail(
    email,
    "Email Address Verification",
    EmailRequestTemplate(
      verifyUrl,
      "Verify Your Email",
      "Click the button below to verify your email and activate your account.",
      "Verify Email",
    ),
  );
};

const _hashedPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const getAllUsers = async () => {
  return await db.users.findAll({
    include: [
      {
        model: db.roles,
        as: "roles",
        where: {
          name: {
            [Op.ne]: "Administrator",
          },
        },
        attributes: [],
      },
    ],
  });
};

const getUserById = async (id) => {
  const user = await db.users.findByPk(id);

  const userData = user.get({ plain: true });
  const restUser = sanitizeUser(userData);

  if (!user) {
    return null;
  }
  const userDetails = await db.userDetails.findOne({
    where: { user_id: user.id },
  });

  const giftWell = await db.giftWell.findOne({ where: { user_id: user.id } });

  const registryItems = await db.registryItem.findAll({
    where: { giftwell_id: giftWell.id },
  });

  const donations = await db.donation.findAll({
    where: { user_id: user.id },
  });

  const isPersonalDetailsCompleted = Boolean(
    userDetails?.journey &&
    userDetails?.street_address &&
    userDetails?.city &&
    userDetails?.state &&
    userDetails?.zip_code,
  );

  const isRegistryPublished = giftWell?.privacy === "public" ? true : false;

  const isRegistrySetupCompleted =
    !!registryItems?.length || !!donations?.length;

  const updatedUser = {
    ...restUser,
    isPersonalDetailsCompleted,
    isRegistrySetupCompleted,
    isRegistryPublished,
  };

  return updatedUser;
};

const createUser = async (userData) => {
  const {
    email,
    password,
    role_id,
    first_name,
    last_name,
    recipient_first_name,
    recipient_last_name,
    recipient_email,
    registry_public_url,
    is_deleted,
    ...userDetails
  } = userData;

  const roles = await db.roles.findAll();
  const recipientRole = getRoleByName(roles, USER_ROLES.RECIPIENT);
  const careGiverRole = getRoleByName(roles, USER_ROLES.CAREGIVER);

  const isRecipientSelf = role_id === recipientRole.id;
  const hashedPassword = await _hashedPassword(password);

  const transaction = await sequelize.transaction();

  try {
    const recipientEmail = (
      isRecipientSelf ? email : recipient_email
    ).toLowerCase();

    const recipientName = isRecipientSelf
      ? { first_name, last_name }
      : { first_name: recipient_first_name, last_name: recipient_last_name };

    const existingRecipient = await db.users.findOne({
      where: { email: recipientEmail },
    });

    if (existingRecipient) {
      throw new Error("Recipient's email already registered");
    }

    if (!isRecipientSelf) {
      const existingCaregiver = await db.careGiver.findOne({
        where: { email: email.toLowerCase() },
      });

      if (existingCaregiver) {
        throw new Error("Care Giver's email already registered");
      }
    }

    // const account = await stripe.accounts.create({
    //   type: "express",
    //   email: isUserRecipient
    //     ? email.toLowerCase()
    //     : recipient_email.toLowerCase(),
    //   capabilities: {
    //     transfers: { requested: true },
    //     card_payments: { requested: true },
    //   },
    // });

    const newUser = await db.users.create(
      {
        email: recipientEmail,
        password: hashedPassword,
        role_id: recipientRole.id,
        ...recipientName,
        registry_public_url,
        is_deleted,
        // stripe_account_id: account.id,
      },
      { transaction },
    );

    if (!isRecipientSelf) {
      await db.careGiver.create(
        {
          user_id: newUser.id,
          email: email.toLowerCase(),
          password: hashedPassword,
          recipient_first_name,
          recipient_last_name,
          recipient_email,
          role_id: careGiverRole.id,
        },
        { transaction },
      );
    }

    await db.userDetails.create(
      { user_id: newUser.id, ...userDetails },
      { transaction },
    );

    await db.giftWell.create(
      {
        user_id: newUser.id,
        privacy: "private",
        title: `${newUser.first_name} ${newUser.last_name}'s Care Registry`,
      },
      { transaction },
    );

    const emailsToVerify = isRecipientSelf
      ? [recipientEmail]
      : [recipientEmail, email.toLowerCase()];

    await Promise.all(emailsToVerify.map(sendVerificationEmail));

    await transaction.commit();

    return sanitizeUser(newUser.get({ plain: true }));
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getUserByEmail = async (email) => {
  if (email.includes("@")) {
    // Try finding user by email
    let account = await db.users.findOne({ where: { email } });
    // let isCareGiver = false;

    if (!account) {
      // Try caregiver if not a user
      account = await db.careGiver.findOne({ where: { email } });
      // isCareGiver = true;
    }

    if (!account) {
      throw new Error("No account found with this email.");
    }

    if (account.is_deleted) {
      throw new Error(
        "Your account has been deactivated. Please contact support for assistance.",
      );
    }

    // Send reset email
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`;
    await sendEmail(
      email,
      "Reset Password",
      EmailRequestTemplate(
        resetUrl,
        "Reset your password",
        "Click the button below to reset your password.",
        "Reset Password",
      ),
    );

    const newAccount = account.get({ plain: true });
    const accountData = sanitizeUser(newAccount);
    return accountData;
  }

  const userEmail = `${email}`;
  const user = await db.users.findOne({
    where: { registry_public_url: userEmail },
  });
  if (!user) {
    throw new Error("No user found against this username");
  }

  if (user.is_deleted) {
    throw new Error(
      "Your account has been deactivated. Please contact support for assistance.",
    );
  }
  const registry = await db.giftWell.findOne({
    where: { user_id: user.id, privacy: "public" },
  });

  if (!registry) {
    throw new Error("No public registry found against this username");
  }
  const dbUser = user.get({ plain: true });
  const restUser = sanitizeUser(dbUser);

  return restUser;
};

const updateUser = async (id, userData) => {
  let account = await db.users.findByPk(id);
  // let isCareGiver = false;

  // Step 1: If not found in users, try caregivers
  if (!account) {
    account = await db.careGiver.findByPk(id);
    // isCareGiver = true;
  }

  if (!account) {
    throw new Error("User not found");
  }

  // Step 2: Hash password if provided
  const { password } = userData;
  let hashedPassword = password
    ? await _hashedPassword(password)
    : account.password;

  // Step 3: Update user or caregiver
  const updatedAccount = await account.update({
    ...userData,
    password: hashedPassword,
  });

  // Step 4: Remove password from result
  const updatedUser = updatedAccount.get({ plain: true });
  const cleanedData = sanitizeUser(updatedUser);

  return cleanedData;
};

const deleteUser = async (id) => {
  const user = await db.users.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  await user.destroy();
  return { message: "User deleted successfully" };
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
