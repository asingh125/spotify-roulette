import React, { useState,  useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';


const TestApp = props => {

return (
  <SpotifyPlayer
    token="BQCbuI8F-pF5Z1_P4vkOcwEItpi4CCOPL_8r3lSmDX1dNotkVgNxZBAjXOn5-JQijVk-mO317ZK3jUF-BVjpsSFKRXpr6ZicZxZYIlpPLozBvcum7sXjxbhEd8erBr0eKjVsoFtEgiuaI0hYBfrklT-iBX5kAJe0Jck7rhREk1ih9vxvDP9R8uk"
    uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
  />
)
}

export default TestApp