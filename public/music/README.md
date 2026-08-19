# Background music

Drop an audio file here named exactly:

    song.mp3

The site will pick it up automatically and play it (looped, softly) when
Angel taps "Open my heart".

If no `song.mp3` is present, the site falls back to a gentle music-box
melody generated in the browser — so the music button always works.

Change the filename in `src/components/MusicToggle.tsx` (`TRACK_URL`) if
you'd rather use a different name or format.
