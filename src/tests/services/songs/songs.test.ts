import chai from "chai";
import sinon from "sinon";
import * as songsService from "../../../services/songs/";
import { ObjectId } from 'mongodb';

const { expect } = chai;

describe("Songs Service", () => {
    
    it("should create a song", (done) => {
        const saveSongStub = sinon.stub(songsService, "saveSong").resolves("songId");

        songsService.saveSong({
            name: "song",
            groupId: 1,
            dateOfRelease: new Date('01-01-2001'),
        }).then((songId) => {
            expect(songId).to.equal("songId");
            expect(saveSongStub.calledOnce).to.be.true;
            saveSongStub.restore();
            done();
        });
    });

    it("should return songs", (done) => {
        const listSongsStub = sinon.stub(songsService, "listSongs").resolves([
            {
                _id: new ObjectId().toString(),
                name: "song",
                groupId: 1,
                dateOfRelease: new Date('01-01-2001'),
            }
        ]);

        songsService.listSongs(1, 10, 0)
        .then((songs) => {
            expect(songs).to.be.an('array');
            expect(songs.length).to.equal(1);
            expect(listSongsStub.calledOnce).to.be.true;
            listSongsStub.restore();
            done();
        });
    });


    it("should return counts by group", (done) => {
        const countSongsByGroupStub = sinon.stub(songsService, "countSongsByGroup").resolves({
            "1": 1
        });

        songsService.countSongsByGroup()
        .then((counts) => {
            expect(counts).to.be.an('object');
            expect(counts).to.have.property("1");
            expect(countSongsByGroupStub.calledOnce).to.be.true;
            countSongsByGroupStub.restore();
            done();
        });
    });

});