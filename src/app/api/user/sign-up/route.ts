import db from "@/src/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { signUpSchema } from "@/src/types/formTypes";


export async function POST(req: Request) {
  try {
    const body = await req.json() ;
    const { email, username, password } = signUpSchema.parse(body);

    const isEmailInDatabase = await db.user.findUnique({
      where: {email: email}
    });

    if (isEmailInDatabase) {
      return NextResponse.json(
        { 
          errors: {email: "User with this email already exist"},
        },
        { status: 409 }
      );
    }

    const isUserNameInDatabase = await db.user.findUnique({
      where: {username: username}
    });

    if (isUserNameInDatabase) {
      return NextResponse.json( 
        {
         errors: {username: "User with this username already exist"},
        },
        { status: 409}
      )
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        username,
        avatar_img: "/user.png",
        password: hashedPassword,
        profile: { create: { } }
      }
    });


    return NextResponse.json({user: newUser, message: "User created successful"}, {status: 201});
  } catch(error) {
    return NextResponse.json({message: "Something went wrong!"}, {status: 500});
  }
}
