import { db } from "./db";
import { users } from "@shared/schema";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, "james@bestroofingnow.com"),
    });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin user
    const [admin] = await db.insert(users).values({
      email: "james@bestroofingnow.com",
      password: hashedPassword,
      firstName: "James",
      lastName: "Admin",
      role: "admin",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    console.log("Admin user created successfully:", admin.email);
  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    process.exit(0);
  }
}

seedAdmin();