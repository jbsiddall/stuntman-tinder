# Stuntman Tinder

This project was created with create-react-bootstrap.

# Run

* Clone this repository
* ensure npm & node installed
* cd into project root
* run npm start
* goto http://localhost:3000 in chrome


# Design Decisions

* performance wasn't a consideration. If it was, i'd try and move all animations out of javascript and into css. I'd also not use the SwipeSpring for empty decks and animation since it has a fast paced interval
* I've not supported touch devices for simplicity, but this can easily be added


# Specification Changes

* I ignored the movie title and role at the top primarily because i was following tinder app design over the one in the pdf, but additionally a stuntman based tinder app wouldn't have role displayed since all their roles would be stuntman.
* I also ignored the stacked cards you can see at the bottom of the card since Tinder app doesn't have this. I have however shown the card underneath the top card when you start to swipe.
* I changed the animation for swiping. Instead of swiping being left and right, and the finishing animation moving the card off the screen, I instead choose to do a spinning animation where it rotates left or right and the finishing animation is to rotate all the way down and fade out. I did this purely to save time.


# Libraries Used

* *React* - Virtual Dom
* *StyledComponents* - styling
* *react-useinterval* - to use setInterval in the declarative functional components. Used for OffscreenCardAnimation and SwipeSpring
* *primereact* - used purely for its icons on the control buttons at the bottom. This is an overkill dependency and should be replaced.

Other libraries are installed in package.json but no longer used and should be deleted.
