import bodyParser from 'body-parser';
import express from 'express';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { ObjectId } from 'mongodb';
import router from '../../../routers/songs';
import Songs from '../../../model/songs';
import * as songsService from "../../../services/songs/";

const { expect } = chai;

chai.use(chaiHttp);
chai.should();

const sandbox = sinon.createSandbox();

const app = express();

app.use('/', router);

describe('Songs Controller', () => {

    it('should save song', (done) => {

        const songIdAfterSave = new ObjectId();

        const song = {
            name: 'song',
            groupId: 1,
            dateOfRelease: new Date('01-01-2001'),
        };

        const saveStub = sandbox.stub(Songs.prototype, 'save').resolves({
            _id: songIdAfterSave,
            ...song,
        });

        chai.request(app)
        .post('/')
        .send(song)
        .end((err, res) => {
            if (err) {
                console.error('Error:', err);
            }
            console.log('Response:', res.text);
            res.should.have.status(200);
            expect(res.body.id).to.equal(songIdAfterSave.toString());
            done();
        });
    });

    it('should return songs', (done) => {
        const songs = [
            {
                _id: new ObjectId().toString(),
                name: 'song1',
                groupId: 1,
                dateOfRelease: new Date('01-01-2001'),
            },
            {
                _id: new ObjectId().toString(),
                name: 'song2',
                groupId: 2,
                dateOfRelease: new Date('01-01-2002'),
            }
        ];
    
        const findStub = sandbox.stub(Songs, 'find').resolves(songs);
    
        chai.request(app)
        .get('/songs')
        .end((_, res) => {
            res.should.have.status(200);
            expect(res.body).to.deep.equal(songs);
            done();
        });
    });

    it('should return counts by group', (done) => {
        const countsByGroup = {
            "1": 5,
            "2": 3,
            "3": 7
        };
    
        const countSongsByGroupStub = sandbox.stub(songsService, 'countSongsByGroup').resolves(countsByGroup);
    
        chai.request(app)
        .get('/_counts')
        .end((_, res) => {
            res.should.have.status(200);
            expect(res.body).to.deep.equal(countsByGroup);
            done();
        });
    });
    

});
