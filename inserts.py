import models
import datetime

models.db.create_all()

hunts = models.Hunts("name","walking","desc","image",datetime.datetime.now(),datetime.datetime.now(),"hello")
models.db.session.add(hunts)
models.db.session.commit()



questions = models.Questions(
    "Find California's first theatre.  On the front door, there is a poem.  Who is the poem about?",
    "Miners",
    "image",
    "You will find the theatre on the corner of Pacific and John Street.",
    "",
    "Miners",
    1)
models.db.session.add(questions)
questions = models.Questions(
    "Now make your way toward Fisherman's Wharf.  Before you get there, find the bocce ball courts in the park.  How many are there?",
    "Three",
    "image",
    "The courts are about 100 yards away from the theatre.",
    "",
    "Three",
    1
    )
models.db.session.add(questions)

models.db.session.commit()
