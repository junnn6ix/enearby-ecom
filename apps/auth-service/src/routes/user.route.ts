import { Router } from "express";
import { shouldBeAdmin } from "../middleware/authMiddleware";
import clerkClient from "../utils/clerk";
import { producer } from "../utils/kafka";

const router: Router = Router();

router.get("/", async (req, res) => {
  const users = await clerkClient.users.getUserList({
    limit: 500,
  });
  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await clerkClient.users.getUser(id);
  res.status(200).json(user);
});

router.post("/", async (req, res) => {
  type CreateParams = Parameters<typeof clerkClient.users.createUser>[0];
  const newUser: CreateParams = req.body;

  const user = await clerkClient.users.createUser(newUser);
  producer.send("user.created", {
    value: {
      username: user.username,
      email: user.emailAddresses[0]?.emailAddress,
    },
  });
  res.status(200).json(user);
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    type UpdateParams = Parameters<typeof clerkClient.users.updateUser>[1];
    const updateData: UpdateParams = req.body;

    const user = await clerkClient.users.updateUser(id, updateData);

    producer.send("user.updated", {
      value: {
        username: user.username,
        email: user.emailAddresses[0]?.emailAddress,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to update user",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await clerkClient.users.deleteUser(id);
  res.status(200).json(user);
});

export default router;
