import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema({ collection: 'user', versionKey: false })
export class User extends Document {


    @Prop({ type: String, required: true })
    userName: string;

    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: String, required: true })
    userEmail: string;

    @Prop({ type: String, required: true })
    userPwd: string;

    @Prop({ type: Date, required: true })
    signDate: Date;

    @Prop({ type: Boolean, default: true, required: true })
    use: boolean;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
