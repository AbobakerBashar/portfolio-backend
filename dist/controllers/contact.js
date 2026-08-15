import Contact from "../models/Contact.js";
export const createContact = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
        });
        if (!contact)
            return res.status(400).json({
                message: "Faild to create contact",
                success: false,
            });
        res.status(201).json({
            success: true,
            message: "Contact created successfully!",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            errors: {
                error: error.message,
            },
        });
    }
};
