export class SongsSaveDto {
    name?: string;
    groupId?: number;
    dateOfRelease?: Date;

    constructor(data: Partial<SongsSaveDto>) {
       this.name = data.name;
        this.groupId = data.groupId;
        this.dateOfRelease = data.dateOfRelease;
    }
}