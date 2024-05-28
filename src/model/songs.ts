import mongoose, { Document, Schema } from 'mongoose';

export interface ISongs extends Document {

    name: string;
    groupId: number;
    dateOfRelease: Date;

}

const SongsSchema = new Schema({
    name: { type: String, required: true },
    groupId: { type: Number, required: true },
    dateOfRelease: { type: Date, required: true },
});

const Songs = mongoose.model<ISongs>('Songs', SongsSchema);

export default Songs;