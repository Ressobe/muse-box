import db from "@/src/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z.object(
  {
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    username: z.string().min(3, 'Username is required').max(100),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters').max(100),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  }
).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Password do not match',
})


export async function POST(req: Request) {
  try {
    const body = await req.json() ;
    const { email, username, password } = userSchema.parse(body);

    const isEmailInDatabase = await db.user.findUnique({
      where: {email: email}
    });

    if (isEmailInDatabase) {
      return NextResponse.json(
        { 
          user: null, 
          message: "User with this email already exist",
        },
        { status: 409 }
      );
    }

    const isUserNameInDatabase = await db.user.findUnique({
      where: {username: username}
    });

    if (isUserNameInDatabase) {
      return NextResponse.json( {
        user: null,
        message: "User with this username already exist",
      },
      { status: 409}
      )
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      }
    })


    return NextResponse.json({user: newUser, message: "User created successful"}, {status: 201});
  } catch(error) {
    return NextResponse.json({message: "Something went wrong!"}, {status: 500});
  }
}
