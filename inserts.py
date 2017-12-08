#-*- coding: utf-8 -*-
import models

import datetime

models.db.create_all()

models.db.session.add(models.Admins("katjones@csumb.edu", "SuperAdmin", "2466d01e6903125458ad26828cca9f90ea0a2af1b637012c0bb71f4bc3cb3144:3a42a5bef15c47e7bc00cd2a3b57b0ce78e58d2424fa4e6e9c452acc16a0b361", True))
models.db.session.commit()

models.db.session.add(models.Discounts("c5d0d951dd579674d44b137c69ad592ca63fdd6b24e276e7c2b78d113e0dff7a:e38b1f5d8b0b4051a62c0452eb20f95da46d1e6edeb04972aff7d68385d577a9", 100, 1000))
models.db.session.commit()

hunt = models.Hunts(
    "Testing",
    "testing",
    "This hunt is solely for testing purposes.",
    "https://farm6.staticflickr.com/5528/12048988946_aed7cd6042_b.jpg",
    datetime.datetime(2017, 11, 1, 12),
    datetime.datetime(2017, 12, 1, 12),
    "Press start when ready.")
models.db.session.add(hunt)
models.db.session.commit()

hunt = models.Hunts(
    "Test Two",
    "testing",
    "This hunt is solely for testing purposes.",
    "https://farm6.staticflickr.com/5240/7417287052_abacd9c42b_h.jpg",
    datetime.datetime(2017, 11, 1, 12),
    datetime.datetime(2017, 12, 1, 12),
    "Press start when ready.")
models.db.session.add(hunt)
models.db.session.commit()

hunt = models.Hunts(
    "Walking Tour #1",
    "walking",
    "This scavenger hunt begins at the Monterey Custom House Plaza and ends in Pacific Grove.",
    "static/image/gallery/boats.jpg",
    datetime.datetime(2017, 11, 2, 12),
    datetime.datetime(2017, 11, 26, 12),
    "Start in the Custom House Plaza Park, near Fisherman's Wharf.")
models.db.session.add(hunt)
models.db.session.commit()

participant = models.Participants(
    "coastalquest1337@gmail.com", #email
    "CQ", #teamname
    "static/image/logo-small.png", #image
    "9c57af821280017af3ac0515f8ccce3bfb4bb8e0aeab5749202b7ba42457705e:fb0b225a3ed147c4beddab7e56996af49ea977709ff543a8a451b2f9b3613648", #leader code
    "5280af3d3ba3cfdd9492b383817da19417c09eb37a311a4fe083fc6bef81a5b7:e47918d8fd1c4e42a728c1f493c2496ecc1606a0b1bb4c999ac489d6e744f253", #member code
    None, #start time
    None, #end time
    0, #progress
    0, #attempts
    0, #hints
    0, #score
    True, #hasPaid
    1) #hunt id
models.db.session.add(participant)
models.db.session.commit()

participant = models.Participants(
    "coastalquest1338@gmail.com", #email
    "CQ", #teamname
    "static/image/logo-small.png", #image
    "c298b26b0e6f8e3f9dffcd4353af986497e156d8bb0dbb8f3e5902cd47af7886:cfa8971c37934b37b7788b5f093ac2b329db29b695524fa9b6a453af051d3e76", #leader code
    "5280af3d3ba3cfdd9492b383817da19417c09eb37a311a4fe083fc6bef81a5b7:e47918d8fd1c4e42a728c1f493c2496ecc1606a0b1bb4c999ac489d6e744f253", #member code
    None, #start time
    None, #end time
    0, #progress
    0, #attempts
    0, #hints
    0, #score
    True, #hasPaid
    1) #hunt id
models.db.session.add(participant)
models.db.session.commit()

questions = models.Questions(
    "What is your team name?", #Question
    "CQ", #Answer
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/2000px-Yes_Check_Circle.svg.png", #image
    "Coastal Quest", #hint 1
    "", #hint2
    "You got it!", #answer text
    1 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Find California's first theatre. On the front door, there is a poem. Who is the poem about?", #Question
    "Miners", #Answer
    "", #image
    "You will find the theatre on the corner of Pacific and John Street.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Now make your way toward Fisherman's Wharf. " + 
    "Before you get there, find the bocce ball courts in the park. " +
    "How many are there? Example: Thirty", #Question
    "Three", #Answer
    "", #image
    "The courts are about 100 yards away from the theatre.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()


questions = models.Questions(
    "Okay, you're on a roll! Near the base of the Wharf is State Historic Marker no. 001! " +
    "According to the landmark, who raised the American flag and when? " + 
    "Type in his name and the date (month, day, year). " + 
    "Example: Captain John Doe on September 19, 1901", #Question
    "Commodore John Drake Sloat on July 7, 1846", #Answer
    "", #image
    "Look for the flagpole", #hint 1
    "", #hint2
    "This event signaled the passing of California from Mexican rule to American.", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Locate the statue of Santa Rosalia. Find the fishing scene circa 1930. " +
    "What type of boats were used to fish for sardines?", #Question
    "Purse seiners", #Answer
    "", #image
    "Look near the bicycle racks.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Begin moving down the bike trail, and remember to keep the ocean on your right. " + 
    "Find the large reddish-colored rock, right off the trail. " + 
    "This rock represents where the first sardine cannery stood in Monterey. " + 
    "What was that cannery called?", #Question
    "The Crescent Brand Sardine Company", #Answer
    "", #image
    "Approximately 100 yards from Santa Rosalia.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Walk down the recreation trail for a minute or two.  Enjoy the wildlife. " + 
    "Look for harbor seals on the rocks down below. " +
    "Then, make your way to Sister City Park. How many miles away is Trapani, Italy? Example: 123,000 miles", #Question
    "6,514 miles", #Answer
    "", #image
    "Sister City Park is on the water side of the recreation trail. " +
    "If you're at the basketball courts, you've gone too far.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "In the grassy park across the recreation trail, there is an old wooden structure with a blue sign on it. " +
    "What is that wooden structure?", #Question
    "Sardine hopper", #Answer
    "", #image
    "If you've crossed a street, you've gone too far.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "What marine mammal calls the coast guard jetty home?", #Question
    "Sea lion", #Answer
    "", #image
    "The Spanish explorers called them \"lobos de marinos\", because they reminded them of the wolves back home.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Walking in San Carlos Park, you will find a Cannery Row Divers Memorial. " +
    "It features names of divers and tenders who installed, repaired, replaced, realigned, " +
    "and maintained the underwater pipes. What are the names of the two men that died? ", #Question
    "Henry Porter and Tom Pierce", #Answer
    "", #image
    "This memorial is along the water, before the start of Cannery Row.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Make your way down Cannery Row. At 299 Cannery Row, you will find Adventures by the Sea. " +
    "What is the name of the cannery that used to operate here?", #Question
    "Aeneas", #Answer
    "", #image
    "299 Cannery Row crossover.", #hint 1
    "Six letters.", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Across the street there is a sign that talks about the history of the site where the Monterey Plaza Hotel sits. " +
    "What was the original name of the building here?", #Question
    "Casa de las Olas", #Answer
    "", #image
    "Adventures by the Sea kayakers walk right by the sign.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "In the Monterey Plaza Hotel's patio, there is a fountain. How many dolphins are in the fountain? Example: Thirty", #Question
    "Four", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()


questions = models.Questions(
    "In between the Chart House and El Torito restaurants there is a sign as you walk down the sidewalk. " +
    "What was the original name of the California Packing Corporation?", #Question
    "Pacific Fish Company", #Answer
    "", #image
    "A parking lot is across the street.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "According to the sign at McAbee Beach, who were the first fishermen here?", #Question
    "Rumsien", #Answer
    "", #image
    "The sign sits to the south of the Spindrift Inn.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Find the Cannery Row monument in Steinbeck Plaza. " +
    "Fill in the blank: The four boys sitting together were modeled after the four _____.", #Question
    "Entrepreneurs", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Keep moving down Cannery Row. At the bottom of Bruce Ariss Way is a bust of whom?", #Question
    "Kalisa Moore", #Answer
    "", #image
    "She was the queen of Cannery Row.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Walk up the stairs. Find the sign titled \"A Day in the Canneries\". " +
    "When asked where all the sardines had gone, after the '47-'48 season, how did Ed Ricketts reply?", #Question
    "They're in cans", #Answer
    "", #image
    "This sign is near the replica model homes of early cannery workers.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "What brand of sardines is proudly displayed on the exterior of the Monterey Bay Aquarium?", #Question
    "Portola", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Go into the American Tin Cannery building. " +
    "Find the area with the old black and white photos hung high on the walls. " +
    "After World War II, the National Automotive Fiber Industry took over the American Can Company plant to make what and what for whom? ", #Question
    "Seat covers and cushions for Chrysler", #Answer
    "", #image
    "Near the middle on the first floor of the American tin cannery.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Find the photo titled \"Sardine Capital of the World\". " +
    "Look at the California Packing Corporation \"crossover\". " +
    "What other company's products are advertised on that \"crossover\"?", #Question
    "Del Monte", #Answer
    "", #image
    "In the stairwell at the end of the American tin cannery.", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Across the street from the \"ATC\" is the Hopkins Marine Station. " +
    "At the entrance there is a short, wooden sign that says \"Hopkins Marine Station of Stanford University\". " +
    "What kind of tree does it sit under?", #Question
    "Cypress", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Keep on going, you're almost there! " +
    "The next beach is a \"pupping\" beach for what kind of marine mammal?", #Question
    "Harbor seal", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "According to the Marine Mammal Protection Act, people are required to stay far enough away so as not to affect the what of these animals?", #Question
    "Behavior", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "A little walk down the rocky shoreline brings you to Berwick Park. " +
    "There is an otter sculpture here, titled \"Life at the Top\". Who is the artist?", #Question
    "Christopher Bell", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "What do the two small yellow signs around the whale sculpture read?", #Question
    "No climbing", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Following the Recreation Trail to Lovers Point, you will come across a mural on your left. " +
    "According to the mural, in 1875, how much were the 30'x60' lots being sold for? Example: $2", #Question
    "$50", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "As you approach Lovers Point, there is a replica of the old swan boats. "+
    "This one is named \"Margruss\". Who is it named after? Example: John and Jane Doe", #Question
    "Margaret and Russell Sprague", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "In Lovers Point Park, find the monarch butterfly sculpture. Who was the artist?", #Question
    "Gordon Newell", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Which direction is the little boy pointing?", #Question
    "East", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "What did the volleyball court used to be?", #Question
    "Swimming pool", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Make your way up Forest Ave. and fund the statue \"Honoring Grandfathers\". Who is it a gift from?", #Question
    "The Hal Green Family", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Holy cow!! You see that whale across the street? What's her name?", #Question
    "Sandy", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()

questions = models.Questions(
    "Last question! Near the front door to the Pacific Grove Museum is a tiled sign that reads Pacific Grove Museum of Natural History in a circle with four colors in the center. " +
    "What does the lighter blue color represent?", #Question
    "Coastal waters", #Answer
    "", #image
    "", #hint 1
    "", #hint2
    "", #answer text
    3 #hunt ID
    )
models.db.session.add(questions)
models.db.session.commit()





















