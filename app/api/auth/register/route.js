import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnection";
import UserModel from "@/models/UserModal";
import { response, catchError } from "@/lib/helperFunction";
import { z } from "zod";
import { SignJWT } from "jose";
import { sendMail } from "@/lib/sendMail";
import { emailVerificationLink } from "@/email/emailVerificationLink";


// Validation Schema (fixed)
const validationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();

    // validate input
    const validated = validationSchema.safeParse(payload);

    if (!validated.success) {
      return response(false, 400, "Invalid or missing input fields", validated.error);
    }

    const { name, email, password } = validated.data;

    // Check existing user
    const isUserExist = await UserModel.exists({ email });
    if (isUserExist) {
      return response(false, 409, "User already registered.");
    }

    // Register user
    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    // Create JWT Token
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);

    const token = await new SignJWT({ userId: newUser._id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    // Email verification
    await sendMail(
      "Email Verification - Developer JK",
      email,
      emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`)
    );

    return response(true, 200, "Registration successful! Please verify your email address.");

  } catch (error) {
    return catchError(error);
  }
}
