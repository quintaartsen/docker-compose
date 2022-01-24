import 'dotenv/config'
import { RingApi } from '../api'
import * as path from 'path'
import { cleanOutputDirectory, outputDirectory } from './util'
import { logError } from '../api/util'

/**
 * This example streams to files, each with 10 seconds of video.
 * The output will be in output/part${part #}.mp4
 **/

async function example() {
  const ringApi = new RingApi({
      // Replace with your refresh token
      refreshToken: "eyJhbGciOiJIUzUxMiIsImprdSI6Ii9vYXV0aC9pbnRlcm5hbC9qd2tzIiwia2lkIjoiYzEyODEwMGIiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2NDI5NDUyNDIsImlzcyI6IlJpbmdPYXV0aFNlcnZpY2UtcHJvZDp1cy1lYXN0LTE6NjAzZjIzNzgiLCJyZWZyZXNoX2NpZCI6InJpbmdfb2ZmaWNpYWxfYW5kcm9pZCIsInJlZnJlc2hfc2NvcGVzIjpbImNsaWVudCJdLCJyZWZyZXNoX3VzZXJfaWQiOjIxODY1Njk2LCJybmQiOiJwSVdqSU5HczlhX2xNZyIsInNlc3Npb25faWQiOiJiMDNlMzZjNy1lNTdiLTRjYWEtOWU2OS0xZmRlOTcxZjk5MzIiLCJ0eXBlIjoicmVmcmVzaC10b2tlbiJ9.7eHN3-JuDvcP1smuG6sDyZNiFXVzI57m_c6fCTo4IbavUmgBYbRxwjdKsAzZ9Utt6NevlW8LiC74T9tYvn_g8g",
      debug: true,
    });

    let camera = await ringApi.getCameras();

  if (camera.length == 0) {
    console.log('No cameras found')
    return
  }

  await cleanOutputDirectory()

  console.log('Starting Video...')
  const sipSession = await camera[0].streamVideo({
    // save video 10 second parts so the mp4s are playable and not corrupted:
    // https://superuser.com/questions/999400/how-to-use-ffmpeg-to-extract-live-stream-into-a-sequence-of-mp4
    output: [
      '-f',
      'rtsp',
      '-c:v',
      'libx264',
      '-preset',
      'ultrafast',
      '-tune',
      'zerolatency',
      '-b',
      '600k',
      'rtsp://meldsysteem.aartsenfysio.nl:8554/ring0'
  ]
  })

  sipSession.onCallEnded.subscribe(() => {
    console.log('Call has ended')
    process.exit()
  })

  console.log('Video started, streaming to part files...')
}

example().catch(logError)
