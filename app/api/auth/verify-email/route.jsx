import { connectDB } from '@/lib/dbConnection';
import { catchError, response } from '@/lib/helperFunction';
import UserModel from '@/models/UserModal';
import { jwtVerify } from 'jose';

export async function POST(request) {
    try {
        await connectDB();
        const { token } = await request.json();

        if (!token) {
            return response(false, 400, 'Missing token')
        }
        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const decode = await jwtVerify(token, secret);
        const userId = decode.payload.userId;

        const user = await UserModel.findById(userId);

        if (!user) {
            return response(false, 404, 'User not found');
        }

        user.isEmailVerified = true;
        await user.save();

        return response(true, 200, 'Email verification is success');

    } catch (error) {
        return catchError(error)
    }
}