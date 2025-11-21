export const createInvite = async (req, res) => {
  console.log("🟢 [createInvite] called with body:", req.body);

  try {
    const { email, tier } = req.body;

    // Validate request body
    if (!tier) {
      return res.status(400).json({ message: "Tier is required." });
    }

    // Generate a unique random 8-character code
    const code = crypto.randomBytes(4).toString("hex").toUpperCase();

    // Set expiry date (30 days from now)
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);

    // Save invite to database
    const invite = await Invite.create({
      code,
      email,
      tier_allowed: tier,   // 👈 store correctly
      expiry,
    });

    console.log("✅ Invite created successfully:", invite.code);

    return res.status(201).json({
      message: "Invite created successfully",
      invite: {
        code: invite.code,
        email: invite.email,
        tier: invite.tier_allowed,
        expiry: invite.expiry,
      },
    });
  } catch (error) {
    console.error("❌ [createInvite] Error:", error);
    return res.status(500).json({
      message: "Failed to create invite",
      error: error.message,
    });
  }
};
