#-*- coding: utf-8 -*-
import models

import datetime

models.db.create_all()

hunts = models.Hunts("Old Fisherman's Wharf","walking","desc","image",datetime.datetime.now(),datetime.datetime.now(),"hello")
models.db.session.add(hunts)
models.db.session.commit()

questions = models.Questions(
    "Find California's first theatre.  On the front door, there is a poem.  Who is the poem about?",
    "Miners",
    "image",
    "You will find the theatre on the corner of Pacific and John Street.",
    "",
    "",
    1)
models.db.session.add(questions)
models.db.session.commit()


questions = models.Questions(
    "Now head towards Fisherman's Wharf. Before you get there, find the bocce ball courts in the park. How many are there?",
    "Three",
    "image",
    "The courts are about 100 yards away from the theatre.",
    "",
    "",
    1
    )
models.db.session.add(questions)
models.db.session.commit()


questions = models.Questions(
    "Okay, you're on a roll! Near the base of the Wharf is State Historic Marker no. 001! According to the landmark, who raised the American flag and when? Type in his name and the date (month, day, year).",
    "Commodore John Drake Sloat on July 7, 1846.",
    "image",
    "Look for the flagpole.",
    "",
    "This signaled the passing of California from Mexican rule to American.",
    1
    )
models.db.session.add(questions)
models.db.session.commit()

<<<<<<< HEAD
user = models.Participants("andramirez@csumb.edu", "Team One", "image", "1234", "4321", datetime.datetime.now(), datetime.datetime.now(), 1, 5, 500, True, 1)
models.db.session.add(user)
models.db.session.commit()
admin = models.Admins("andramirez@csumb.edu", "admin", "4444", True)
models.db.session.add(admin)
models.db.session.commit()
=======
participants = models.Participants(
    "bob@csumb.edu",
    "Bob's Bad Boys",
    "image",
    "4",
    "5",
    datetime.datetime.now(),
    datetime.datetime.now(),
    8,
    9,
    True,
    1)

models.db.session.add(participants)
models.db.session.commit()
>>>>>>> 0b808770cf43dfa20c2033ca9c2c53287df28bf2
