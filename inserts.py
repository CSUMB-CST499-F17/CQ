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

models.db.session.add(models.Hunts("Walking Tour #1", "walking", "This is a sample walking scavenger hunt.", "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fisherman%27s_Wharf_Monterey3.JPG", datetime.datetime(2017, 10, 01, 00, 00, 00, 000000), datetime.datetime(2017, 11, 01, 00, 00, 00, 000000), "This is the starting text! Please go to LOCATION and click start to begin!"))
models.db.session.commit()

models.db.session.add(models.Hunts("Biking Tour #1", "biking", "This is a sample biking scavenger hunt.", "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fisherman%27s_librWharf_Monterey3.JPG", datetime.datetime(2017, 12, 01, 00, 00, 00, 000000), datetime.datetime(2017, 12, 24, 00, 00, 00, 000000), "This is the starting text! Please go to LOCATION and click start to begin!"))
models.db.session.commit()

models.db.session.add(models.Admins("katjones@csumb.edu", "SuperAdmin", "2466d01e6903125458ad26828cca9f90ea0a2af1b637012c0bb71f4bc3cb3144:3a42a5bef15c47e7bc00cd2a3b57b0ce78e58d2424fa4e6e9c452acc16a0b361", True))
models.db.session.commit()

models.db.session.add(models.Discounts("c5d0d951dd579674d44b137c69ad592ca63fdd6b24e276e7c2b78d113e0dff7a:e38b1f5d8b0b4051a62c0452eb20f95da46d1e6edeb04972aff7d68385d577a9", 100, 5))
models.db.session.commit()