const User = require("../models/User");
const Contact = require("../models/Contact");
const Chat = require("../models/Chat");

const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  if (!contacts?.length) {
    return res.status(400).json({ message: "No contacts Found" });
  }
  res.json(contacts);
};

const getContactByUserId = async (req, res, next) => {
  const userId = req.params.id;
  //!   const userId = req.user.id;
  //Remember to populate chats

  try {
    const user = await User.findById(userId).populate("contacts").exec();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const { contacts } = user;
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

const createNewContact = async (req, res, next) => {
  const userId = req.user.id;

  console.log("req.user:", req.user);

  if (!userId) {
    return res.status(400).json({ message: "Create an account to add contacts" });
  }

  const {
    firstName,
    lastName,
    company,
    imgUrl,
    chat,
    relationship,
    notes,
    phone,
    email,
    linkedin,
  } = req.body;

  if (!firstName) {
    return res.status(400).json({ message: "firstName required" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "You must be logged in to save contacts" });
    }

    const contact = await Contact.create({
      userId,
      firstName,
      lastName,
      company,
      imgUrl,
      chat,
      relationship,
      notes,
      phone,
      email,
      linkedin,
    });

    if (contact) {
      await User.findByIdAndUpdate({ _id: userId }, { $addToSet: { contacts: contact.id } });
      return res.status(201).json({ message: "New contact created" });
    } else {
      return res.status(400).json({ message: "Invalid contact data received" });
    }
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  const contactId = req.params.id;
  if (!contactId) {
    return res.status(400).json({ message: "Contact ID Requried" });
  }
  const {
    firstName,
    lastName,
    company,
    imgUrl,
    chat,
    relationship,
    notes,
    phone,
    email,
    linkedin,
  } = req.body;

  const updateFields = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(company && { company }),
    ...(imgUrl && { imgUrl }),
    ...(chat && { chat }),
    ...(relationship && { relationship }),
    ...(notes && { notes }),
    ...(phone && { phone }),
    ...(email && { email }),
    ...(linkedin && { linkedin }),
  };

  try {
    const contact = await Contact.findById(contactId).exec();
    if (!contact) {
      return res.status(400).json({ message: "Contact not found" });
    }

    // if (!contact.userId.equals(req.user.id)) {
    //   return res.status(403).json({ message: "You can update only your contacts!" });
    // }

    const updatedContact = await Contact.updateOne(
      { _id: contactId },
      { $set: updateFields }
    ).exec();

    if (updatedContact.nModified === 0) {
      return res.status(400).json({ message: "No fields were updated" });
    }

    res.json({ message: `Contact updated` });
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  //TEST THAT DELETE AND UPDATE POSTS WORKS
  const ContactId = req.params.id;
  if (!ContactId) {
    return res.status(400).json({ message: "Contact ID Requried" });
  }
  try {
    const contact = await Contact.findById(ContactId).exec();
    if (!contact.userId.equals(req.user.id)) {
      return res.status(403).json({ message: "You can delete only your contacts!" });
    }
    const deletedContact = await contact.deleteOne();
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { contacts: ContactId },
    });
    await Tag.updateMany({ contacts: contact._id }, { $pull: { contacts: contact._id } });
    res.json({ message: `${deletedContact.firstName} deleted` });
  } catch (err) {
    next(err);
  }
};

const updateTimestamp = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const timestamp = Date.now();

    contact.lastUpdated = timestamp;

    await contact.save();

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllContacts,
  getContactByUserId,
  createNewContact,
  updateContact,
  deleteContact,
  updateTimestamp,
};
