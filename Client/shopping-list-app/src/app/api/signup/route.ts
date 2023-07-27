import { Signup } from '@/app/database/dbAuth';
import { client } from '@/app/graphql/client';
import { getLists, signup } from '@/app/graphql/queries';
import { ISignUpData } from '@/app/interface/AuthInterfaces';
import { NextResponse } from 'next/server';

interface IResult {
  ok: boolean;
  data: ISignUpData;
}

export async function POST(request: Request) {

  const { username, email, password } = await request.json()

  const dataUser: ISignUpData = {
    email,
    username,
    password
  }

  const data: IResult = await Signup(dataUser)
  return new Response(JSON.stringify(data), { status: 200 });
      
}