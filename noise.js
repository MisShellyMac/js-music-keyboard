$(document).ready(function() {
  // create an array of notes that can be played
  var notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  // Looping through the notes array
  for (var i = 0; i < notes.length; i++)
  {
    // You must use .note. because selecting multiple classes and I had to
    // eliminate the space in class name because it was messing up jquery.
    // Pass the current note to click so we can grab it inside the function
    $(".note." + notes[i]).click(notes[i], onClick);
  }

  // attach a 'keydown' event to the document, seemed a better option than
  // 'keypress' because it said it might have issues with other browswers.
  $(document).keydown(function(eventObject) {

    // Used this to print log of which key was pressed to be able to match key // click to correct letter. Does not change with caps or shift fyi.
    //.which is what had to be called on eventObject to see key #
    console.log(eventObject.which + " was pressed");

    // The array of corresponding keys for letters 'a' through 'g'
    var keys = [65, 66, 67, 68, 69, 70, 71];
    // Looping through the keys array again
    // Matching 65 to a and so on was more difficult.
    for (var i = 0; i < keys.length; i++)
    {
      // Only do something if the key that was pressed is in the array
      // Otherwise do nothing. No Sound if key not in array is pressed.
      if (eventObject.which == keys[i])
      {
        // Get the right index for the notes array by subtracting '65' from
        // the keys value to get the correct note index position. This is
        // How to match the key value to the note value.
        playNote(notes[keys[i] - 65]);
      }
    }
  });

  // chords: attach a click event to the appropriate buttons
  for (var i = 0; i < notes.length; i++)
  {
    // Get each button by newly made class name of .chord
    // Pass the current note to click so we can grab it inside the function
    $(".chord." + notes[i]).click(notes[i], onChordClick);
  }
});

// Called when a note button is clicked
function onClick(eventObject) {
  // Pass along the note letter that was originally passed to click ("a", ...)
  playNote(eventObject.data);
}

// Called when a chord button is clicked
// Side note: it was a good thing to create a separate function for playNote
// So that you can call it separately in the chord class.
// Copy Pasta'd css for note class for chord class with 2 exceptions of
// Downgrading font size to fit more info and widened box size.
function onChordClick(eventObject) {
  // pressing a chord button will invoke onChordClick function which will play // the 3 corresponding notes simultaneously to produce chord sound. Can only // work with whole notes. Nothing with majors, minors, sharps will work.
  // You would have to download addditional sounds to do this.
  if (eventObject.data == "c")
  {
    playNote("c");
    playNote("e");
    playNote("g");
  }
  else if (eventObject.data == "f")
  {
    playNote("f");
    playNote("a");
    playNote("c");
  }
  if (eventObject.data == "g")
  {
    playNote("g");
    playNote("b");
    playNote("d");
  }
}

// Play a note, given a letter passed in as a parameter.
function playNote(noteLetter) {
  // make the audio tag play for the corresponding letter/note.
  var audio_tag = document.getElementById(noteLetter + 'Audio');
  audio_tag.currentTime = 0;
  audio_tag.play();
}
