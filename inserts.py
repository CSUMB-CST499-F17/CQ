import models
import datetime

hunts = models.Hunts("name","walking","desc","image",datetime.datetime.now(),datetime.datetime.now(),"hello")
models.db.session.add(hunts)
models.db.session.commit()

participants = models.Participants("coastalquest1337@gmail.com","CQ", "", "", 0, datetime.datetime.now(), 1)
models.db.session.add(participants)
models.db.session.commit()