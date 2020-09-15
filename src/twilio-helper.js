// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/node

// Find your credentials at twilio.com/console
const API_KEY_SID = 'SKa1de923ade8fdf43d7d639916c803d30';
const API_KEY_SECRET = 'HKAoMPrzWgrpqKpeN5b5LrbPiUSzl2JL';
const ACCOUNT_SID = 'AC448a20bbeccbb523c8f81b8611061454';

const Twilio = require('twilio');

const client = new Twilio(API_KEY_SID, API_KEY_SECRET, {accountSid: ACCOUNT_SID});

client.video.compositions.
create({
	roomSid: 'RMXXXX',
	audioSources: ['MTAAAA', 'soundtrack'],
	videoLayout: {
		main: {
			z_pos: 1,
			video_sources: ['screen-presentation']
		},
		pip: {
			z_pos: 2,
			x_pos: 1000,
			y_pos: 30,
			width: 240,
			height: 180,
			video_sources: ['MTBBBB']
		}
	},
	statusCallback: 'http://my.server.org/callbacks',
	resolution: '1280x720',
	format: 'mp4'
})
	.then(composition =>{
		console.log('Created Composition with SID=' + composition.sid);
	});
